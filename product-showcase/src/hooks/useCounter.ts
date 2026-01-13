
import { useState } from 'react';

/**
 * A custom hook to manage a counter with increment, decrement, and reset functionality.
 * 
 * @param initialValue - The initial value of the counter (default is 0)
 * @returns An object containing the current count and functions to modify it
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  // Function to increment the counter
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  // Function to decrement the counter
  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  // Function to reset the counter
  const reset = () => {
    setCount(initialValue);
  };

  // Return the state and the functions
  return { count, increment, decrement, reset };
}
