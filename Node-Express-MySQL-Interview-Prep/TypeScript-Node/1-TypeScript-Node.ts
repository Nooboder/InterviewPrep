/**
 * TYPESCRIPT WITH NODE.JS - Interview Prep
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (Big4 projects are TypeScript-first — this is mandatory)
 *
 * Topics: Types, Interfaces, Generics, Decorators, Express+TS, Utility Types
 */

// ============================================================
// Q1: TypeScript project setup for Node.js/Express
// ============================================================
/*
tsconfig.json for Node.js:
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,              // enables all strict checks
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,         // generate .d.ts files
    "sourceMap": true            // for debugging
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
*/

// ============================================================
// Q2: Interfaces vs Types — when to use each
// ============================================================
/*
Interface: Extendable, merged declarations, for object shapes
Type: Can represent unions/intersections, primitives, tuples
*/

// Prefer interfaces for entity shapes (can extend, implement)
interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: Date;
}

// Extend interface
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// Type for complex union/intersection scenarios
type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
} | {
  error: string;
  statusCode: number;
};

type UserId = number;
type UserOrId = User | UserId;

// ============================================================
// Q3: Generic types — the most asked TypeScript topic
// ============================================================

// Generic repository pattern (common in Big4 enterprise code)
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  findAll(options?: PaginationOptions): Promise<{ items: T[]; total: number }>;
  create(data: Omit<T, 'id' | 'createdAt'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// Implement the generic repository for User
class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User | null> {
    // DB query
    return null;
  }

  async findAll(options: PaginationOptions = {}): Promise<{ items: User[]; total: number }> {
    const { page = 1, limit = 20 } = options;
    // DB query with pagination
    return { items: [], total: 0 };
  }

  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // DB insert
    return {} as User;
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    // DB update
    return null;
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}

// Generic async result wrapper (eliminates try/catch boilerplate)
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function safeAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage — no try/catch needed in routes
const result = await safeAsync(() => userRepo.findById(1));
if (result.success) {
  console.log(result.data.email);
} else {
  console.error(result.error.message);
}

// ============================================================
// Q4: Utility Types — must know all 10
// ============================================================

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
}

// Partial — all properties optional (update DTOs)
type UpdateProductDto = Partial<Omit<Product, 'id'>>;

// Required — all properties required (complete entity)
type CompleteProduct = Required<Product>;

// Pick — select specific properties
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

// Omit — exclude specific properties
type CreateProductDto = Omit<Product, 'id'>; // id is auto-generated

// Record — key-value mapping
type ProductMap = Record<number, Product>;         // Map by ID
type HttpStatusMessages = Record<number, string>;  // Status codes

// Readonly — immutable object
type ReadonlyProduct = Readonly<Product>;

// ReturnType — extract function return type
async function fetchUser(id: number) { return {} as User; }
type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>; // User

// Parameters — extract function parameter types
type FetchUserParams = Parameters<typeof fetchUser>; // [number]

// NonNullable — remove null/undefined
type DefinitelyUser = NonNullable<User | null | undefined>; // User

// Extract / Exclude — filter union types
type StringOrNumber = string | number | boolean;
type OnlyStrOrNum = Extract<StringOrNumber, string | number>; // string | number
type NoString = Exclude<StringOrNumber, string>; // number | boolean

// ============================================================
// Q5: Typed Express with middleware chain
// ============================================================
import { Request, Response, NextFunction, RequestHandler } from 'express';

// Extend Express Request type to add custom properties
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: 'admin' | 'manager' | 'user';
      };
      requestId?: string;
    }
  }
}

// Typed middleware
const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Missing token' });
    return; // void return — important with Express types
  }
  // decode token and set req.user
  next();
};

// Typed route handler with generics
function createHandler<TBody, TParams = {}, TQuery = {}, TResponse = unknown>(
  handler: (
    req: Request<TParams, TResponse, TBody, TQuery>,
    res: Response<TResponse>
  ) => Promise<void>
): RequestHandler<TParams, TResponse, TBody, TQuery> {
  return (req, res, next) => {
    handler(req, res).catch(next);
  };
}

// Usage
interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

const createUser = createHandler<CreateUserBody, {}, {}, UserResponse>(async (req, res) => {
  const { name, email, password } = req.body; // fully typed
  // create user...
  res.status(201).json({ id: 1, name, email });
});

// ============================================================
// Q6: Discriminated Unions — powerful pattern for state machines
// ============================================================

type OrderStatus =
  | { status: 'pending'; createdAt: Date }
  | { status: 'confirmed'; confirmedAt: Date; estimatedDelivery: Date }
  | { status: 'shipped'; trackingNumber: string; shippedAt: Date }
  | { status: 'delivered'; deliveredAt: Date; signature?: string }
  | { status: 'cancelled'; cancelledAt: Date; reason: string };

function getOrderMessage(order: OrderStatus): string {
  switch (order.status) {
    case 'pending':
      return 'Order received, awaiting confirmation';
    case 'confirmed':
      return `Confirmed! Estimated delivery: ${order.estimatedDelivery.toDateString()}`;
    case 'shipped':
      return `Shipped! Track with: ${order.trackingNumber}`;
    case 'delivered':
      return `Delivered on ${order.deliveredAt.toDateString()}`;
    case 'cancelled':
      return `Cancelled: ${order.reason}`;
    // TypeScript ensures exhaustive — no default needed, error if new case added
  }
}

// ============================================================
// Q7: Zod — runtime type validation (Big4 standard for APIs)
// ============================================================
import { z } from 'zod';

// Define schema once, get TypeScript types automatically
const CreateUserSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    'Password must contain uppercase, lowercase, number, and special character'
  ),
  role: z.enum(['admin', 'manager', 'user']).default('user'),
  age: z.number().int().min(18).max(120).optional(),
});

// Extract TypeScript type from schema
type CreateUserDto = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; password: string; role: 'admin' | 'manager' | 'user'; age?: number }

// Validation middleware factory
function validateBody<T extends z.ZodSchema>(schema: T): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: 'Validation failed',
        details: result.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    req.body = result.data; // replace with parsed/coerced data
    next();
  };
}

// Route with schema validation
router.post('/users', validateBody(CreateUserSchema), async (req: Request, res: Response) => {
  const user: CreateUserDto = req.body; // fully typed and validated
  // ...
});

// ============================================================
// INTERVIEW QUESTIONS (Big4 Level)
/*
Q: What is the difference between `interface` and `type` in TypeScript?
A: Interface can be extended with `extends` and merged (declaration merging).
   Type can represent unions, intersections, tuples, and primitives.
   For object shapes: prefer interface. For complex type algebra: use type.

Q: What is a generic constraint?
A: <T extends SomeType> — T must be compatible with SomeType.
   Example: <T extends { id: number }> ensures T always has an id property.

Q: What does `strict: true` in tsconfig enable?
A: Enables: strictNullChecks, noImplicitAny, strictFunctionTypes,
   strictPropertyInitialization, strictBindCallApply.
   Key: strictNullChecks forces you to handle null/undefined explicitly.

Q: What is `unknown` vs `any`?
A: any: opt-out of type checking — dangerous, avoid it.
   unknown: type-safe any — you MUST narrow the type before using it.
   Use unknown for user input, JSON.parse results, caught errors.

Q: How do you type a function that can accept multiple argument types?
A: Use overloads:
   function process(x: string): string;
   function process(x: number): number;
   function process(x: string | number): string | number { ... }
*/
