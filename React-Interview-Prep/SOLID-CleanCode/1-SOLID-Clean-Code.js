// ============================================================
// SOLID PRINCIPLES & CLEAN CODE
// ============================================================

/**
 * SOLID principles for writing maintainable code
 * Critical for MNC/Big4: PWC, Deloitte, TCS, Cognizant
 */

// ============================================================
// 1. SINGLE RESPONSIBILITY PRINCIPLE (SRP)
// ============================================================

// ❌ BAD: Multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Responsibility 1: User data
  getInfo() {
    return { name: this.name, email: this.email };
  }

  // Responsibility 2: Persistence
  saveToDatabase() {
    // Save user...
  }

  // Responsibility 3: Validation
  isEmailValid() {
    return this.email.includes('@');
  }

  // Responsibility 4: Logging
  log() {
    console.log(`User: ${this.name}`);
  }
}

// ✅ GOOD: Separated responsibilities
class UserData {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return { name: this.name, email: this.email };
  }
}

class UserRepository {
  save(user) {
    // Database operation
  }
}

class UserValidator {
  isEmailValid(email) {
    return email.includes('@');
  }
}

class UserLogger {
  log(user) {
    console.log(`User: ${user.name}`);
  }
}

// ============================================================
// 2. OPEN/CLOSED PRINCIPLE (OCP)
// ============================================================

// ❌ BAD: Must modify class to add new discount
class DiscountCalculator {
  calculateDiscount(type, amount) {
    if (type === 'PERCENTAGE') {
      return amount * 0.1;
    } else if (type === 'FIXED') {
      return 10;
    } else if (type === 'LOYALTY') {
      return amount * 0.05;
    }
    // Need to add new condition for every new discount type!
  }
}

// ✅ GOOD: Open for extension, closed for modification
class DiscountStrategy {
  calculate(amount) {
    throw new Error('Method not implemented');
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }

  calculate(amount) {
    return amount * (this.percentage / 100);
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(fixed) {
    super();
    this.fixed = fixed;
  }

  calculate(amount) {
    return this.fixed;
  }
}

class LoyaltyDiscount extends DiscountStrategy {
  constructor(loyaltyPoints) {
    super();
    this.loyaltyPoints = loyaltyPoints;
  }

  calculate(amount) {
    return this.loyaltyPoints * 0.5; // 50 paise per point
  }
}

// New discount types can be added without modifying existing code!

// ============================================================
// 3. LISKOV SUBSTITUTION PRINCIPLE (LSP)
// ============================================================

// ❌ BAD: Derived class violates base class contract
class Bird {
  fly() {
    return 'Flying...';
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly!'); // Violates LSP
  }
}

// ✅ GOOD: Respect the contract
class Animal {
  move() {
    throw new Error('Method not implemented');
  }
}

class FlyingBird extends Animal {
  move() {
    return 'Flying...';
  }
}

class SwimmingBird extends Animal {
  move() {
    return 'Swimming...';
  }
}

class Penguin2 extends SwimmingBird {
  move() {
    return 'Swimming...'; // Satisfies contract
  }
}

// ============================================================
// 4. INTERFACE SEGREGATION PRINCIPLE (ISP)
// ============================================================

// ❌ BAD: Large interface clients don't need
class Worker {
  work() {
    throw new Error('Method not implemented');
  }

  eat() {
    throw new Error('Method not implemented');
  }

  manage() {
    throw new Error('Method not implemented');
  }
}

class Developer extends Worker {
  work() { return 'Developing...'; }
  eat() { return 'Eating...'; }
  manage() { throw new Error('Cannot manage'); } // Doesn't need this!
}

// ✅ GOOD: Segregated interfaces
class Workable {
  work() {
    throw new Error('Method not implemented');
  }
}

class Eatable {
  eat() {
    throw new Error('Method not implemented');
  }
}

class Manageable {
  manage() {
    throw new Error('Method not implemented');
  }
}

class Developer2 extends Workable {
  work() { return 'Developing...'; }
}

class Manager extends Workable {
  work() { return 'Managing...'; }
  manage() { return 'Organizing...'; }
}

// ============================================================
// 5. DEPENDENCY INVERSION PRINCIPLE (DIP)
// ============================================================

// ❌ BAD: High-level module depends on low-level module
class MySQLDatabase {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Tightly coupled!
  }

  save(user) {
    this.db.save(user);
  }
}

// ❌ Problem: Can't switch to MongoDB without modifying UserService

// ✅ GOOD: Both depend on abstraction
class Database {
  save(data) {
    throw new Error('Method not implemented');
  }
}

class MySQLDatabase2 extends Database {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

class MongoDBDatabase extends Database {
  save(data) {
    console.log('Saving to MongoDB:', data);
  }
}

class UserService2 {
  constructor(database) {
    this.db = database; // Depends on abstraction
  }

  save(user) {
    this.db.save(user);
  }
}

// ✅ Easy to switch: new UserService2(new MongoDBDatabase())

// ============================================================
// CLEAN CODE PRINCIPLES
// ============================================================

// ❌ BAD: Poor naming
const d = new Date();
const u = (x) => x.map(y => y * 2);
function fn(a, b, c) {
  if (a > 0) return b + c;
  else return b - c;
}

// ✅ GOOD: Clear naming
const currentDate = new Date();
const doubleNumbers = (numbers) => numbers.map(num => num * 2);
function calculateTotal(isPositive, base, adjustment) {
  return isPositive ? base + adjustment : base - adjustment;
}

// ❌ BAD: Long function with multiple responsibilities
function processUserData(user) {
  // Validate
  if (!user.email) throw new Error('Email required');
  if (!user.email.includes('@')) throw new Error('Invalid email');

  // Transform
  const userData = {
    id: user.id,
    name: user.name.toUpperCase(),
    email: user.email.toLowerCase(),
  };

  // Save
  saveToDatabase(userData);

  // Send email
  sendWelcomeEmail(userData.email);

  // Log
  console.log('User processed:', userData.id);

  return userData;
}

// ✅ GOOD: Separated concerns
function validateUser(user) {
  if (!user.email) throw new Error('Email required');
  if (!user.email.includes('@')) throw new Error('Invalid email');
}

function transformUserData(user) {
  return {
    id: user.id,
    name: user.name.toUpperCase(),
    email: user.email.toLowerCase(),
  };
}

function processUserData2(user) {
  validateUser(user);
  const userData = transformUserData(user);
  saveToDatabase(userData);
  sendWelcomeEmail(userData.email);
  return userData;
}

// ============================================================
// INTERVIEW TIPS - SOLID & CLEAN CODE
// ============================================================

/*
PWC/Deloitte Level:
Q1: "Explain SOLID principles"
A: 5 principles for writing maintainable OOP code
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

Q2: "Give example of SRP"
A: Logger, Database, User classes - each has one reason to change

Q3: "What's OCP?"
A: Open for extension, closed for modification
   Use inheritance/composition instead of modifying code

Q4: "Explain LSP"
A: Derived classes must be substitutable for base class
   Don't violate base class contract

Q5: "When to use interfaces?"
A: To define contracts, enable dependency injection
   Makes code testable and flexible

Q6: "What's clean code?"
A: - Clear naming (intent revealed)
   - Short functions (single responsibility)
   - No duplication (DRY)
   - Proper error handling
   - Comments only for WHY, not WHAT
   - Consistent style
   - Easy to test

Q7: "How to measure code quality?"
A: - Maintainability Index
   - Code coverage
   - Cyclomatic complexity
   - Duplication percentage
   - Test quality
   - Performance metrics
*/

export const SOLID_PRINCIPLES = {
  SRP: 'Single Responsibility Principle',
  OCP: 'Open/Closed Principle',
  LSP: 'Liskov Substitution Principle',
  ISP: 'Interface Segregation Principle',
  DIP: 'Dependency Inversion Principle',
};
