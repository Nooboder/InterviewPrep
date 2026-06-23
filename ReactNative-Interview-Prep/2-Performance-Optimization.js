/**
 * ⚡ REACT NATIVE PERFORMANCE OPTIMIZATION - Complete Guide
 * 
 * Topics:
 * 1. FlatList Optimization
 * 2. Memory Management
 * 3. Code Splitting & Lazy Loading
 * 4. Image Optimization
 * 5. Re-render Prevention
 * 6. Animation Performance
 */

import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  useSafeAreaInsets,
} from 'react-native';

// ============================================
// 1. FLATLIST OPTIMIZATION
// ============================================

/**
 * QUESTION: How do you optimize FlatList performance?
 * 
 * ANSWER: Multiple strategies:
 */

// ✅ GOOD: Well-optimized FlatList
export const OptimizedFlatListExample = ({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <OptimizedListItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      // Performance optimizations
      removeClippedSubviews={true}          // Hide offscreen views
      maxToRenderPerBatch={10}              // Render in batches
      updateCellsBatchingPeriod={50}        // Batch update interval
      initialNumToRender={20}               // Initial items to render
      windowSize={21}                       // Items to render outside viewport
      // Use for horizontal lists
      scrollEventThrottle={16}              // Throttle scroll events
      onEndReachedThreshold={0.5}           // Trigger at 50% scroll
    />
  );
};

const ITEM_HEIGHT = 60;

// ❌ BAD: Slow FlatList
const SlowFlatListExample = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        // Creating new function every render
        const handler = () => console.log(item.id);
        return (
          // Creating new object every render
          <View style={{ height: 60 }}>
            <Text>{item.name}</Text>
          </View>
        );
      }}
    // No keyExtractor - using array indices
    // No getItemLayout - calculating height every time
    // No optimization props
    />
  );
};

/**
 * FlatList Optimization Strategies:
 * 
 * 1. useCallback for renderItem
 *    - Prevent function recreation
 *    - React.memo works better
 * 
 * 2. getItemLayout
 *    - Know item heights in advance
 *    - Prevents height calculation
 *    - Enables scrollToIndex instantly
 * 
 * 3. keyExtractor
 *    - Use unique IDs, not indices
 *    - Prevents wrong item rendering on list change
 * 
 * 4. Memoization
 *    - Wrap ListItem in React.memo
 *    - Only re-render if props change
 * 
 * 5. Virtualization
 *    - removeClippedSubviews: true
 *    - Unmount offscreen items
 * 
 * 6. Batch rendering
 *    - maxToRenderPerBatch
 *    - updateCellsBatchingPeriod
 *    - Prevent janky rendering
 */

const MemoizedListItem = memo(({ item, onPress }) => (
  <View style={styles.itemContainer}>
    <Text>{item.name}</Text>
  </View>
), (prevProps, nextProps) => {
  // Custom comparison for performance
  return prevProps.item.id === nextProps.item.id;
});

// ============================================
// 2. MEMORY MANAGEMENT
// ============================================

/**
 * QUESTION: How do you prevent memory leaks in React Native?
 * 
 * ANSWER: Proper cleanup and lifecycle management
 */

export const MemoryLeakExample = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    // Simulate async operation
    const fetchData = async () => {
      const result = await someApiCall();
      // Only update if component still mounted
      if (isMounted) {
        setData(result);
      }
    };

    fetchData();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  return <Text>{data?.name}</Text>;
};

/**
 * Memory Leak Prevention:
 * 
 * 1. Cancel async operations
 * 2. Remove event listeners
 * 3. Clear timers
 * 4. Clear intervals
 * 5. Unsubscribe from observables
 * 6. Remove Redux subscriptions
 * 7. Clear cache when needed
 * 8. Use AbortController for fetch
 */

// AbortController example
export const FetchWithAbort = () => {
  const controllerRef = React.useRef(null);

  React.useEffect(() => {
    controllerRef.current = new AbortController();

    fetch('/api/data', {
      signal: controllerRef.current.signal,
    });

    return () => {
      // Abort fetch on unmount
      controllerRef.current?.abort();
    };
  }, []);

  return null;
};

/**
 * QUESTION: How do you detect memory leaks?
 * 
 * ANSWER:
 * - Flipper (Memory tab)
 * - Android Studio Profiler
 * - Xcode Memory Debugger
 * - Set a breakpoint and watch memory usage
 * - Use console.log to track object lifecycle
 */

// ============================================
// 3. CODE SPLITTING & LAZY LOADING
// ============================================

/**
 * QUESTION: How do you implement code splitting in React Native?
 * 
 * ANSWER: Multiple approaches
 */

// Method 1: React.lazy + Suspense (RN 0.43+)
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

export const LazyLoadingExample = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <View>
      {showHeavy && (
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <HeavyComponent />
        </React.Suspense>
      )}
    </View>
  );
};

// Method 2: Dynamic imports
export const DynamicImportExample = async () => {
  const module = await import('./DynamicModule');
  return module.default;
};

// Method 3: Metro bundler splitting
// - Use `maxWorkers` in metro.config.js
// - Use `--source-map` for debugging
// - Use `--reset-cache` when needed

/**
 * QUESTION: What's the impact of bundle size on performance?
 * 
 * ANSWER:
 * - Larger bundle → longer startup time
 * - More memory usage
 * - Slower parsing and compilation
 * - Worse performance on low-end devices
 * 
 * OPTIMIZATION:
 * - Code splitting (lazy load screens)
 * - Remove unused dependencies
 * - Use production build
 * - Tree shaking
 * - Minification
 * - Use bundleConfig for multiple bundles
 */

// ============================================
// 4. IMAGE OPTIMIZATION
// ============================================

/**
 * QUESTION: How do you optimize images in React Native?
 * 
 * ANSWER: Multiple techniques
 */

export const OptimizedImageExample = () => {
  const { width } = useWindowDimensions();

  return (
    <Image
      source={{ uri: 'https://example.com/image.jpg' }}
      style={{
        width: width,
        height: 200,
        // Specify exact dimensions
      }}
      // Cache strategy
      cache="force-cache"
      // Resize on download
      resizeMode="cover"
      // Progressive loading
      progressiveRenderingEnabled={true}
      // Placeholder
      defaultSource={require('./placeholder.png')}
    />
  );
};

/**
 * Image Optimization Strategies:
 * 
 * 1. Use correct size
 *    - Don't load 4000x3000 for 200x200 display
 *    - Use server-side image resizing
 *    - Request appropriate resolution
 * 
 * 2. Cache strategy
 *    - force-cache: Use cache, don't refresh
 *    - reload: Force fresh download
 *    - default: Platform default
 * 
 * 3. Caching library (react-native-fast-image)
 *    - Better control
 *    - Placeholder support
 *    - Progress tracking
 * 
 * 4. Image format
 *    - WebP for Android (20-30% smaller)
 *    - JPEG for photos
 *    - PNG for graphics
 * 
 * 5. Lazy loading
 *    - Only load images in viewport
 *    - Unload when out of view
 * 
 * 6. Progressive loading
 *    - Low-res first, then high-res
 *    - Better UX
 */

import FastImage from 'react-native-fast-image';

export const FastImageExample = () => (
  <FastImage
    source={{
      uri: 'https://example.com/image.jpg',
      priority: FastImage.priority.high,
    }}
    style={{ width: 200, height: 200 }}
    resizeMode={FastImage.resizeMode.cover}
  />
);

// ============================================
// 5. RE-RENDER PREVENTION
// ============================================

/**
 * QUESTION: How do you prevent unnecessary re-renders?
 * 
 * ANSWER: Multiple techniques
 */

// ✅ GOOD: Memoized component
const MyListItem = memo(({ item, onPress }) => {
  console.log('Rendering item:', item.id);
  return (
    <View onTouchEnd={onPress}>
      <Text>{item.name}</Text>
    </View>
  );
});

// ✅ GOOD: useCallback for stable function references
export const StableCallbacksExample = () => {
  const [count, setCount] = useState(0);

  // This function reference never changes
  const handlePress = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // This useMemo value only recalculates when dependencies change
  const expensiveValue = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <MyListItem
      item={{ id: 1, name: 'Item' }}
      onPress={handlePress}
    />
  );
};

/**
 * Re-render Prevention:
 * 
 * 1. React.memo
 *    - Shallow prop comparison
 *    - Custom comparison with second arg
 * 
 * 2. useCallback
 *    - Stable function references
 *    - Prevent child re-renders
 * 
 * 3. useMemo
 *    - Cache expensive computations
 *    - Stable object references
 * 
 * 4. Extract components
 *    - Smaller components re-render less
 *    - Localize state changes
 * 
 * 5. useReducer for complex state
 *    - More predictable updates
 *    - Better for multiple related states
 * 
 * 6. Separation of concerns
 *    - Pure components (no state changes)
 *    - Container components (manage state)
 */

// ============================================
// 6. ANIMATION PERFORMANCE
// ============================================

/**
 * QUESTION: How do you optimize animations?
 * 
 * ANSWER: Use native driver and Reanimated
 */

export const AnimationPerformanceExample = () => {
  const animatedValue = new Animated.Value(0);

  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      // KEY: Use native driver for 60fps
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ],
      }}
    />
  );
};

/**
 * Animation Optimization:
 * 
 * 1. useNativeDriver: true
 *    - Runs on native thread
 *    - Doesn't block JS
 *    - 60fps on mobile
 *    - Only for transform, opacity
 * 
 * 2. React Native Reanimated
 *    - Worklets for complex animations
 *    - Native performance
 *    - Gesture integration
 * 
 * 3. Gesture Handler
 *    - Native gesture processing
 *    - Smooth interactions
 * 
 * 4. Avoid complex calculations in animation
 * 5. Disable animations on low-end devices if needed
 * 6. Use shouldRasterizeIOS (iOS only) for complex hierarchies
 */

// ============================================
// 7. PROFILING & MONITORING
// ============================================

/**
 * QUESTION: How do you profile React Native performance?
 * 
 * ANSWER: Use built-in tools and libraries
 */

import { InteractionManager } from 'react-native';

export const ProfilingExample = () => {
  React.useEffect(() => {
    // Measure component mount time
    const start = performance.now();

    return () => {
      const end = performance.now();
      console.log(`Component took ${end - start}ms to mount`);
    };
  }, []);

  return null;
};

/**
 * Profiling Tools:
 * 
 * 1. React DevTools Profiler
 * 2. Chrome DevTools Performance tab
 * 3. Flipper Performance Monitor
 * 4. Android Profiler
 * 5. Xcode Instruments
 * 6. console.time/console.timeEnd
 * 7. performance.mark/measure
 * 
 * Metrics to monitor:
 * - TTI (Time to Interactive)
 * - FCP (First Contentful Paint)
 * - FPS (Frames Per Second)
 * - Memory usage
 * - Bundle size
 * - Startup time
 */

// ============================================
// SUMMARY
// ============================================

/**
 * KEY PERFORMANCE OPTIMIZATIONS:
 * 
 * 1. FlatList: getItemLayout, keyExtractor, maxToRenderPerBatch
 * 2. Memory: Cleanup listeners, cancel async, AbortController
 * 3. Bundle: Code splitting, lazy loading, tree shaking
 * 4. Images: Correct size, caching, progressive loading
 * 5. Renders: React.memo, useCallback, useMemo
 * 6. Animations: useNativeDriver, Reanimated, native gestures
 * 7. Profile: Use tools, measure, iterate
 * 
 * RULE OF THUMB:
 * - Measure before optimizing
 * - Profile to find bottlenecks
 * - Optimize based on data
 * - Test on real devices
 */

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

async function someApiCall() {
  return { name: 'Data' };
}

export default {
  OptimizedFlatListExample,
  MemoryLeakExample,
  LazyLoadingExample,
  OptimizedImageExample,
  StableCallbacksExample,
  AnimationPerformanceExample,
  ProfilingExample,
};
