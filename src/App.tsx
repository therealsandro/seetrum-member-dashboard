import React from "react";
import { Loader, MantineProvider } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { onAuthStateHasChanged } from "./modules/auth/services/authService";
import { useAuthStore } from "./modules/auth/stores/authStore";

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const loading = useAuthStore((state) => state.loading);

  React.useEffect(() => {
    const unsubscribe = onAuthStateHasChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  if (loading) {
    <Loader />;
  }

  return (
    <MantineProvider withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
