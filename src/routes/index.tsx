import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import AudioVisualizer from "../pages/AudioVisualizer";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "visualizer",
    element: <AudioVisualizer />,
  },
]);
