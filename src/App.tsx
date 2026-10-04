import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { increment, decrement, reset } from "./redux/counterSlice.ts";

function App() {
  const value = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Counter Card */}
      <section className="relative z-10 w-full max-w-sm bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-950/50 flex flex-col items-center">
        {/* Header */}
        <header className="mb-6 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Interactive Tool
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-100 tracking-tight">
            Counter App
          </h1>
        </header>

        {/* Counter Display Area */}
        <div className="w-full py-8 my-2 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center justify-center shadow-inner">
          <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 tracking-tight font-mono select-none">
            {value}
          </span>
        </div>

        {/* Action Controls */}
        <div className="w-full mt-6 grid grid-cols-2 gap-3">
          {/* Decrement Button */}
          <button
            type="button"
            onClick={() => dispatch(decrement())}
            className="flex items-center justify-center py-3.5 px-4 bg-slate-800/90 hover:bg-slate-700/80 active:scale-95 text-rose-400 text-xl font-bold rounded-xl border border-slate-700/60 transition-all duration-150 shadow-sm cursor-pointer select-none"
            aria-label="Decrease"
          >
            −
          </button>

          {/* Increment Button */}
          <button
            type="button"
            onClick={() => dispatch(increment())}
            className="flex items-center justify-center py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xl font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-150 cursor-pointer select-none"
            aria-label="Increase"
          >
            +
          </button>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={() => dispatch(reset())}
          className="mt-3 cursor-pointer w-full py-4 text-xl font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors  "
        >
          Reset Counter
        </button>
      </section>
    </main>
  );
}

export default App;
