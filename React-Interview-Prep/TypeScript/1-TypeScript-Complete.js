// ============================================================
// TYPESCRIPT FOR REACT - INTERVIEW PREPARATION
// ============================================================

/**
 * TypeScript is mandatory in modern companies
 * Used by Google, Meta, Amazon, TCS, Cognizant
 * Interview focus: React typing, generics, advanced patterns
 */

// ============================================================
// 1. TYPESCRIPT BASICS FOR REACT
// ============================================================

/*
Q1: What are the benefits of TypeScript?
A: - Type safety (catch errors at compile time)
   - Better IDE support (autocompletion)
   - Self-documenting code
   - Easier refactoring
   - Better for large teams
   - Prevents runtime errors

Q2: How to type React component props?
A: ```
   interface ButtonProps {
     onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
     children: React.ReactNode;
     disabled?: boolean;
     variant?: 'primary' | 'secondary';
   }

   function Button({ onClick, children, disabled }: ButtonProps) {
     return <button onClick={onClick} disabled={disabled}>{children}</button>;
   }
   ```

Q3: What's the difference between interface and type?
A: interface:
   - Extended/merged easily
   - For object shapes
   - Better for classes
   ```
   interface Props { name: string; }
   interface Props { age: number; } // Merged to both!
   ```

   type:
   - Can be primitives, unions
   - Can use &, |
   - Cannot be merged
   ```
   type Props = { name: string; } & { age: number; };
   type Status = 'pending' | 'success' | 'error';
   ```

Q4: How to type React.FC (FunctionComponent)?
A: OLD (not recommended):
   ```
   const Component: React.FC<Props> = ({ children }) => {
     return <div>{children}</div>;
   };
   ```

   NEW (preferred):
   ```
   interface Props { children: React.ReactNode; }
   function Component({ children }: Props) {
     return <div>{children}</div>;
   };
   ```

Q5: How to type useState?
A: ```
   const [count, setCount] = useState<number>(0);
   const [user, setUser] = useState<User | null>(null);
   const [items, setItems] = useState<Item[]>([]);

   // Type inference (usually works)
   const [name, setName] = useState(''); // Inferred as string
   ```
*/

// ============================================================
// 2. ADVANCED REACT TYPING
// ============================================================

/*
Q6: How to type useRef in TypeScript?
A: ```
   const inputRef = useRef<HTMLInputElement>(null);
   const timerRef = useRef<NodeJS.Timeout | null>(null);

   inputRef.current?.focus();
   ```

Q7: How to type useContext?
A: ```
   interface UserContextType {
     user: User | null;
     setUser: (user: User) => void;
   }

   const UserContext = createContext<UserContextType | undefined>(undefined);

   function useUser() {
     const context = useContext(UserContext);
     if (!context) {
       throw new Error('useUser must be used within UserProvider');
     }
     return context;
   }
   ```

Q8: How to type useReducer?
A: ```
   interface State { count: number; }
   type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

   function reducer(state: State, action: Action): State {
     switch (action.type) {
       case 'INCREMENT':
         return { count: state.count + 1 };
       case 'DECREMENT':
         return { count: state.count - 1 };
     }
   }

   const [state, dispatch] = useReducer(reducer, { count: 0 });
   ```

Q9: How to type event handlers?
A: ```
   type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
   type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
   type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

   function Component() {
     const handleClick: ClickHandler = (e) => {
       console.log(e.currentTarget.textContent);
     };

     return <button onClick={handleClick}>Click</button>;
   }
   ```

Q10: How to type async functions in React?
A: ```
   async function fetchUser(id: number): Promise<User> {
     const response = await fetch(`/api/users/${id}`);
     if (!response.ok) throw new Error('Failed to fetch');
     return response.json();
   }

   // In component
   useEffect(() => {
     let cancelled = false;

     const load = async () => {
       try {
         const user = await fetchUser(id);
         if (!cancelled) setUser(user);
       } catch (error) {
         setError(error);
       }
     };

     load();
     return () => { cancelled = true; };
   }, [id]);
   ```
*/

// ============================================================
// 3. TYPESCRIPT GENERICS
// ============================================================

/*
Q11: What are generics in TypeScript?
A: Generics allow flexible, reusable types:
   ```
   function identity<T>(arg: T): T {
     return arg;
   }

   const num = identity<number>(5);
   const str = identity<string>('hello');
   ```

Q12: How to use generics in React components?
A: ```
   interface ListProps<T> {
     items: T[];
     renderItem: (item: T) => React.ReactNode;
   }

   function List<T extends { id: string }>(props: ListProps<T>) {
     return (
       <ul>
         {props.items.map(item => (
           <li key={item.id}>{props.renderItem(item)}</li>
         ))}
       </ul>
     );
   }
   ```

Q13: What's keyof constraint?
A: Extract keys from type:
   ```
   interface User { name: string; age: number; }

   function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
     return obj[key];
   }

   getProperty(user, 'name'); // ✅ OK
   getProperty(user, 'email'); // ❌ Error
   ```

Q14: How to type custom hooks with generics?
A: ```
   function useFetch<T>(url: string): {
     data: T | null;
     loading: boolean;
     error: Error | null;
   } {
     const [data, setData] = useState<T | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<Error | null>(null);

     useEffect(() => {
       fetch(url)
         .then(r => r.json() as Promise<T>)
         .then(data => setData(data))
         .catch(err => setError(err));
     }, [url]);

     return { data, loading, error };
   }

   const { data: users } = useFetch<User[]>('/api/users');
   ```

Q15: What's conditional types?
A: Type depends on condition:
   ```
   type IsString<T> = T extends string ? true : false;

   type A = IsString<'hello'>; // true
   type B = IsString<number>;  // false

   // Practical example
   type Flatten<T> = T extends Array<infer U> ? U : T;

   type Str = Flatten<string[]>; // string
   type Num = Flatten<number>;   // number
   ```
*/

// ============================================================
// 4. ADVANCED TYPESCRIPT PATTERNS
// ============================================================

/*
Q16: How to type higher-order components?
A: ```
   interface WithAuthProps {
     isAuthenticated: boolean;
   }

   function withAuth<P extends WithAuthProps>(
     Component: React.ComponentType<P>
   ): React.ComponentType<Omit<P, 'isAuthenticated'>> {
     return (props) => {
       const isAuthenticated = useAuth();
       return <Component {...props as P} isAuthenticated={isAuthenticated} />;
     };
   }
   ```

Q17: How to type render props?
A: ```
   interface RenderPropProps<T> {
     data: T[];
     children: (item: T) => React.ReactNode;
   }

   function List<T extends { id: string }>(props: RenderPropProps<T>) {
     return (
       <ul>
         {props.data.map(item => (
           <li key={item.id}>{props.children(item)}</li>
         ))}
       </ul>
     );
   }
   ```

Q18: What's utility types in TypeScript?
A: Built-in generic types:
   - Partial<T>: All properties optional
   - Required<T>: All properties required
   - Readonly<T>: All properties readonly
   - Record<K, V>: Object with specific keys/values
   - Pick<T, K>: Select specific properties
   - Omit<T, K>: Exclude specific properties
   - Exclude<T, U>: Exclude types from union
   - Extract<T, U>: Extract types from union

Q19: Examples of utility types
A: ```
   interface User { id: number; name: string; email: string; }

   type PartialUser = Partial<User>;
   // { id?: number; name?: string; email?: string; }

   type UserPreview = Pick<User, 'id' | 'name'>;
   // { id: number; name: string; }

   type UserWithoutEmail = Omit<User, 'email'>;
   // { id: number; name: string; }

   type UserStatus = 'active' | 'inactive' | 'banned';
   type ActiveUser = Exclude<UserStatus, 'inactive' | 'banned'>;
   // 'active'
   ```

Q20: How to type Redux with TypeScript?
A: ```
   interface State {
     count: number;
     user: User | null;
   }

   type Action =
     | { type: 'INCREMENT' }
     | { type: 'SET_USER'; payload: User }
     | { type: 'CLEAR_USER' };

   function reducer(state: State, action: Action): State {
     switch (action.type) {
       case 'INCREMENT':
         return { ...state, count: state.count + 1 };
       case 'SET_USER':
         return { ...state, user: action.payload };
       case 'CLEAR_USER':
         return { ...state, user: null };
     }
   }
   ```
*/

// ============================================================
// 5. TYPESCRIPT BEST PRACTICES
// ============================================================

/*
Q21: What are common TypeScript mistakes?
A: 1. Using `any` everywhere
   2. Not using strict mode
   3. Over-typing (type inference exists)
   4. Incorrect null/undefined handling
   5. Unsafe type assertions (as)
   6. Not using discriminated unions

Q22: When to use `as` type assertion?
A: Rarely! Use only when:
   - You know more than TypeScript
   - Working with dynamic data

   ✅ OK:
   ```
   const element = document.getElementById('app') as HTMLDivElement;
   ```

   ❌ BAD:
   ```
   const user = response as User; // Let TypeScript infer
   ```

Q23: How to handle null/undefined safely?
A: ```
   // Optional chaining
   user?.address?.street

   // Nullish coalescing
   const name = user?.name ?? 'Unknown'

   // Type narrowing
   if (user !== null) {
     console.log(user.name); // user is User here
   }

   // Non-null assertion (use sparingly!)
   user!.name // Only if SURE it's not null
   ```

Q24: What's discriminated union?
A: Type union with discriminator field:
   ```
   type Result<T> =
     | { status: 'success'; data: T }
     | { status: 'error'; error: string }
     | { status: 'loading' };

   function handleResult<T>(result: Result<T>) {
     if (result.status === 'success') {
       console.log(result.data); // T
     } else if (result.status === 'error') {
       console.log(result.error); // string
     }
   }
   ```

Q25: TypeScript testing - how to type tests?
A: ```
   import { render, screen } from '@testing-library/react';

   test<typeof Component>('renders', () => {
     render(<Component />);
     expect(screen.getByText('test')).toBeInTheDocument();
   });

   // Type custom hook
   test('useCounter', () => {
     const { result } = renderHook(() => useCounter());
     expect(result.current.count).toBe(0);
   });
   ```
*/

// ============================================================
// TYPESCRIPT INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know basic typing (interface, type)
- Can type component props
- Understand union types
- Know utility types

Big4 (Mid to Senior):
- Generics with constraints
- Advanced patterns (HOC typing)
- Conditional types
- Discriminated unions
- Know TypeScript stdlib

Most asked questions:

1. "interface vs type - when to use what?"
   - interface for object contracts, type for unions/primitives

2. "How to type this React component?"
   - Props interface, event handlers, state types

3. "What's keyof constraint?"
   - Extract keys from type, use for type-safe object access

4. "How to handle null/undefined safely?"
   - Optional chaining (?.), nullish coalescing (??), type narrowing

5. "How to type custom hooks?"
   - Generic types, return type annotation

6. "Utility types - when to use Omit/Pick?"
   - Reuse types, remove unnecessary properties
*/

export const TYPESCRIPT_INTERVIEW_TOPICS = {
  BASICS: [1, 2, 3, 4, 5],
  REACT_TYPING: [6, 7, 8, 9, 10],
  GENERICS: [11, 12, 13, 14, 15],
  ADVANCED: [16, 17, 18, 19, 20],
  BEST_PRACTICES: [21, 22, 23, 24, 25],
};
