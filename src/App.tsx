import React from 'react';
import {
  TaskDashboardHeader,
  TaskMetricCards,
  TaskQuickComposer,
  TaskFilterBar,
  TaskCardList,
  TaskInsightsPanel,
  TaskActionBarFooter,
  TaskFormModal,
} from './components';

/**
 * ZenithTask Main Application Component
 * 
 * Built with React 19, TypeScript, React Redux Toolkit, Tailwind CSS, and react-icons.
 * Features a modern, aesthetic glassmorphism UI with max-w-7xl responsive layout
 * across mobile, laptop, and desktop viewports.
 */
export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white pb-16 sm:pb-24 overflow-x-hidden">
      
      {/* Background ambient glowing gradients */}
      <div className="fixed top-0 left-1/4 h-[550px] w-[550px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 h-[480px] w-[480px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-10 left-10 h-[420px] w-[420px] rounded-full bg-cyan-600/8 blur-[130px] pointer-events-none" />

      {/* Main Container - max-w-7xl with fluid responsive padding */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 lg:pt-10 space-y-6 sm:space-y-8">
        
        {/* 1. Header with Title, Live Date, Dynamic Progress & Stats */}
        <TaskDashboardHeader />

        {/* 2. Mini Metric Cards (Total, Pending, Completed, Urgent) */}
        <TaskMetricCards />

        {/* 3. Responsive Workspace Layout (Mobile 1-col, Laptop/Desktop 12-col grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Task Area (8 cols on laptop/desktop) */}
          <section className="lg:col-span-8 space-y-6">
            {/* Floating Quick Task Composer */}
            <TaskQuickComposer />

            {/* Filter, Search & Sort Bar */}
            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-3 sm:p-5 backdrop-blur-xl">
              <TaskFilterBar />
            </div>

            {/* Main Task List & Task Cards */}
            <TaskCardList />
          </section>

          {/* Right Insights Sidebar (4 cols on laptop/desktop) */}
          <aside className="lg:col-span-4 space-y-6">
            <TaskInsightsPanel />
          </aside>

        </div>

        {/* 4. Quick Action Toolbar & Footer */}
        <TaskActionBarFooter />

      </main>

      {/* 5. Create & Edit Task Modal Dialog Form */}
      <TaskFormModal />

    </div>
  );
};

export default App;
