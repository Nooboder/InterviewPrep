# 40+ MySQL Interview Questions & Answers

## 🎯 Most Frequently Asked MySQL Questions for Big4 Companies

### Interview Difficulty: ⭐⭐⭐⭐ (Hard)
### Frequency Asked: Very High in Deloitte, PwC, EY, TCS

---

## PART 1: SQL BASICS & FUNDAMENTALS

### Q1: Explain ACID properties in databases
**Frequency in Big4:** ⭐⭐⭐⭐⭐

**Answer:**
ACID is the foundation of reliable databases:

**A - Atomicity**
- A transaction is "all or nothing"
- Either all operations complete or none do
```sql
BEGIN TRANSACTION;
UPDATE account1 SET balance = balance - 100;
UPDATE account2 SET balance = balance + 100;
COMMIT;
-- If error occurs, entire transaction rolls back
```

**C - Consistency**
- Database moves from one valid state to another
- All integrity constraints are maintained
- No orphaned records

**I - Isolation**
- Concurrent transactions don't interfere
- Prevents dirty reads, non-repeatable reads

```sql
-- Transaction 1
UPDATE users SET age = 30 WHERE id = 1;

-- Transaction 2 (running concurrently)
SELECT * FROM users WHERE id = 1;
-- Should NOT see uncommitted changes from Transaction 1
```

**D - Durability**
- Once committed, data is permanent
- Survives system failures, power loss, etc.
- Written to disk

---

### Q2: Explain normalization and normal forms
**Frequency in Big4:** ⭐⭐⭐⭐⭐ (Very commonly asked!)

**Answer:**
Normalization reduces data redundancy and improves data integrity.

**1NF (First Normal Form)**
- No repeating groups
- Each column has atomic (indivisible) values

```sql
-- ✗ BAD: Repeating groups
CREATE TABLE students (
  id INT,
  name VARCHAR(100),
  languages VARCHAR(100) -- "English, Spanish, French"
);

-- ✓ GOOD: 1NF
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE student_languages (
  student_id INT,
  language VARCHAR(50),
  FOREIGN KEY(student_id) REFERENCES students(id)
);
```

**2NF (Second Normal Form)**
- Must be in 1NF
- Remove partial dependencies (non-key columns depend on FULL primary key)

```sql
-- ✗ BAD: Partial dependency
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  professor_name VARCHAR(100), -- Depends only on course_id, not (student_id, course_id)
  PRIMARY KEY(student_id, course_id)
);

-- ✓ GOOD: 2NF
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY(student_id, course_id)
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  professor_name VARCHAR(100)
);
```

**3NF (Third Normal Form)**
- Must be in 2NF
- Remove transitive dependencies (non-key columns depend only on primary key)

```sql
-- ✗ BAD: Transitive dependency
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT,
  department_name VARCHAR(100) -- Depends on department_id, not on id
);

-- ✓ GOOD: 3NF
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT,
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
```

---

### Q3: What are indexes and why are they important?
**Frequency in Big4:** ⭐⭐⭐⭐⭐

**Answer:**
An index is a data structure that speeds up query retrieval.

```sql
-- Create an index
CREATE INDEX idx_email ON users(email);

-- Without index: Scans all 1 million rows - SLOW
SELECT * FROM users WHERE email = 'user@example.com'; -- ~1 million checks

-- With index: Uses B-tree to find quickly - FAST
-- ~20 checks for 1 million records!

-- Types of indexes:
-- 1. Single column index
CREATE INDEX idx_email ON users(email);

-- 2. Composite index (multiple columns)
CREATE INDEX idx_user_email ON users(department_id, email);

-- 3. Unique index
CREATE UNIQUE INDEX idx_unique_email ON users(email);

-- 4. Primary key index (automatically created)
-- Fastest, but only one per table

-- Check index usage:
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

**Trade-offs:**
- ✓ Faster reads
- ✗ Slower writes (index must be updated)
- ✗ Uses extra disk space

---

### Q4: Explain JOINs - INNER, LEFT, RIGHT, FULL
**Frequency in Big4:** ⭐⭐⭐⭐⭐ (Almost every interview!)

**Answer:**

```sql
-- Sample tables:
-- users: id, name
-- orders: id, user_id, amount

-- INNER JOIN: Only rows that exist in BOTH tables
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Result: Only users who have orders

-- LEFT JOIN: All rows from LEFT table + matching rows from RIGHT
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Result: All users + their orders (NULL if no orders)

-- RIGHT JOIN: All rows from RIGHT table + matching rows from LEFT
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;

-- Result: All orders + their users (NULL if user deleted)

-- FULL OUTER JOIN: All rows from BOTH tables
SELECT users.name, orders.amount
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;

-- Result: All users + all orders (NULLs where not matched)

-- CROSS JOIN: Cartesian product (every combination)
SELECT users.name, products.name
FROM users
CROSS JOIN products;

-- Result: Every user paired with every product
-- users(5) × products(3) = 15 rows
```

**Visual Guide:**
```
Table A (users):     Table B (orders):
1. Alice             1. Alice (order)
2. Bob               2. Alice (order)
3. Charlie           4. David

INNER JOIN: 1, 2
LEFT JOIN:  1, 2, 3
RIGHT JOIN: 1, 2, 4
FULL JOIN:  1, 2, 3, 4
```

---

### Q5: What's the difference between WHERE and HAVING?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

```sql
-- WHERE: Filters rows BEFORE aggregation
-- HAVING: Filters rows AFTER aggregation

-- ✗ WRONG: Can't use aggregate function in WHERE
SELECT category, COUNT(*) as total
FROM products
WHERE COUNT(*) > 5
GROUP BY category;

-- ✓ CORRECT: Use HAVING for aggregate condition
SELECT category, COUNT(*) as total
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- ✓ ALSO CORRECT: Use WHERE for non-aggregate condition
SELECT category, COUNT(*) as total
FROM products
WHERE price > 100
GROUP BY category
HAVING COUNT(*) > 5;

-- Example:
-- WHERE: Filter products before grouping
-- HAVING: Filter groups after aggregation
```

---

## PART 2: QUERY OPTIMIZATION & PERFORMANCE

### Q6: How do you optimize a slow query?
**Frequency in Big4:** ⭐⭐⭐⭐⭐ (Real-world scenario!)

**Answer:**

```sql
-- Step 1: Use EXPLAIN to see execution plan
EXPLAIN SELECT * FROM orders WHERE user_id = 5 AND created_at > '2023-01-01';

-- Expected output shows:
-- - Type: Index usage (ALL, index, range, ref)
-- - Possible keys: Suggested indexes
-- - Key: Actually used index
-- - Rows: Estimated rows examined

-- Step 2: Add indexes on filtered columns
CREATE INDEX idx_user_created ON orders(user_id, created_at);

-- Step 3: Avoid SELECT *
-- ✗ BAD: Fetches all columns
SELECT * FROM orders WHERE user_id = 5;

-- ✓ GOOD: Fetch only needed columns
SELECT id, amount, created_at FROM orders WHERE user_id = 5;

-- Step 4: Avoid functions on indexed columns
-- ✗ SLOW: YEAR(created_at) prevents index use
SELECT * FROM orders WHERE YEAR(created_at) = 2023;

-- ✓ FAST: Use range comparison
SELECT * FROM orders WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';

-- Step 5: Avoid correlated subqueries
-- ✗ SLOW: Subquery runs for each row (10k queries!)
SELECT * FROM users WHERE id IN (
  SELECT user_id FROM orders WHERE amount > 100
);

-- ✓ FAST: Use JOIN
SELECT DISTINCT users.* FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.amount > 100;

-- Step 6: Use LIMIT for large result sets
SELECT * FROM logs LIMIT 1000;

-- Step 7: Archive old data
-- Instead of massive queries, move old data to archive table
```

---

### Q7: What is the N+1 query problem?
**Frequency in Big4:** ⭐⭐⭐⭐ (Very common in production!)

**Answer:**

```sql
-- ✗ BAD: N+1 problem
-- Get all users (1 query)
SELECT * FROM users;

-- For EACH user, fetch their orders (N additional queries)
// In application code:
for each user {
  SELECT * FROM orders WHERE user_id = user.id;
}
// Total: 1 + N queries! If N=10000, that's 10001 queries!

-- ✓ GOOD: Use JOIN to fetch all at once
SELECT users.*, orders.*
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
// Total: 1 query!

-- ✓ OR: Use subquery for filtering
SELECT * FROM users WHERE id IN (
  SELECT DISTINCT user_id FROM orders
);
// Total: 2 queries (acceptable)

-- How to detect N+1:
// 1. Enable query logging
// 2. Check for repeated queries with different parameters
// 3. Use ORM debugging tools (Sequelize, TypeORM, etc)
```

---

### Q8: When should you use indexes vs denormalization?
**Frequency in Big4:** ⭐⭐⭐⭐ (Design question!)

**Answer:**

```
Scenario: Need to fetch user info + order count frequently

Option 1: Normalized + Index (Better for WRITES)
┌─ users (id, name, email)
└─ orders (id, user_id, amount)
SELECT users.*, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;

✓ No redundant data
✗ Needs JOIN and GROUP BY (slower query)
✓ Writing orders is fast (no update needed)

Option 2: Denormalization (Better for READS)
┌─ users (id, name, email, order_count)
└─ orders (id, user_id, amount)

SELECT * FROM users;

✓ Fast reads (no JOIN)
✗ Need to update user.order_count on each order insert
✗ Risk of stale data if updates fail

RECOMMENDATION:
- Normalize first (proper design)
- Add denormalization ONLY if:
  1. Performance testing shows bottleneck
  2. Keep denormalized data in cache (Redis)
  3. Or use trigger to keep it updated
```

---

### Q9: Explain transactions and isolation levels
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

```sql
-- Basic transaction
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Isolation levels (from lowest to highest):

-- 1. READ UNCOMMITTED (Dirty reads possible!)
-- Transaction can read uncommitted changes
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- 2. READ COMMITTED (Most common)
-- Can't read uncommitted changes
-- Can have non-repeatable reads
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 3. REPEATABLE READ (MySQL default)
-- Consistent snapshot of data
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- 4. SERIALIZABLE (Slowest, most safe)
-- Transactions run sequentially
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Rollback example:
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Oops, mistake!
ROLLBACK; -- Undo all changes
```

---

## PART 3: SCHEMA DESIGN

### Q10: Design a schema for an e-commerce system
**Frequency in Big4:** ⭐⭐⭐⭐⭐ (Common design question!)

**Answer:**

```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_price (price)
);

-- Orders table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_created (user_id, created_at)
);

-- Order items (relationship between orders and products)
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id)
);

-- Example queries:
-- Get all products in an order
SELECT oi.quantity, p.name, p.price
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 5;

-- Get user's total spending
SELECT SUM(total_amount) as total_spent
FROM orders
WHERE user_id = 3;

-- Get best-selling products
SELECT p.name, COUNT(oi.id) as units_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY units_sold DESC
LIMIT 10;
```

---

### Q11: How do you handle soft deletes?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

```sql
-- Add deleted_at column
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  deleted_at TIMESTAMP NULL -- NULL = not deleted
);

-- Soft delete: Mark as deleted without removing
UPDATE users SET deleted_at = NOW() WHERE id = 5;

-- Restore deleted user
UPDATE users SET deleted_at = NULL WHERE id = 5;

-- Query only active users
SELECT * FROM users WHERE deleted_at IS NULL;

-- Query only deleted users
SELECT * FROM users WHERE deleted_at IS NOT NULL;

-- Always add this index for efficiency
CREATE INDEX idx_deleted_at ON users(deleted_at);

-- BENEFITS:
-- ✓ Can recover deleted data
-- ✓ Audit trail
-- ✗ More storage needed
-- ✗ Queries become more complex

-- WHEN TO USE:
-- ✓ Financial records (must keep history)
-- ✓ User accounts (might need recovery)
-- ✓ Legal compliance (data retention)

-- WHEN NOT TO USE:
// ✗ Massive datasets (e.g. logs)
// ✗ Privacy-critical (right to be forgotten)
```

---

## KEY INTERVIEW TIPS

1. **Always explain WHY** before HOW
2. **Draw ER diagrams** for schema design questions
3. **Know ACID properties** deeply
4. **Understand indexing trade-offs**
5. **Know how to optimize** (EXPLAIN, indexes, rewrites)
6. **Ask about scale** before designing
7. **Think about edge cases** (deletions, duplicates)

---

## NEXT STEPS

1. **Re-read** this Q&A multiple times
2. **Write SQL** locally in MySQL or PostgreSQL
3. **Optimize queries** you've written before
4. **Design schemas** from scratch (5+ times)
5. **Mock interview** with these questions

---

**Good luck! You've got this! 💪**

### Continue studying:
- 2-Database-Design.js
- 3-Performance-Tuning.js
- 4-Advanced-SQL.js
- 6-Coding-Challenges.js
