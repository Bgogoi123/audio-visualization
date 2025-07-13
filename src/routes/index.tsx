import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import AudioVisualizer from "../pages/AudioVisualizer";
import AppLayout from "../components/layout/AppLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout headerProps={{ title: "Spectranaut" }}>
        <Landing />
      </AppLayout>
    ),
  },
  {
    path: "visualizer",
    element: (
      <AppLayout
        headerProps={{ title: "Spectranaut", showBackButton: true }}
        footerProps={{ variant: "light" }}
      >
        <AudioVisualizer />
      </AppLayout>
    ),
  },
]);
