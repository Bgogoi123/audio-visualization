import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import ToastProvider from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={routes} />
    </ToastProvider>
  );
}

export default App;
