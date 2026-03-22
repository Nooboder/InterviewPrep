// 🧠 What is a “Stale Closure” in React?

// 👉 A stale closure happens when:

// A function captures old state/props
// And keeps using that old value even after updates
// 🔥 1. Classic Stale Closure Bug
// import { useState, useEffect } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setInterval(() => {
//       console.log(count);
//     }, 1000);
//   }, []);

//   return (
//     <button onClick={() => setCount(count + 1)}>
//       Count: {count}
//     </button>
//   );
// }
// ❓ Interview Question:

// 👉 What will this log after clicking button multiple times?

// ❌ Most people say:
// 1, 2, 3...
// ✅ Correct Answer:
// 0, 0, 0...

// 💥 Why?

// useEffect([]) runs only once
// Closure captures initial count (0)
// Interval keeps using stale value
// ✅ Fix 1: Add Dependency
// useEffect(() => {
//   const id = setInterval(() => {
//     console.log(count);
//   }, 1000);

//   return () => clearInterval(id);
// }, [count]);

// ✔️ Now gets latest count

// ⚠️ But interval resets every render (not always ideal)

// ✅ Fix 2 (Best 🔥): useRef
// import { useRef, useEffect, useState } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(count);

//   useEffect(() => {
//     countRef.current = count;
//   }, [count]);

//   useEffect(() => {
//     const id = setInterval(() => {
//       console.log(countRef.current);
//     }, 1000);

//     return () => clearInterval(id);
//   }, []);

//   return (
//     <button onClick={() => setCount(count + 1)}>
//       Count: {count}
//     </button>
//   );
// }

// ✔️ No stale closure
// ✔️ No unnecessary re-renders

// 🧠 2. Stale Closure in Event Handler
// function App() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setTimeout(() => {
//       alert(count);
//     }, 2000);
//   }

//   return <button onClick={handleClick}>Click</button>;
// }
// ❓ Question:

// 👉 If user clicks multiple times after updating count?

// ✅ Answer:

// 👉 Shows old value at time of click

// 💥 Closure captures value at execution time

// ✅ Fix:
// setTimeout(() => {
//   setCount(prev => {
//     alert(prev);
//     return prev;
//   });
// }, 2000);

// OR use useRef

// 🧠 3. Missing Dependency Trap (VERY COMMON)
// useEffect(() => {
//   fetch(`/api/data?id=${id}`)
//     .then(res => res.json())
//     .then(data => setData(data));
// }, []);
// ❓ What’s wrong?

// 👉 id is missing in dependency array

// 💥 Problem:
// Uses stale id
// API won’t update when id changes
// ✅ Fix:
// useEffect(() => {
//   // fetch logic
// }, [id]);
// 🧠 4. Infinite Loop Trap
// useEffect(() => {
//   setCount(count + 1);
// }, [count]);

// 👉 ❌ Infinite re-render

// ✅ Fix:
// useEffect(() => {
//   setCount(prev => prev + 1);
// }, []);
// 🧠 5. Function Dependency Trap
// function App() {
//   const [count, setCount] = useState(0);

//   const getData = () => {
//     console.log(count);
//   };

//   useEffect(() => {
//     getData();
//   }, []);
// }
// ❓ Problem?

// 👉 getData uses stale count

// ✅ Fix:
// useEffect(() => {
//   getData();
// }, [count]);

// OR

// const getData = useCallback(() => {
//   console.log(count);
// }, [count]);
// 🎯 Interview Killer Line

// “Stale closures happen in React when functions capture outdated state due to improper dependency management in hooks like useEffect.”

// 🚀 Pro-Level Answer (Say This 💥)

// “To avoid stale closures, we either include dependencies correctly, use functional updates, or store mutable values in useRef to persist the latest state across renders.”

// ⚛️ Bonus (VERY IMPORTANT for YOU)

// Since you're targeting React + high-paying roles, interviewer may ask:

// 👉 “Why does React not auto-update closure values?”

// 👉 Answer:

// “Because closures are part of JavaScript behavior, and React doesn’t override lexical scoping. Each render creates a new scope.”
