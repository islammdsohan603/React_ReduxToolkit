import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskComposer from "./components/TaskComposer";
import TaskList from "./components/TaskList";
import FocusCard from "./components/FocusCard";
import "./App.css";

const App = () => (
  <main className="min-h-screen bg-[#f5f3ee] text-[#1e2723]">
    <div className="mx-auto flex min-h-screen max-w-[1600px]">
      <Sidebar />
      <section className="min-w-0 flex-1 px-5 py-5 sm:px-8 lg:px-12 lg:py-8">
        <Header />
        <div className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <TaskComposer />
            <TaskList />
          </div>
          <FocusCard />
        </div>
      </section>
    </div>
  </main>
);

export default App;
