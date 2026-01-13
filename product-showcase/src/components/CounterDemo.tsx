
import React from 'react';
import { useCounter } from '../hooks/useCounter';

const CounterDemo = () => {
  // Use the custom hook here
  // We can initialize it with any number, e.g., 10
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 my-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 border-b pb-2">
        Custom Hook Demo: useCounter
      </h3>
      
      <div className="text-center py-4">
        <span className="text-5xl font-bold text-rose-600">
          {count}
        </span>
      </div>

      <div className="flex justify-between gap-2">
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
        >
          Subtract
        </button>
        
        <button 
          onClick={reset}
          className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors font-medium"
        >
          Reset
        </button>
        
        <button 
          onClick={increment}
          className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition-colors font-medium"
        >
          Add
        </button>
      </div>
      
      <div className="text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded">
        This component uses logic extracted into <code>useCounter.ts</code>
      </div>
    </div>
  );
};

export default CounterDemo;
