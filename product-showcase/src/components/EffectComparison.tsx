import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Eye, EyeOff, Play, Square } from 'lucide-react';

const EffectComparison = () => {
  const [valueEffect, setValueEffect] = useState(0);
  const [valueLayout, setValueLayout] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // LOOP LOGIC: Reset both to 0 periodically to trigger the effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        // RESET to 0. This is the "bad" state (Red).
        setValueEffect(0);
        setValueLayout(0);
      }, 800); // Slower interval to clearly see the flash
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // ------------------------------------------------------
  // 1. useEffect Example (The "Flicker")
  // ------------------------------------------------------
  // This runs AFTER the paint.
  // 1. React renders '0' (Red Box).
  // 2. Browser PAINTS the Red Box. (User sees red!)
  // 3. useEffect runs -> Update to random value (Blue Box).
  // 4. React renders new value.
  // 5. Browser PAINTS the Blue Box.
  useEffect(() => {
    if (valueEffect === 0) {
      setValueEffect(10 + Math.random() * 200);
    }
  }, [valueEffect]);

  // ------------------------------------------------------
  // 2. useLayoutEffect Example (The "Smooth" one)
  // ------------------------------------------------------
  // This runs SYNC BEFORE the paint.
  // 1. React renders '0' (Red Box).
  // 2. useLayoutEffect runs IMMEDIATELY. Update to random value.
  // 3. React renders new value.
  // 4. Browser PAINTS only the FINAL Blue Box.
  // (User NEVER sees the red box)
  useLayoutEffect(() => {
    if (valueLayout === 0) {
      setValueLayout(10 + Math.random() * 200);
    }
  }, [valueLayout]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            See the Difference: Red Flash Experiment
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            When the "Loop" runs, it tries to set the value to 0 (Red) and then immediately corrects it to a number (Blue).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* useEffect Example */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-violet-700">
              <Eye className="w-5 h-5" />
              <h4 className="font-bold text-lg">useEffect</h4>
            </div>
            <p className="text-sm text-gray-500 h-12">
              You will see a <span className="text-red-600 font-bold">RED FLASH</span>. 
              Because the browser paints "0" before the effect changes it.
            </p>
            
            <div 
              className={`h-40 rounded-xl flex items-center justify-center transition-colors duration-0 ${
                valueEffect === 0 ? 'bg-red-500 text-white' : 'bg-violet-600 text-white'
              }`}
            >
              <div className="text-center">
                <div className="text-xs uppercase font-bold tracking-wider mb-2">Current Value</div>
                <div className="text-4xl font-mono font-bold">
                  {valueEffect === 0 ? '0' : valueEffect.toFixed(0)}
                </div>
                <div className="text-xs mt-2 font-medium opacity-80">
                  {valueEffect === 0 ? '(PAINTED RED)' : '(UPDATED)'}
                </div>
              </div>
            </div>
          </div>

          {/* useLayoutEffect Example */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <EyeOff className="w-5 h-5" />
              <h4 className="font-bold text-lg">useLayoutEffect</h4>
            </div>
            <p className="text-sm text-gray-500 h-12">
              Stable Blue. No red flash.
              The "0" is intercepted before paint.
            </p>
            
            <div 
              className={`h-40 rounded-xl flex items-center justify-center transition-colors duration-0 ${
                valueLayout === 0 ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              <div className="text-center">
                <div className="text-xs uppercase font-bold tracking-wider mb-2">Current Value</div>
                <div className="text-4xl font-mono font-bold">
                  {valueLayout === 0 ? '0' : valueLayout.toFixed(0)}
                </div>
                <div className="text-xs mt-2 font-medium opacity-80">
                  {valueLayout === 0 ? '(BLOCKED)' : '(UPDATED)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform active:scale-95
              ${isRunning 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-xl hover:-translate-y-1'
              }
            `}
          >
            {isRunning ? (
              <>
                <Square className="w-5 h-5 fill-current" /> Stop Loop
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Start "Red Flash" Loop
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EffectComparison;
