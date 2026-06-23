/**
 * 🚀 REACT NATIVE FUNDAMENTALS - Complete Guide
 * 
 * Topics:
 * 1. React Native Architecture & Bridge
 * 2. JavaScript to Native Communication
 * 3. Component Lifecycle & Hooks
 * 4. Platform-Specific Code
 * 5. Threading Model
 */

// ============================================
// 1. REACT NATIVE ARCHITECTURE OVERVIEW
// ============================================

/**
 * React Native has 3 main layers:
 * 
 * 1. JAVASCRIPT LAYER
 *    - React components written in JS
 *    - Business logic
 *    - State management
 * 
 * 2. BRIDGE
 *    - Asynchronous communication layer
 *    - Serializes data between JS and Native
 *    - Batches messages for efficiency
 * 
 * 3. NATIVE LAYER
 *    - iOS (Swift/Objective-C)
 *    - Android (Kotlin/Java)
 *    - Platform-specific UIView rendering
 * 
 * Communication Flow:
 * JS Component → Bridge (JSON) → Native Module → UIView
 */

// ============================================
// 2. NATIVE MODULES - BRIDGING
// ============================================

/**
 * QUESTION: How does React Native communicate with native code?
 * 
 * ANSWER: Through the Bridge using RCTNativeModule pattern
 */

// JavaScript Side (Swift Native Module Example)
import { NativeModules } from 'react-native';

const { MyNativeModule } = NativeModules;

export const useNativeModule = () => {
  return {
    // Calling native synchronously (NOT recommended)
    getSyncValue: () => MyNativeModule.getSyncValue(),
    
    // Calling native asynchronously (RECOMMENDED)
    getAsyncValue: () => 
      MyNativeModule.getAsyncValue()
        .then(result => console.log(result))
        .catch(err => console.error(err)),
    
    // Callback-based communication
    fetchData: (callback) => 
      MyNativeModule.fetchDataWithCallback(callback),
    
    // Promise-based (modern)
    modernCall: async () => {
      try {
        const result = await MyNativeModule.asyncOperation();
        return result;
      } catch (error) {
        console.error(error);
      }
    },
  };
};

/**
 * QUESTION: What are the limitations of the React Native Bridge?
 * 
 * ANSWER:
 * 1. Serialization overhead - All data must be JSON serializable
 * 2. Asynchronous nature - No true synchronous calls
 * 3. Batching - Multiple calls batched for efficiency (1 batch per 5ms)
 * 4. Data types - Limited to primitives, strings, arrays, objects
 * 5. Performance impact - Large data transfers slow
 * 6. Threading - JS runs on main thread, native on background
 * 
 * WORKAROUND:
 * - Use Codegen for automatic bridge generation (RN 0.68+)
 * - Use JSI for direct C++ access (React Native New Architecture)
 * - Batch multiple operations together
 * - Send minimal necessary data
 */

// ============================================
// 3. REACT NATIVE LIFECYCLE & HOOKS
// ============================================

import React, { useEffect, useRef, useCallback } from 'react';
import { 
  AppState, 
  useWindowDimensions, 
  Platform,
  View, 
  Text 
} from 'react-native';

/**
 * QUESTION: How does React Native handle app lifecycle?
 * 
 * ANSWER: Through AppState
 * - active: App in foreground
 * - background: App in background
 * - inactive: App transitioning (iOS only)
 */

export const LifecycleExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to foreground!');
      // Refresh data, reconnect to services
    } else if (nextAppState.match(/inactive|background/)) {
      console.log('App has gone to background!');
      // Save state, close connections
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return (
    <View>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  );
};

/**
 * QUESTION: What's the difference between React and React Native lifecycle?
 * 
 * ANSWER:
 * React Web                          React Native
 * ============                        ============
 * componentDidMount                  useEffect (empty deps)
 * componentDidUpdate                 useEffect (with deps)
 * componentWillUnmount               useEffect cleanup
 * DOM events                         Native platform events (AppState, etc.)
 * Window resize                      Dimensions.useWindowDimensions()
 * Browser APIs                       NativeModules
 */

// ============================================
// 4. HOOKS SPECIFIC TO REACT NATIVE
// ============================================

import { 
  useWindowDimensions, 
  useSafeAreaInsets,
  useColorScheme 
} from 'react-native';

export const NativeHooksExample = () => {
  // Get screen dimensions with rotation support
  const { width, height, scale, fontScale } = useWindowDimensions();

  // Get safe area (notch, status bar, etc.)
  const insets = useSafeAreaInsets();

  // Get current color scheme
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null

  return (
    <View style={{ 
      marginTop: insets.top,
      marginBottom: insets.bottom,
    }}>
      <Text>Width: {width}, Height: {height}</Text>
      <Text>Color Scheme: {colorScheme}</Text>
    </View>
  );
};

// ============================================
// 5. PLATFORM-SPECIFIC CODE
// ============================================

import { Platform, StyleSheet } from 'react-native';

/**
 * QUESTION: How do you write platform-specific code in React Native?
 * 
 * ANSWER: Multiple approaches:
 */

// Method 1: Platform.select()
const platformStyles = StyleSheet.create({
  container: {
    backgroundColor: Platform.select({
      ios: '#FF0000',
      android: '#00FF00',
      default: '#000000',
    }),
    height: Platform.select({
      ios: 50,
      android: 60,
    }),
  },
});

// Method 2: Platform.OS check
const PlatformSpecificComponent = () => {
  if (Platform.OS === 'ios') {
    return <View><Text>iOS Specific UI</Text></View>;
  } else if (Platform.OS === 'android') {
    return <View><Text>Android Specific UI</Text></View>;
  }
  return null;
};

// Method 3: File extensions (iOS and Android folders)
// - Button.ios.js
// - Button.android.js
// - Button.native.js
// When imported as: import Button from './Button'
// It automatically loads the correct file

// Method 4: Version checking
const isAndroidVersionGreaterThan = (version) => {
  return Platform.Version > version;
};

// ============================================
// 6. THREADING MODEL IN REACT NATIVE
// ============================================

/**
 * QUESTION: How does threading work in React Native?
 * 
 * ANSWER:
 * 
 * React Native has 3 threads:
 * 
 * 1. JAVASCRIPT THREAD (Main)
 *    - Executes JS code
 *    - Handles React rendering logic
 *    - Can't block - blocks animations
 *    - Single-threaded like browser
 * 
 * 2. NATIVE UI THREAD
 *    - iOS: Main thread (Grand Central Dispatch)
 *    - Android: Main thread (Looper)
 *    - Renders UI
 *    - Handles gestures and touch events
 * 
 * 3. BACKGROUND THREAD(S)
 *    - Network requests
 *    - File I/O
 *    - Native module operations
 *    - Heavy computations
 * 
 * IMPLICATIONS:
 * - Don't block JS thread with heavy computation
 * - Use setTimeout to yield to UI updates
 * - Use InteractionManager for post-interaction work
 * - Use Native Modules for heavy CPU tasks
 */

import { InteractionManager } from 'react-native';

export const ThreadingExample = () => {
  const handleExpensiveOperation = () => {
    // Method 1: Using InteractionManager
    InteractionManager.runAfterInteractions(() => {
      // Heavy computation after touch/gesture completes
      console.log('Safe to do expensive work');
    });

    // Method 2: Using setTimeout to yield
    setTimeout(() => {
      console.log('This doesn\'t block animations');
    }, 0);
  };

  return null;
};

/**
 * QUESTION: What happens when you do heavy computation in JS thread?
 * 
 * ANSWER:
 * - Animations drop frames
 * - Touch events lag
 * - App feels sluggish
 * - Bad user experience
 * 
 * SOLUTION:
 * - Use Hermes engine (faster JS execution)
 * - Use Native Modules for CPU-intensive work
 * - Use Worklets (React Native Reanimated v2+)
 * - Break computation into chunks with setImmediate
 */

// ============================================
// 7. REACT NATIVE INITIALIZATION
// ============================================

/**
 * QUESTION: What happens when a React Native app starts?
 * 
 * ANSWER: Initialization sequence:
 * 
 * 1. Native code loads (Native app initialization)
 * 2. React Native framework initializes
 * 3. Bundle loads (JS bundle from Metro or static)
 * 4. JavaScript engine starts (JavaScriptCore, V8, or Hermes)
 * 5. JS code executes top to bottom
 * 6. AppRegistry.registerComponent() called
 * 7. React renders root component
 * 8. Native UI renders
 * 9. App becomes interactive
 * 
 * TIMING:
 * - iOS: Typically 2-3 seconds cold start
 * - Android: Typically 3-4 seconds cold start
 * - Can be optimized with code splitting, Hermes, etc.
 */

import { AppRegistry } from 'react-native';

// App entry point
const App = () => {
  return <View><Text>Hello React Native!</Text></View>;
};

AppRegistry.registerComponent('MyApp', () => App);

// ============================================
// 8. NEW ARCHITECTURE (JSI & FABRIC)
// ============================================

/**
 * QUESTION: What is React Native New Architecture?
 * 
 * ANSWER: Two major improvements (RN 0.68+):
 * 
 * 1. FABRIC (New Renderer)
 *    - Replaces old UIManager
 *    - Synchronous updates from JS
 *    - Direct native memory access
 *    - Better performance
 *    - Benefits: Reduced jank, better rendering
 * 
 * 2. JSI (JavaScript Interface)
 *    - C++ interface for JS-to-Native
 *    - Direct memory access (no Bridge serialization)
 *    - Synchronous communication possible
 *    - Used by libraries like Reanimated, Skia
 *    - Benefits: Better performance, lower latency
 * 
 * vs OLD ARCHITECTURE:
 * 
 * Old Bridge                New Architecture (JSI + Fabric)
 * ==================        ==============================
 * Asynchronous              Mostly synchronous
 * JSON serialization        Direct memory access
 * 3 layers                  2 layers
 * Less efficient            More efficient
 * Limited real-time         Better real-time
 * 
 * Migration status (2024):
 * - Hermes is default engine
 * - Most libraries supporting new arch
 * - Old architecture still supported for backwards compatibility
 */

// ============================================
// 9. HERMES ENGINE
// ============================================

/**
 * QUESTION: What is Hermes and why use it?
 * 
 * ANSWER:
 * 
 * Hermes is a JavaScript engine optimized for React Native
 * 
 * ADVANTAGES:
 * - 50% faster startup time
 * - 30-50% smaller bundle size
 * - Lower memory usage
 * - Faster execution
 * - Better for low-end devices
 * 
 * vs JavaScriptCore (iOS) / V8 (Android):
 * - Not general-purpose (optimized for RN)
 * - No JIT compilation (prevents exploits)
 * - Pre-compilation to bytecode
 * 
 * ADOPTION:
 * - Default in RN 0.71+
 * - Can be disabled if needed
 * - Support from Meta (creators)
 * 
 * ENABLE IN app.json:
 * {
 *   "project": {
 *     "android": {
 *       "enableHermes": true
 *     }
 *   }
 * }
 */

// ============================================
// 10. DEBUGGING IN REACT NATIVE
// ============================================

/**
 * QUESTION: How do you debug React Native apps?
 * 
 * ANSWER: Multiple tools available:
 */

// Console logging (simplest)
console.log('Message');
console.warn('Warning');
console.error('Error');

// React Native Debugger
// - Chrome DevTools integration
// - Redux DevTools support
// - Network tab
// - Breakpoints

// Flipper
// - Cross-platform mobile debugging
// - Network tab
// - Crash reporter
// - Logs view
// - Layouts inspector

// JavaScript Debugger
// - npx react-native debug-js
// - Browser DevTools
// - Source maps

// Native debugging
// - iOS: Xcode debugger
// - Android: Android Studio debugger

// Performance monitoring
import { PerformanceObserver, performance } from 'react-native';

const perfObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log(`${entry.name}: ${entry.duration}ms`);
  }
});

perfObserver.observe({ entryTypes: ['measure'] });

performance.mark('operation-start');
// ... do something
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

// ============================================
// 11. COMMON PITFALLS
// ============================================

/**
 * PITFALL 1: Blocking the JS thread
 * 
 * ❌ BAD:
 * while (true) { // Infinite loop blocks everything
 *   calculateSomething();
 * }
 * 
 * ✅ GOOD:
 * InteractionManager.runAfterInteractions(() => {
 *   calculateSomething();
 * });
 */

/**
 * PITFALL 2: Not cleaning up subscriptions
 * 
 * ❌ BAD:
 * useEffect(() => {
 *   AppState.addEventListener('change', handler);
 *   // Memory leak - subscription never removed
 * }, []);
 * 
 * ✅ GOOD:
 * useEffect(() => {
 *   const subscription = AppState.addEventListener('change', handler);
 *   return () => subscription.remove();
 * }, []);
 */

/**
 * PITFALL 3: Syncing non-serializable objects through Bridge
 * 
 * ❌ BAD:
 * NativeModule.sendData({ 
 *   date: new Date(), // Not serializable
 *   func: () => {}, // Functions not allowed
 * });
 * 
 * ✅ GOOD:
 * NativeModule.sendData({ 
 *   timestamp: Date.now(),
 *   id: 123,
 * });
 */

/**
 * PITFALL 4: Creating components in render
 * 
 * ❌ BAD:
 * const MyScreen = () => {
 *   const InlineComponent = () => <View />; // New instance every render
 *   return <InlineComponent />;
 * };
 * 
 * ✅ GOOD:
 * const InlineComponent = () => <View />;
 * const MyScreen = () => {
 *   return <InlineComponent />;
 * };
 */

// ============================================
// SUMMARY OF KEY CONCEPTS
// ============================================

/**
 * KEY TAKEAWAYS:
 * 
 * 1. React Native bridges JS and Native code
 * 2. Bridge is asynchronous and serializes data
 * 3. Three threads: JS, Native UI, Background
 * 4. Don't block the JS thread
 * 5. Platform-specific code when needed
 * 6. Use Hermes for better performance
 * 7. Clean up listeners and subscriptions
 * 8. Debug using Debugger, Flipper, or native tools
 * 9. New Architecture (JSI + Fabric) is the future
 * 10. Always test on real devices for accurate performance
 */

export default {
  LifecycleExample,
  NativeHooksExample,
  PlatformSpecificComponent,
};
