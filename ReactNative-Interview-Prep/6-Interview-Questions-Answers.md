# 🎯 React Native Interview Questions & Answers - 100+ Q&A

## ⭐ EASY LEVEL (Basic Knowledge)

### 1. What is React Native?
**Answer:**
React Native is a JavaScript framework for building mobile applications for iOS and Android using React principles. It allows you to write native mobile applications using JavaScript and React, with code sharing between platforms (~80-90%).

**Key Points:**
- Write once, run on iOS and Android
- Native performance (not web-based)
- Access to native APIs via bridge
- Large community and ecosystem

---

### 2. Difference between React and React Native?

| Feature | React | React Native |
|---------|-------|-------------|
| Platform | Web (Browser) | Mobile (iOS/Android) |
| Rendering | HTML/DOM | Native components |
| Components | HTML tags | Native views |
| Styling | CSS | StyleSheet API |
| Deployment | Browser | App Store/Play Store |
| Performance | Dependent on browser | Near-native performance |

---

### 3. What is the JavaScript Bridge?
**Answer:**
The Bridge is the asynchronous communication layer between JavaScript and Native code.

**How it works:**
- JS calls native module → Bridge serializes to JSON → Sends to native
- Native processes → Serializes result to JSON → Sends back to JS
- Data must be JSON serializable

**Limitations:**
- Asynchronous only (in old architecture)
- Serialization overhead
- Batched for efficiency (every 5ms)
- Cannot send functions or complex objects

---

### 4. Explain React Native Architecture
**Answer:**

```
┌─────────────────────────────────────┐
│   JAVASCRIPT LAYER                  │
│   (React Components, Logic)         │
├─────────────────────────────────────┤
│   BRIDGE (JSON serialization)       │
├─────────────────────────────────────┤
│   NATIVE LAYER                      │
│   iOS (Swift) │ Android (Kotlin)    │
├─────────────────────────────────────┤
│   NATIVE UI (UIView / View)         │
└─────────────────────────────────────┘
```

**Three threads:**
- JS Thread (main business logic)
- Native UI Thread (rendering)
- Background Thread (network, I/O)

---

### 5. What is Platform-Specific Code?
**Answer:**
Writing different code for iOS and Android.

**Methods:**
```javascript
// 1. Platform.select()
const style = Platform.select({
  ios: { color: 'red' },
  android: { color: 'blue' }
});

// 2. Platform.OS check
if (Platform.OS === 'ios') {
  // iOS only
}

// 3. File extensions
// Button.ios.js, Button.android.js
```

---

### 6. What are the main React Native Components?
**Answer:**
- `<View>` - Container (equivalent to div)
- `<Text>` - Text display
- `<Image>` - Image display
- `<ScrollView>` - Scrollable container
- `<FlatList>` - Optimized list (virtualized)
- `<TextInput>` - Input field
- `<Button>` - Pressable button
- `<TouchableOpacity>` - Touchable with opacity feedback

---

### 7. What is StyleSheet in React Native?
**Answer:**
`StyleSheet` is React Native's way to define styles (similar to CSS).

**Advantages:**
- Styles validated at creation time
- Styles sent to native (not recreated every render)
- Enables optimizations
- Organized and performant

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
```

---

### 8. What's the difference between FlatList and ScrollView?
**Answer:**

| FlatList | ScrollView |
|----------|-----------|
| Virtualized (renders visible items only) | All items rendered |
| Good for long lists | Good for short lists |
| Memory efficient | High memory usage |
| O(1) rendering | O(n) rendering |
| Scrolls smoothly with 1000+ items | Lags with 1000+ items |

---

### 9. Explain React Hooks in React Native
**Answer:**
Hooks are functions that let you use state and other React features.

**Common Hooks:**
- `useState` - State management
- `useEffect` - Side effects
- `useCallback` - Memoized callbacks
- `useMemo` - Memoized values
- `useRef` - Persistent value
- `useContext` - Access context

**React Native specific:**
- `useWindowDimensions` - Screen size
- `useSafeAreaInsets` - Safe area (notch, etc.)
- `useColorScheme` - Dark/light mode

---

### 10. What is Context API?
**Answer:**
Context provides a way to pass data through the component tree without manually passing props at each level.

```javascript
const UserContext = React.createContext();

// Provider
<UserContext.Provider value={{ user: 'John' }}>
  <App />
</UserContext.Provider>

// Consumer
const user = useContext(UserContext);
```

**Use Case:** Global state (theme, user, language)

---

## 🟡 INTERMEDIATE LEVEL (Practical Knowledge)

### 11. How do you optimize FlatList?
**Answer:**

```javascript
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({ 
    length: ITEM_HEIGHT, 
    offset: ITEM_HEIGHT * index, 
    index 
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={20}
  windowSize={21}
/>
```

**Key optimizations:**
1. `keyExtractor` - Unique keys
2. `getItemLayout` - Know item heights
3. `removeClippedSubviews` - Hide offscreen
4. `maxToRenderPerBatch` - Batch rendering
5. Memoize `renderItem` with `useCallback`
6. Use `React.memo` for list items

---

### 12. What are Native Modules?
**Answer:**
JavaScript code that accesses native platform APIs.

**Example (iOS - Swift):**
```swift
@objc(MyNativeModule)
class MyNativeModule: NSObject {
  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let level = UIDevice.current.batteryLevel
    resolve(level)
  }
}
```

**JavaScript:**
```javascript
import { NativeModules } from 'react-native';
const { MyNativeModule } = NativeModules;

MyNativeModule.getBatteryLevel()
  .then(level => console.log(level))
  .catch(err => console.error(err));
```

---

### 13. Explain the AppState API
**Answer:**
Monitors app lifecycle (foreground, background, inactive).

```javascript
import { AppState } from 'react-native';

useEffect(() => {
  const subscription = AppState.addEventListener('change', handleAppStateChange);
  return () => subscription.remove();
}, []);

const handleAppStateChange = (nextAppState) => {
  if (nextAppState === 'active') {
    console.log('App foregrounded');
    // Refresh data
  } else {
    console.log('App backgrounded');
    // Save state, pause timers
  }
};
```

**States:**
- `active` - App in foreground
- `background` - App in background
- `inactive` - Transitioning (iOS only)

---

### 14. How do you handle navigation in React Native?
**Answer:**
Using React Navigation library (most popular).

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Navigate to Details with params
navigation.navigate('Details', { id: 123 });
```

**Navigation types:**
- Stack navigation
- Tab navigation
- Drawer navigation
- Combination (nested)

---

### 15. What is Deep Linking?
**Answer:**
Opening specific screens from URLs or notifications.

```javascript
// Configure linking
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Details: 'details/:id',
      Profile: 'profile/:userId',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>

// Deep link: myapp://details/123
```

**Use cases:**
- Push notifications
- URLs from browser
- App invitations
- Sharing specific screens

---

### 16. How do you manage state in React Native?
**Answer:**
Multiple approaches:

**1. Local State (useState)**
```javascript
const [count, setCount] = useState(0);
```

**2. Context API**
```javascript
const ThemeContext = React.createContext();
// For simple global state
```

**3. Redux**
```javascript
// Complex state with predictable updates
store.dispatch(action);
```

**4. Zustand**
```javascript
// Simple, lightweight state management
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```

**5. Recoil**
```javascript
// Atomic state management
const countAtom = atom({ key: 'count', default: 0 });
```

---

### 17. What are Controlled vs Uncontrolled Components?
**Answer:**

**Controlled Component:**
```javascript
const [text, setText] = useState('');

<TextInput 
  value={text}
  onChangeText={setText}
/>
```
- React state controls the value
- Predictable, testable
- Performance consideration (re-render on every change)

**Uncontrolled Component:**
```javascript
const textInputRef = useRef();

const getText = () => {
  console.log(textInputRef.current.value);
};

<TextInput ref={textInputRef} />
```
- DOM/ref controls the value
- Less re-renders
- Harder to test

---

### 18. How do you debug React Native?
**Answer:**

**1. React Native Debugger**
```bash
npm install --save-dev react-native-debugger
```
- Chrome DevTools integration
- Redux DevTools
- Network tab

**2. Flipper**
- Cross-platform debugger
- Network inspector
- Logs viewer
- Layout inspector

**3. Console Logging**
```javascript
console.log(), console.warn(), console.error()
```

**4. Native Debuggers**
- iOS: Xcode
- Android: Android Studio

**5. Breakpoints**
- Set breakpoints in DevTools
- Pause execution

---

### 19. What is the difference between Hot Reload and Fast Refresh?
**Answer:**

| Hot Reload | Fast Refresh |
|-----------|-------------|
| Old method | New method (RN 0.61+) |
| Reloads module | Preserves component state |
| Loses state | Keeps state |
| Slower | Faster |
| Deprecated | Current standard |

**Fast Refresh:**
- Automatically enables in dev
- Preserves state across reloads
- Shows error overlay

---

### 20. How do you test React Native apps?
**Answer:**

**1. Unit Testing (Jest)**
```javascript
import { render, screen } from '@testing-library/react-native';

test('renders correctly', () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText('Hello')).toBeTruthy();
});
```

**2. Integration Testing**
- Test multiple components together
- Jest + React Native Testing Library

**3. E2E Testing (Detox)**
```javascript
describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });
});
```

**Tools:**
- Jest (unit)
- React Native Testing Library (integration)
- Detox (E2E)
- Appium (cross-platform E2E)

---

## 🔴 HARD LEVEL (Advanced Knowledge)

### 21. Explain the New Architecture (JSI + Fabric)
**Answer:**

**Old Architecture:**
- Bridge: Asynchronous JSON serialization
- UIManager: Synchronous updates

**New Architecture:**
- JSI (JavaScript Interface)
  - Direct C++ access
  - Synchronous communication
  - No JSON serialization
  - Better performance
  
- Fabric (New Renderer)
  - Synchronous rendering
  - Direct native memory access
  - Better performance
  - Used by modern libraries

**Benefits:**
- ~50% faster startup
- Lower latency
- Better real-time support

---

### 22. How does the React Native Bridge work?

**Sequence:**
```
1. JS calls: NativeModule.method(data)
2. Bridge serializes data to JSON
3. Queues the call with other calls
4. Every 5ms, sends batch to native
5. Native processes all calls
6. Native queues response back
7. Every 5ms, sends batch back
8. JS receives response
9. Promise resolved/rejected
```

**Why batching?**
- Reduces overhead
- More efficient communication
- Trade-off: Slight latency

**Serialization limitation:**
- Only JSON-serializable data
- No functions, dates (as objects)
- No circular references

---

### 23. How do you prevent memory leaks?
**Answer:**

**Common memory leak sources:**

```javascript
// ❌ LEAK 1: Not cleaning up listeners
useEffect(() => {
  AppState.addEventListener('change', handler);
  // Missing cleanup!
}, []);

// ✅ FIX:
useEffect(() => {
  const subscription = AppState.addEventListener('change', handler);
  return () => subscription.remove();
}, []);

// ❌ LEAK 2: Async operations after unmount
useEffect(() => {
  fetch('/api/data').then(setState);
  // Memory leak if component unmounts
}, []);

// ✅ FIX:
useEffect(() => {
  let isMounted = true;
  fetch('/api/data').then(data => {
    if (isMounted) setState(data);
  });
  return () => { isMounted = false; };
}, []);

// ❌ LEAK 3: Circular references
const obj = {
  self: obj, // Circular reference, hard to GC
};

// ❌ LEAK 4: Large arrays not cleared
let cache = [];
// ... cache grows forever
```

**Prevention:**
1. Clean up subscriptions
2. Cancel async operations
3. Use AbortController for fetch
4. Clear timers/intervals
5. Avoid circular references
6. Use Flipper to detect

---

### 24. Explain Native Module development
**Answer:**

**Creating a Native Module (Swift - iOS):**

```swift
@objc(BatteryModule)
class BatteryModule: NSObject {
  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, 
                      reject: @escaping RCTPromiseRejectBlock) {
    let level = UIDevice.current.batteryLevel * 100
    resolve(["level": level])
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
```

**Bridging:**
```swift
@objc(BatteryBridge)
class BatteryBridge: NSObject {
  @objc
  static func moduleName() -> String {
    return "BatteryModule"
  }
}
```

**JavaScript:**
```javascript
import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

BatteryModule.getBatteryLevel()
  .then(data => console.log(data.level))
  .catch(err => console.error(err));
```

---

### 25. What is Threading in React Native?
**Answer:**

**Three threads:**

1. **JavaScript Thread**
   - Executes React/JS code
   - Main thread for business logic
   - Single-threaded (like browser)
   - Blocking = frozen UI/animations

2. **Native UI Thread**
   - iOS: Main thread (GCD)
   - Android: Main thread (Looper)
   - Renders UI
   - Processes touch events
   - Can't block

3. **Background Thread(s)**
   - Network requests
   - File I/O
   - Heavy computation
   - Native module operations

**Implications:**
```javascript
// ❌ BAD: Blocks JS thread
const expensiveCalculation = () => {
  for (let i = 0; i < 1000000000; i++) {
    // Blocks everything
  }
};

// ✅ GOOD: Use background
const expensiveCalculation = () => {
  setTimeout(() => {
    // Yields to allow animations
  }, 0);
};

// ✅ GOOD: Use InteractionManager
InteractionManager.runAfterInteractions(() => {
  // Runs after touch/gesture completes
  expensiveWork();
});
```

---

## 📌 SUMMARY OF KEY CONCEPTS

**Architecture:**
- Bridge communicates JS ↔ Native
- Three layers: JS, Bridge, Native
- Three threads: JS, UI, Background

**Performance:**
- Use FlatList with optimizations
- Memoize components and callbacks
- Use useNativeDriver for animations
- Profile with Flipper/DevTools

**State Management:**
- useState for local
- Context for global
- Redux for complex
- Zustand for lightweight

**Navigation:**
- React Navigation
- Deep linking support
- Stack, tab, drawer patterns

**Testing:**
- Jest for units
- React Native Testing Library for integration
- Detox for E2E

**Platform-Specific:**
- Platform.select()
- Platform.OS checks
- File extensions (.ios/.android)

**Memory Management:**
- Clean up subscriptions
- Cancel async operations
- Avoid circular references
- Monitor with Flipper

---

## 🚀 NEXT STEPS

1. Study these Q&A thoroughly
2. Try to answer without looking
3. Code along with examples
4. Practice system design questions
5. Do coding challenges
6. Mock interviews with friends

**Good luck! 💪**
