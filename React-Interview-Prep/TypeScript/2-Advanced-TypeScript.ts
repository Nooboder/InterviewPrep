/**
 * ADVANCED TYPESCRIPT — Mapped Types, Template Literals, Type Guards
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Senior TS rounds separate good from great candidates)
 *
 * Topics: Mapped types, template literal types, conditional types with infer,
 *         type guards, assertion functions, branded types
 */

// ============================================================
// Q1: Mapped Types — transform every property of a type
// ============================================================
/*
Mapped types iterate over keys of a type and produce a new type.
Syntax: { [K in keyof T]: NewType }

This is HOW standard utility types like Readonly<T>, Partial<T> are implemented.
*/

// Implementing standard utility types from scratch
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] }; // -? removes optionality
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyMutable<T> = { -readonly [K in keyof T]: T[K] }; // -readonly removes readonly

// Practical mapped types you'll actually write
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Nullable version — make every property possibly null
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; ... }

// Form state type — every field becomes a string + errors
type FormFields<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string | null;
    touched: boolean;
  };
};
type UserForm = FormFields<Omit<User, 'id' | 'createdAt'>>;
// { name: { value: string; error: string | null; touched: boolean }; ... }

// Read only specific keys
type ReadonlyKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
type UserWithReadonlyId = ReadonlyKeys<User, 'id' | 'createdAt'>;
// id and createdAt are readonly, rest are mutable

// Conditional mapped types — transform based on value type
type StringifyValues<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
type SerializedUser = StringifyValues<User>;
// createdAt becomes string (for JSON serialization)

// ============================================================
// Q2: Template Literal Types — string type algebra
// ============================================================
/*
Template literal types build string literal types from other types.
Introduced in TypeScript 4.1.
*/

// Basic template literal
type EventName = 'click' | 'focus' | 'blur';
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

// CSS property values
type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
type CSSLength = `${number}${CSSUnit}`;
// You can't express an exact number easily, but for literal numbers:
type GridColumn = `${1 | 2 | 3 | 4 | 5 | 6}/${1 | 2 | 3 | 4 | 5 | 6 | 7}`;
// "1/2" | "1/3" | ... | "6/7"

// REST API routes type-safety
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ApiEndpoint = `/api/${string}`;
type RouteKey = `${HttpMethod} ${ApiEndpoint}`;
// "GET /api/users" | "POST /api/users" | etc.

// Event system with type-safe listeners
type EventMap = {
  'user:created': { user: User };
  'user:deleted': { userId: number };
  'order:placed': { orderId: number; total: number };
};

// Extract event names as types
type EventNames = keyof EventMap; // "user:created" | "user:deleted" | "order:placed"

// Type-safe event emitter
interface TypedEventEmitter<TMap extends Record<string, object>> {
  on<K extends keyof TMap>(event: K, listener: (data: TMap[K]) => void): void;
  emit<K extends keyof TMap>(event: K, data: TMap[K]): void;
  off<K extends keyof TMap>(event: K, listener: (data: TMap[K]) => void): void;
}

// Getter/setter generation with template literals
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserGetters = Getters<Pick<User, 'name' | 'email'>>;
// { getName: () => string; getEmail: () => string }

// ============================================================
// Q3: Type Guards — narrowing types at runtime
// ============================================================
/*
TypeScript narrows types in:
  - if (typeof x === 'string')
  - if (x instanceof SomeClass)
  - if ('property' in x)
  - Custom type guard functions (predicate: arg is Type)
  - Assertion functions
*/

// Basic typeof and instanceof narrowing
function processValue(value: string | number | null) {
  if (value === null) {
    console.log('null'); // TypeScript knows: null
    return;
  }
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // TypeScript knows: string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows: number
  }
}

// Custom type guard — "is" predicate
interface Dog { bark(): void; kind: 'dog' }
interface Cat { meow(): void; kind: 'cat' }
type Animal = Dog | Cat;

// Without type guard — TypeScript doesn't narrow
function makeSound(animal: Animal) {
  if (animal.kind === 'dog') {
    animal.bark(); // TypeScript narrows via discriminant — kind property
  } else {
    animal.meow();
  }
}

// Custom type guard function — "arg is Type"
function isDog(animal: Animal): animal is Dog {
  return animal.kind === 'dog';
}

function petAnimal(animal: Animal) {
  if (isDog(animal)) {
    animal.bark(); // TypeScript knows: Dog
  } else {
    animal.meow(); // TypeScript knows: Cat
  }
}

// Type guard for unknown data (API responses)
interface ApiUser {
  id: number;
  name: string;
  email: string;
}

function isApiUser(data: unknown): data is ApiUser {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as ApiUser).id === 'number' &&
    typeof (data as ApiUser).name === 'string' &&
    typeof (data as ApiUser).email === 'string'
  );
}

async function fetchUser(id: number): Promise<ApiUser> {
  const response = await fetch(`/api/users/${id}`);
  const data: unknown = await response.json();

  if (!isApiUser(data)) {
    throw new Error('Invalid user data from API');
  }

  return data; // TypeScript knows: ApiUser
}

// ============================================================
// Q4: Assertion Functions
// ============================================================
/*
Assertion functions (asserts condition) narrow types by throwing if false.
Used for "this MUST be X, throw if not" scenarios.
*/

function assertNonNull<T>(value: T | null | undefined, message: string): asserts value is T {
  if (value == null) throw new Error(message);
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, got ${typeof value}`);
  }
}

// Usage
const userId: string | null = getUserId();
assertNonNull(userId, 'User must be logged in');
// After assertion, TypeScript knows userId is string (not null)
console.log(userId.toUpperCase()); // no error

// ============================================================
// Q5: infer in conditional types
// ============================================================
/*
infer: extracts a type from within a conditional type.
Used to "unwrap" wrapper types.
*/

// Extract return type of a function
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : never;
type Fn = () => string;
type Result = ReturnType2<Fn>; // string

// Extract Promise value type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Value = UnwrapPromise<Promise<number>>; // number
type Value2 = UnwrapPromise<string>;          // string (not a Promise, returns T)

// Extract array element type
type ArrayElement<T> = T extends Array<infer E> ? E : never;
type Elem = ArrayElement<string[]>; // string
type Elem2 = ArrayElement<[1, 2, 3]>; // 1 | 2 | 3

// Extract first argument of function
type FirstArg<T extends (...args: any) => any> =
  T extends (first: infer F, ...rest: any[]) => any ? F : never;

type MyFn = (id: number, name: string) => void;
type First = FirstArg<MyFn>; // number

// ============================================================
// Q6: Branded Types — prevent type confusion
// ============================================================
/*
Branded types prevent accidentally mixing semantically different types
that have the same underlying TypeScript type (both are `number`, but
one is a userId and one is an orderId).
*/

// Method 1: Using intersection type
type Brand<T, B> = T & { readonly _brand: B };

type UserId = Brand<number, 'UserId'>;
type OrderId = Brand<number, 'OrderId'>;

function getUser(id: UserId): User { return {} as User; }
function getOrder(id: OrderId) { return {} as Order; }

const userId = 1 as UserId;
const orderId = 1 as OrderId;

getUser(userId);   // OK
getOrder(orderId); // OK
// getUser(orderId);  // TypeScript ERROR — prevents accident!
// getUser(1);        // TypeScript ERROR — must explicitly brand

// Factory functions for branded types
function createUserId(id: number): UserId {
  if (id <= 0) throw new Error('Invalid user ID');
  return id as UserId;
}

// ============================================================
// Q7: Satisfies operator (TypeScript 4.9+)
// ============================================================
/*
satisfies: validates that a value matches a type WITHOUT widening the type.
The inferred type keeps its literal precision while still being type-checked.
*/

type Colors = 'red' | 'green' | 'blue';
type Palette = Record<Colors, string | [number, number, number]>;

// Problem with plain type annotation: TypeScript widens to string | [number, number, number]
const paletteWithType: Palette = {
  red: '#ff0000',
  green: [0, 255, 0],
  blue: '#0000ff',
};
// paletteWithType.green.map(...) — ERROR! TypeScript thinks it could be string

// satisfies: validates against Palette but keeps literal types
const palette = {
  red: '#ff0000',
  green: [0, 255, 0],
  blue: '#0000ff',
} satisfies Palette;
// palette.green.map(...)  — OK! TypeScript infers [number, number, number]
// palette.red.toUpperCase() — OK! TypeScript infers string

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is a mapped type and when do you write one?
A: A mapped type iterates over keys of an existing type to produce a new type.
   Write one when you need to systematically transform all properties the same way:
   nullable version, form state version, stringified version, etc.
   Example: { [K in keyof T]?: T[K] } makes all properties optional.

Q: What are template literal types used for?
A: Building complex string literal types from simpler ones.
   Common uses: typed event names, API route keys, CSS property combinations,
   auto-generating getter/setter method names from property names.

Q: What is the difference between a type guard and a type assertion?
A: Type guard (arg is Type): runtime check + compile-time narrowing. SAFE.
   Type assertion (as Type): tells TypeScript "trust me" — NO runtime check. UNSAFE.
   Always prefer type guards; use assertions only when you're certain TypeScript
   is wrong and you can't fix the type definition.

Q: When do you use `infer` in TypeScript?
A: When you need to extract a type from inside another type in a conditional type.
   Common examples: extracting Promise value, array element, function return type,
   or constructor parameter types.

Q: What is a branded type and why would you use it?
A: A branded type adds a phantom property (never assigned at runtime) to distinguish
   structurally identical types. Prevents accidentally passing a UserId where an
   OrderId is expected. Both are numbers, but TypeScript treats them as different types.
*/
