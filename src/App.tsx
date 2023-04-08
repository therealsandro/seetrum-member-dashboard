import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateHasChanged } from "./modules/auth/services/authService";
import { useAuthStore } from "./modules/auth/stores/authStore";
import { routes } from "./routes";
import { seetrumTheme } from "./theme/seetrumTheme";

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
    <MantineProvider theme={seetrumTheme} withNormalizeCSS>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
