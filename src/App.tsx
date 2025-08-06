// App.tsx
import './index.css';
import Index from './Pages/Index';
import { ToastProvider } from './components/context/toast-context'; // 🔁 correct path if different

function App() {
  return (
    <ToastProvider>
          <div className="text-3xl font-bold text-blue-600">
      Hello Tailwind + React + TypeScript!
    </div>
      <Index />
    </ToastProvider>
  );
}

export default App;
