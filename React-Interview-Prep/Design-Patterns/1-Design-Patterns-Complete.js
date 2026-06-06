// ============================================================
// DESIGN PATTERNS - FRONTEND DEVELOPER PREP
// ============================================================

/**
 * Design patterns are essential for MNC/Big4 interviews
 * Used in: PWC, Deloitte, TCS, Cognizant, Google, Meta
 * Focus: Frontend-relevant patterns, real-world applications
 */

// ============================================================
// 1. CREATIONAL PATTERNS
// ============================================================

/*
Q1: Singleton Pattern - Single instance of a class
*/

class Logger {
  static instance = null;

  constructor() {
    if (Logger.instance !== null) {
      return Logger.instance;
    }

    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    this.logs.push(message);
    console.log(message);
  }

  getLogs() {
    return this.logs;
  }
}

// Usage
const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true - same instance

/*
Q2: Factory Pattern - Create objects without specifying exact classes
*/

class ButtonFactory {
  static createButton(type) {
    switch (type) {
      case 'primary':
        return new PrimaryButton();
      case 'secondary':
        return new SecondaryButton();
      case 'danger':
        return new DangerButton();
      default:
        throw new Error('Unknown button type');
    }
  }
}

class PrimaryButton {
  render() {
    return '<button class="btn-primary">Click me</button>';
  }
}

class SecondaryButton {
  render() {
    return '<button class="btn-secondary">Click me</button>';
  }
}

class DangerButton {
  render() {
    return '<button class="btn-danger">Click me</button>';
  }
}

// Usage
const button = ButtonFactory.createButton('primary');
console.log(button.render());

/*
Q3: Builder Pattern - Construct complex objects step by step
*/

class FormBuilder {
  constructor() {
    this.form = {};
  }

  setName(name) {
    this.form.name = name;
    return this;
  }

  setEmail(email) {
    this.form.email = email;
    return this;
  }

  setPhone(phone) {
    this.form.phone = phone;
    return this;
  }

  setAddress(address) {
    this.form.address = address;
    return this;
  }

  build() {
    return this.form;
  }
}

// Usage - Fluent interface
const form = new FormBuilder()
  .setName('John')
  .setEmail('john@example.com')
  .setPhone('123-456-7890')
  .setAddress('123 Main St')
  .build();

/*
Q4: Prototype Pattern - Clone existing objects
*/

class UserPrototype {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  clone() {
    return new UserPrototype(this.name, this.email);
  }

  setName(name) {
    this.name = name;
    return this;
  }
}

// Usage
const user1 = new UserPrototype('John', 'john@example.com');
const user2 = user1.clone().setName('Jane');

/*
Q5: Abstract Factory Pattern - Create families of related objects
*/

class UIFactory {
  createButton() {
    throw new Error('Method not implemented');
  }

  createInput() {
    throw new Error('Method not implemented');
  }
}

class MaterialUIFactory extends UIFactory {
  createButton() {
    return { type: 'MaterialButton', style: 'material' };
  }

  createInput() {
    return { type: 'MaterialInput', style: 'material' };
  }
}

class BootstrapUIFactory extends UIFactory {
  createButton() {
    return { type: 'BootstrapButton', style: 'bootstrap' };
  }

  createInput() {
    return { type: 'BootstrapInput', style: 'bootstrap' };
  }
}

// ============================================================
// 2. STRUCTURAL PATTERNS
// ============================================================

/*
Q6: Adapter Pattern - Convert incompatible interfaces
*/

// Old API
class OldAPI {
  getUser() {
    return { user_name: 'John', user_email: 'john@example.com' };
  }
}

// New API expects different format
class NewAPI {
  getUser() {
    return { name: 'John', email: 'john@example.com' };
  }
}

// Adapter
class OldAPIAdapter {
  constructor(oldAPI) {
    this.oldAPI = oldAPI;
  }

  getUser() {
    const oldData = this.oldAPI.getUser();
    return {
      name: oldData.user_name,
      email: oldData.user_email,
    };
  }
}

/*
Q7: Decorator Pattern - Add functionality to objects dynamically
*/

class Pizza {
  getCost() {
    return 10;
  }

  getDescription() {
    return 'Pizza';
  }
}

class PizzaDecorator {
  constructor(pizza) {
    this.pizza = pizza;
  }

  getCost() {
    return this.pizza.getCost();
  }

  getDescription() {
    return this.pizza.getDescription();
  }
}

class CheeseDecorator extends PizzaDecorator {
  getCost() {
    return this.pizza.getCost() + 2;
  }

  getDescription() {
    return this.pizza.getDescription() + ', Cheese';
  }
}

class PepperoniDecorator extends PizzaDecorator {
  getCost() {
    return this.pizza.getCost() + 1.5;
  }

  getDescription() {
    return this.pizza.getDescription() + ', Pepperoni';
  }
}

// Usage
let pizza = new Pizza();
pizza = new CheeseDecorator(pizza);
pizza = new PepperoniDecorator(pizza);
console.log(pizza.getDescription()); // Pizza, Cheese, Pepperoni
console.log(pizza.getCost()); // 13.5

/*
Q8: Facade Pattern - Provide unified interface to complex subsystem
*/

// Complex subsystem
class CPU {
  freeze() { console.log('CPU freeze'); }
  jump(position) { console.log('CPU jump'); }
  execute() { console.log('CPU execute'); }
}

class Memory {
  load(position, data) { console.log('Memory load'); }
}

class HardDrive {
  read(lba, size) { console.log('HardDrive read'); }
}

// Facade
class Computer {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

// Usage
const computer = new Computer();
computer.start(); // Hides complexity

/*
Q9: Proxy Pattern - Provide placeholder for expensive operations
*/

class DatabaseService {
  query(sql) {
    console.log('Executing database query:', sql);
    return [{ id: 1, name: 'John' }];
  }
}

class DatabaseProxy {
  constructor() {
    this.cache = {};
    this.service = new DatabaseService();
  }

  query(sql) {
    if (this.cache[sql]) {
      console.log('Returning cached result');
      return this.cache[sql];
    }

    const result = this.service.query(sql);
    this.cache[sql] = result;
    return result;
  }
}

// Usage
const db = new DatabaseProxy();
db.query('SELECT * FROM users'); // Execute query
db.query('SELECT * FROM users'); // Return from cache

/*
Q10: Bridge Pattern - Decouple abstraction from implementation
*/

class Shape {
  constructor(color) {
    this.color = color;
  }

  draw() {
    throw new Error('Method not implemented');
  }
}

class Circle extends Shape {
  draw() {
    console.log(`Drawing circle with ${this.color.colorName()}`);
  }
}

class Color {
  colorName() {
    throw new Error('Method not implemented');
  }
}

class RedColor extends Color {
  colorName() {
    return 'Red';
  }
}

class BlueColor extends Color {
  colorName() {
    return 'Blue';
  }
}

// Usage
const redCircle = new Circle(new RedColor());
redCircle.draw(); // Drawing circle with Red

// ============================================================
// 3. BEHAVIORAL PATTERNS
// ============================================================

/*
Q11: Observer Pattern - Subscribe to changes
*/

class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    throw new Error('Method not implemented');
  }
}

class UserObserver extends Observer {
  update(data) {
    console.log('UserObserver received update:', data);
  }
}

// Usage
const subject = new Subject();
const observer = new UserObserver();
subject.attach(observer);
subject.notify({ id: 1, name: 'John' });

/*
Q12: Command Pattern - Encapsulate requests as objects
*/

class Command {
  execute() {
    throw new Error('Method not implemented');
  }

  undo() {
    throw new Error('Method not implemented');
  }
}

class TextEditor {
  constructor() {
    this.text = '';
  }

  insertText(text) {
    this.text += text;
  }

  deleteText(count) {
    this.text = this.text.slice(0, -count);
  }

  getText() {
    return this.text;
  }
}

class InsertCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.insertText(this.text);
  }

  undo() {
    this.editor.deleteText(this.text.length);
  }
}

// Usage
const editor = new TextEditor();
const command = new InsertCommand(editor, 'Hello');
command.execute(); // Text: "Hello"
command.undo(); // Text: ""

/*
Q13: Strategy Pattern - Select algorithm at runtime
*/

class PaymentStrategy {
  pay(amount) {
    throw new Error('Method not implemented');
  }
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} with credit card`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} with PayPal`);
  }
}

class ApplePayPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} with Apple Pay`);
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    this.paymentStrategy.pay(total);
  }
}

// Usage
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment());
cart.checkout(); // Paid $X with credit card

/*
Q14: State Pattern - Alter behavior based on state
*/

class State {
  handle(context) {
    throw new Error('Method not implemented');
  }
}

class PlayingState extends State {
  handle(context) {
    console.log('Currently playing');
    context.setState(new PausedState());
  }
}

class PausedState extends State {
  handle(context) {
    console.log('Currently paused');
    context.setState(new PlayingState());
  }
}

class MediaPlayer {
  constructor() {
    this.state = new PlayingState();
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.handle(this);
  }
}

/*
Q15: Template Method Pattern - Define algorithm skeleton
*/

class DataProcessor {
  process(data) {
    const raw = this.fetchData(data);
    const validated = this.validateData(raw);
    const transformed = this.transformData(validated);
    return this.saveData(transformed);
  }

  fetchData(data) {
    throw new Error('Method not implemented');
  }

  validateData(data) {
    throw new Error('Method not implemented');
  }

  transformData(data) {
    throw new Error('Method not implemented');
  }

  saveData(data) {
    throw new Error('Method not implemented');
  }
}

class CSVProcessor extends DataProcessor {
  fetchData(data) {
    return data.split('\n').map(line => line.split(','));
  }

  validateData(data) {
    return data.filter(row => row.length > 0);
  }

  transformData(data) {
    return data.map(row => ({ name: row[0], age: row[1] }));
  }

  saveData(data) {
    console.log('Saved to database:', data);
    return data;
  }
}

// ============================================================
// PATTERN SELECTION GUIDE
// ============================================================

/*
When to use each pattern:

CREATIONAL:
- Singleton: Logger, config, database connection
- Factory: UI components, API clients
- Builder: Complex objects with many options
- Prototype: Clone objects with current state
- Abstract Factory: Theming system, multiple UI libraries

STRUCTURAL:
- Adapter: Legacy code integration
- Decorator: Add features dynamically
- Facade: Simplify complex subsystems
- Proxy: Lazy loading, caching, access control
- Bridge: Decouple abstraction from implementation

BEHAVIORAL:
- Observer: Event system, state changes
- Command: Undo/redo, action queuing
- Strategy: Payment methods, sorting algorithms
- State: State machines, form workflows
- Template Method: Data processing pipeline
*/

export const DESIGN_PATTERNS = {
  CREATIONAL: [1, 2, 3, 4, 5],
  STRUCTURAL: [6, 7, 8, 9, 10],
  BEHAVIORAL: [11, 12, 13, 14, 15],
};
