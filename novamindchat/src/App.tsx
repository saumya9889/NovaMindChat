// App.tsx
import './index.css';
import Index from './Pages/Index';
import { ToastProvider } from './components/context/toast-context'; // 🔁 correct path if different

function App() {
  return (
    <ToastProvider>
      <Index />
    </ToastProvider>
  );
}

export default App;
