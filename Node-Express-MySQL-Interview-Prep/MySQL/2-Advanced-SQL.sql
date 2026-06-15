/**
 * MySQL ADVANCED SQL - Interview Prep
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (EY, Deloitte use complex Oracle/PostgreSQL — SQL depth matters)
 *
 * Topics: Window Functions, CTEs, Subqueries, Stored Procedures, Query Optimization
 */

-- ============================================================
-- Q1: Window Functions (most asked advanced SQL topic)
-- ============================================================
/*
Window functions compute across a set of rows RELATED to the current row.
Unlike GROUP BY, they do NOT collapse rows.

Syntax: FUNCTION() OVER (PARTITION BY col ORDER BY col ROWS/RANGE ...)
*/

-- ROW_NUMBER: unique sequential rank per partition
-- RANK: gaps when tie (1,1,3)
-- DENSE_RANK: no gaps when tie (1,1,2)

SELECT
  employee_id,
  name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Get top 3 earners per department (classic interview question)
SELECT * FROM (
  SELECT
    name, department, salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dr
  FROM employees
) ranked
WHERE dr <= 3;

-- LAG/LEAD: access previous/next row value
SELECT
  order_date,
  revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY order_date) AS prev_revenue,
  revenue - LAG(revenue, 1, 0) OVER (ORDER BY order_date) AS revenue_change,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY order_date))
        / LAG(revenue) OVER (ORDER BY order_date), 2) AS pct_change
FROM daily_revenue;

-- Running total with SUM() OVER
SELECT
  order_date,
  amount,
  SUM(amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) AS running_total,
  AVG(amount) OVER (ORDER BY order_date ROWS 6 PRECEDING) AS rolling_7day_avg
FROM orders;

-- NTILE: divide rows into N equal buckets
SELECT
  customer_id,
  total_spend,
  NTILE(4) OVER (ORDER BY total_spend DESC) AS quartile
  -- quartile 1 = top 25% spenders
FROM customers;

-- ============================================================
-- Q2: Common Table Expressions (CTEs)
-- ============================================================
/*
CTEs: Named temporary result set within a query.
Benefits: Readability, reusability within query, replaces nested subqueries.
*/

-- Simple CTE
WITH high_value_customers AS (
  SELECT user_id, SUM(amount) AS total_spent
  FROM orders
  WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
  GROUP BY user_id
  HAVING total_spent > 1000
)
SELECT u.name, u.email, hvc.total_spent
FROM users u
JOIN high_value_customers hvc ON u.id = hvc.user_id
ORDER BY hvc.total_spent DESC;

-- Multiple CTEs (chain them)
WITH
  order_totals AS (
    SELECT user_id, COUNT(*) AS order_count, SUM(amount) AS total
    FROM orders GROUP BY user_id
  ),
  avg_stats AS (
    SELECT AVG(total) AS avg_spend, AVG(order_count) AS avg_orders
    FROM order_totals
  )
SELECT
  u.name,
  ot.order_count,
  ot.total,
  ROUND(ot.total / av.avg_spend * 100, 1) AS pct_of_avg
FROM users u
JOIN order_totals ot ON u.id = ot.user_id
CROSS JOIN avg_stats av
ORDER BY ot.total DESC;

-- Recursive CTE — organizational hierarchy
WITH RECURSIVE org_chart AS (
  -- Anchor: CEO (no manager)
  SELECT id, name, manager_id, 0 AS level, CAST(name AS CHAR(1000)) AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: employees with managers
  SELECT e.id, e.name, e.manager_id, oc.level + 1,
         CONCAT(oc.path, ' > ', e.name)
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT id, name, level, path FROM org_chart;

-- ============================================================
-- Q3: Advanced JOIN scenarios
-- ============================================================

-- Find users who have NOT placed any orders (LEFT JOIN anti-pattern)
SELECT u.id, u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL; -- faster than NOT IN with NULLs, faster than NOT EXISTS in MySQL

-- Self JOIN — find employees who earn more than their manager
SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- CROSS JOIN with use case — generate a date range
SELECT
  DATE_ADD('2024-01-01', INTERVAL n.num DAY) AS date
FROM (
  SELECT a.N + b.N * 10 + c.N * 100 AS num
  FROM (SELECT 0 N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a
  CROSS JOIN ... -- generates 0-364
) n
WHERE DATE_ADD('2024-01-01', INTERVAL n.num DAY) <= '2024-12-31';

-- ============================================================
-- Q4: Query Optimization — EXPLAIN and indexes
-- ============================================================
/*
EXPLAIN shows the query execution plan.
Key columns: type, key, rows, Extra

type (best to worst): system > const > eq_ref > ref > range > index > ALL
- ALL = full table scan — avoid on large tables
- range = index range scan — acceptable
- ref = index lookup — good
- const = single row by primary key — best
*/

-- Before optimization
EXPLAIN SELECT * FROM orders WHERE user_id = 5 AND status = 'pending';
-- If no index: type=ALL, rows=100000 (scans everything!)

-- Create composite index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- Now: type=ref, rows=10 (dramatically faster)

/*
Composite index column order:
- Put equality conditions first, range conditions last
- WHERE user_id = 5 AND status = 'pending' → index(user_id, status) ✓
- WHERE user_id = 5 AND created_at > '2024-01-01' → index(user_id, created_at) ✓
- Leading column must be used, else index is skipped
*/

-- Covering index — all needed columns IN the index (no table lookup)
CREATE INDEX idx_covering ON orders(user_id, status, amount, created_at);
SELECT amount, created_at FROM orders WHERE user_id = 5 AND status = 'pending';
-- Extra: "Using index" — fastest possible, data served from index only

-- ============================================================
-- Q5: Transactions and Isolation Levels
-- ============================================================
/*
Isolation levels and problems they prevent:

READ UNCOMMITTED → dirty reads possible
READ COMMITTED → prevents dirty reads (default in many DBs)
REPEATABLE READ → prevents dirty + non-repeatable reads (MySQL InnoDB default)
SERIALIZABLE → prevents all anomalies (slowest, uses locks)

Anomalies:
- Dirty Read: read uncommitted data that gets rolled back
- Non-Repeatable Read: same query returns different results within transaction
- Phantom Read: new rows appear in repeated range query within transaction
*/

-- Stock management with transactions (interview classic)
START TRANSACTION;

-- Lock the row for update (prevents concurrent modification)
SELECT stock_count FROM products WHERE id = 101 FOR UPDATE;

-- Check and update
UPDATE products
SET stock_count = stock_count - 2
WHERE id = 101 AND stock_count >= 2;

-- Check if update succeeded
-- In application code: check affected_rows
-- If 0 → insufficient stock → ROLLBACK

INSERT INTO order_items (order_id, product_id, quantity) VALUES (999, 101, 2);

COMMIT;

-- ============================================================
-- Q6: Stored Procedures
-- ============================================================

DELIMITER //

CREATE PROCEDURE GetUserOrderSummary(IN p_user_id INT, IN p_months INT)
BEGIN
  DECLARE v_start_date DATE DEFAULT DATE_SUB(CURDATE(), INTERVAL p_months MONTH);

  SELECT
    COUNT(*) AS total_orders,
    SUM(amount) AS total_spent,
    AVG(amount) AS avg_order_value,
    MAX(created_at) AS last_order_date
  FROM orders
  WHERE user_id = p_user_id
    AND created_at >= v_start_date
    AND status != 'cancelled';
END //

DELIMITER ;

-- Call procedure
CALL GetUserOrderSummary(123, 12);

-- ============================================================
-- Q7: Advanced aggregations
-- ============================================================

-- Pivot — monthly sales per product category
SELECT
  YEAR(created_at) AS year,
  SUM(CASE WHEN MONTH(created_at) = 1  THEN amount ELSE 0 END) AS Jan,
  SUM(CASE WHEN MONTH(created_at) = 2  THEN amount ELSE 0 END) AS Feb,
  SUM(CASE WHEN MONTH(created_at) = 3  THEN amount ELSE 0 END) AS Mar,
  SUM(CASE WHEN MONTH(created_at) = 12 THEN amount ELSE 0 END) AS Dec,
  SUM(amount) AS total
FROM orders
GROUP BY YEAR(created_at)
ORDER BY year;

-- Percentile calculation
SELECT
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY salary) AS p95_salary
FROM employees;
-- Note: MySQL uses PERCENT_RANK() or approximation with window functions

-- Median in MySQL (no PERCENTILE_CONT)
SELECT AVG(salary) AS median FROM (
  SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) AS rn,
         COUNT(*) OVER () AS total
  FROM employees
) t
WHERE rn IN (FLOOR((total + 1) / 2), CEIL((total + 1) / 2));

-- ============================================================
-- INTERVIEW QUESTIONS (Big4 Level)
/*
Q: What is the difference between WHERE and HAVING?
A: WHERE filters BEFORE grouping (operates on individual rows).
   HAVING filters AFTER grouping (operates on aggregated results).
   WHERE cannot reference aggregate functions like SUM(), COUNT().

Q: When would you use a CTE vs a subquery?
A: CTEs: when you need to reference the same subquery multiple times,
   for recursive queries, or for readability.
   Subqueries: for simple one-off filtering.
   Performance is similar — CTEs are not always materialized.

Q: What is the N+1 problem and how do you fix it?
A: N+1: fetching N users, then making N separate queries for each user's orders.
   Fix: JOIN both tables in one query, or use ORM eager loading.
   SELECT u.*, o.* FROM users u LEFT JOIN orders o ON u.id = o.user_id;

Q: Explain the difference between clustered and non-clustered indexes.
A: Clustered index: data rows are physically sorted by this key (InnoDB PRIMARY KEY).
   One per table. Fastest for range queries on PK.
   Non-clustered: separate structure pointing to data rows.
   Multiple per table. Slight overhead on INSERT/UPDATE.

Q: How do you find duplicate records?
A: SELECT email, COUNT(*) AS cnt
   FROM users GROUP BY email HAVING cnt > 1;

Q: What is a deadlock and how do you handle it?
A: Two transactions each waiting for the other to release a lock.
   MySQL detects and kills one transaction (the victim).
   Prevention: always acquire locks in the same order across transactions.
   Application: catch deadlock error (ER_LOCK_DEADLOCK) and retry.
*/
