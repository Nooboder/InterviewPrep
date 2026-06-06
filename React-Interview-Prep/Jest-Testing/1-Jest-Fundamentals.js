// ============================================================
// JEST TESTING FRAMEWORK - INTERVIEW PREPARATION
// ============================================================

/**
 * Jest is the most popular testing framework for React
 * Used by Google, Meta, Amazon, TCS, Cognizant
 * Interview focus: Unit testing, mocking, coverage, performance
 */

// ============================================================
// 1. JEST FUNDAMENTALS
// ============================================================

/*
Q1: What is Jest and why use it over other testing frameworks?
A: Jest is a testing framework by Meta with:
   - Zero config (works out of box)
   - Fast (parallel execution)
   - Snapshot testing
   - Great coverage reports
   - Built-in mocking
   - Good for React components

   Comparison:
   Jest > Jasmine (more features, faster)
   Jest > Mocha (Jest has built-in assertions, mocking)
   Jest > Vitest (Jest is more stable, better ecosystem)

Q2: What's the difference between test, it, and describe?
A: - describe: Group related tests
   - test/it: Individual test case (it is alias)
   - Both can be nested
   ```
   describe('UserComponent', () => {
     it('renders user name', () => {
       // test code
     });
   });
   ```

Q3: What are matchers in Jest?
A: Matchers are assertion methods:
   - Equality: toBe, toEqual, toStrictEqual
   - Truthiness: toBeNull, toBeUndefined, toBeDefined, toBeTruthy
   - Numbers: toBeGreaterThan, toBeLessThan, toBeCloseTo
   - Strings: toMatch (regex)
   - Arrays: toContain, toHaveLength
   - Objects: toHaveProperty, toMatchObject
   - Errors: toThrow

Q4: Explain toBe vs toEqual
A: - toBe: Uses === (reference equality)
   - toEqual: Uses deep equality (compares values)
   ```
   const obj1 = { a: 1 };
   const obj2 = { a: 1 };

   expect(obj1).toBe(obj2);      // ❌ Fail (different references)
   expect(obj1).toEqual(obj2);   // ✅ Pass (same values)
   ```

Q5: What's toStrictEqual?
A: Like toEqual but stricter:
   - Checks property order
   - undefined fields must match
   - NaN !== NaN (fails)
   - Regex, Date, Set must match exactly
*/

// ============================================================
// 2. MOCKING IN JEST
// ============================================================

/*
Q6: What are the types of mocking in Jest?
A: 1. Manual mocks: __mocks__ folder
   2. Module mocks: jest.mock()
   3. Function mocks: jest.fn()
   4. Partial mocks: jest.requireActual()
   5. Timer mocks: jest.useFakeTimers()

Q7: How do you mock a module?
A: ```
   jest.mock('axios', () => ({
     get: jest.fn(() => Promise.resolve({ data: [] }))
   }));
   ```

Q8: What's jest.fn() and jest.spyOn()?
A: jest.fn(): Create mock function from scratch
   jest.spyOn(): Wrap existing function
   ```
   // jest.fn()
   const mockFn = jest.fn();

   // jest.spyOn()
   const obj = { method: () => 'original' };
   jest.spyOn(obj, 'method').mockReturnValue('mocked');
   ```

Q9: How to verify a mock was called?
A: ```
   const mock = jest.fn();
   mock(1, 2, 3);

   expect(mock).toHaveBeenCalled();
   expect(mock).toHaveBeenCalledWith(1, 2, 3);
   expect(mock).toHaveBeenCalledTimes(1);
   ```

Q10: How to mock fetch API?
A: ```
   global.fetch = jest.fn(() =>
     Promise.resolve({
       json: () => Promise.resolve({ data: [] })
     })
   );
   ```
*/

// ============================================================
// 3. TESTING REACT COMPONENTS
// ============================================================

/*
Q11: What's the difference between Enzyme and React Testing Library?
A: Enzyme: Tests implementation details (old approach)
   RTL: Tests user behavior (modern, recommended)

   RTL is preferred because:
   - Tests like user would use component
   - Doesn't depend on component implementation
   - Better accessibility testing
   - Forces good component design

Q12: How to test async operations?
A: ```
   test('loads data', async () => {
     render(<Component />);
     await screen.findByText('data');
     expect(screen.getByText('data')).toBeInTheDocument();
   });
   ```

Q13: How to test components that use useState?
A: Use @testing-library/react:
   ```
   test('counter increments', () => {
     render(<Counter />);
     const button = screen.getByRole('button');
     fireEvent.click(button);
     expect(screen.getByText('1')).toBeInTheDocument();
   });
   ```

Q14: How to test useEffect?
A: useEffect runs after component mounts:
   ```
   test('fetches data on mount', async () => {
     render(<Component />);
     await waitFor(() => {
       expect(screen.getByText('data')).toBeInTheDocument();
     });
   });
   ```

Q15: How to test error handling?
A: ```
   test('shows error message', () => {
     const { rerender } = render(<Component error={null} />);
     rerender(<Component error="Error occurred" />);
     expect(screen.getByText('Error occurred')).toBeInTheDocument();
   });
   ```
*/

// ============================================================
// 4. ADVANCED JEST CONCEPTS
// ============================================================

/*
Q16: What's snapshot testing?
A: Stores component output and compares future renders:
   ```
   test('renders correctly', () => {
     const { container } = render(<Component />);
     expect(container).toMatchSnapshot();
   });
   ```
   - First run: Creates snapshot
   - Subsequent runs: Compares output
   - Use -u flag to update snapshots

Q17: When to use snapshot testing?
A: ✅ DO USE:
   - Static components
   - UI regression testing
   - Complex UI output

   ❌ DON'T USE:
   - Large dynamic components
   - Components with IDs/timestamps
   - External API responses

Q18: What's jest.useFakeTimers()?
A: Mock time for testing delays:
   ```
   jest.useFakeTimers();
   jest.advanceTimersByTime(1000);
   jest.runAllTimers();
   jest.useRealTimers();
   ```

Q19: How to test debounce/throttle?
A: ```
   test('debounces function', () => {
     jest.useFakeTimers();
     const debouncedFn = debounce(jest.fn(), 300);

     debouncedFn();
     debouncedFn();
     debouncedFn();

     expect(debouncedFn).toHaveBeenCalledTimes(0);
     jest.advanceTimersByTime(300);
     expect(debouncedFn).toHaveBeenCalledTimes(1);
   });
   ```

Q20: What's test.concurrent and test.skip?
A: - test.skip: Skip test
   - test.only: Run only this test
   - test.concurrent: Run tests in parallel
   - test.todo: Mark as TODO
   ```
   test.skip('skipped test', () => {});
   test.only('only this runs', () => {});
   ```
*/

// ============================================================
// 5. COVERAGE & BEST PRACTICES
// ============================================================

/*
Q21: What's code coverage and what's a good target?
A: Metrics:
   - Statement: % of statements executed
   - Branch: % of if/else branches
   - Function: % of functions called
   - Line: % of lines executed

   Good targets:
   - 80%+ overall coverage
   - Critical paths: 100%
   - Less critical: 70%+

Q22: How to improve coverage?
A: - Test happy path
   - Test error cases
   - Test edge cases
   - Test user interactions
   - Run coverage: jest --coverage

Q23: What's beforeEach and afterEach?
A: Setup and cleanup:
   ```
   beforeEach(() => {
     // Run before each test
   });

   afterEach(() => {
     // Run after each test (cleanup)
   });

   beforeAll(() => {
     // Run once before all tests
   });
   ```

Q24: How to test custom hooks?
A: Use @testing-library/react-hooks:
   ```
   import { renderHook, act } from '@testing-library/react';

   test('useCounter hook', () => {
     const { result } = renderHook(() => useCounter());
     expect(result.current.count).toBe(0);

     act(() => {
       result.current.increment();
     });

     expect(result.current.count).toBe(1);
   });
   ```

Q25: Jest performance - how to speed up tests?
A: - Use test.concurrent for parallel tests
   - Mock expensive operations
   - Reduce setup overhead
   - Use isolateModules for independent tests
   - Test only changed files: jest --onlyChanged
*/

// ============================================================
// JEST INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant level (Junior to Mid):
- Know basic matchers
- Can mock modules and functions
- Understand describe/test structure
- Know beforeEach/afterEach

Big4 level (Mid to Senior):
- Understand snapshot testing pitfalls
- Know when to mock vs when not to
- Can test complex components
- Understand coverage strategies
- Know testing best practices

Questions to prepare for:

1. "What's the difference between jest.fn() and jest.spyOn()?"
   - Mock functions from scratch vs wrapping existing

2. "How do you test async operations?"
   - Use async/await, waitFor, findBy queries

3. "When would you NOT use snapshot testing?"
   - Dynamic content, IDs, timestamps

4. "How to improve test performance?"
   - Parallel tests, mock expensive calls

5. "What's the difference between toEqual and toBe?"
   - Deep equality vs reference equality
*/

export const JEST_INTERVIEW_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  MOCKING: [6, 7, 8, 9, 10],
  REACT_TESTING: [11, 12, 13, 14, 15],
  ADVANCED: [16, 17, 18, 19, 20],
  COVERAGE: [21, 22, 23, 24, 25],
};

// ============================================================
// CODE EXAMPLES FOR JEST
// ============================================================

// Example 1: Testing a React component
export function ComponentTest() {
  /*
  // Button.tsx
  export function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
  }

  // Button.test.tsx
  import { render, screen, fireEvent } from '@testing-library/react';

  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  */
}

// Example 2: Mocking API calls
export function ApiTest() {
  /*
  // api.ts
  export function fetchUsers() {
    return fetch('/api/users').then(r => r.json());
  }

  // api.test.ts
  jest.mock('node-fetch');

  test('fetches users', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'John' }])
      })
    );

    const users = await fetchUsers();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John');
  });
  */
}

// Example 3: Testing custom hook
export function CustomHookTest() {
  /*
  // useCounter.ts
  export function useCounter() {
    const [count, setCount] = useState(0);
    return {
      count,
      increment: () => setCount(c => c + 1),
      decrement: () => setCount(c => c - 1)
    };
  }

  // useCounter.test.ts
  import { renderHook, act } from '@testing-library/react';

  test('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
  */
}
