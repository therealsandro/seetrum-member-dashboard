import { RouteObject } from "react-router-dom";
import { LoginPage } from "./modules/auth/pages/LoginPage";
import { RegisterPage } from "./modules/auth/pages/RegisterPage";
import { ProfilePage } from "./modules/user/pages/ProfilePage";
import { RegisterOptionPage } from "./modules/auth/pages/RegisterOptionPage";

export const routePaths = {
  LOGIN: "/",
  REGISTER_OPTION: "/register-option",
  REGISTER: "/register",
  PROFILE: "/profile",
} as const;

type PathKey = keyof typeof routePaths;
type RouteElement = React.ReactElement;

const routeElements: Record<PathKey, RouteElement> = {
  LOGIN: <LoginPage />,
  REGISTER_OPTION: <RegisterOptionPage />,
  REGISTER: <RegisterPage />,
  PROFILE: <ProfilePage />,
};

export const routes: RouteObject[] = Object.entries(routePaths).map(
  ([key, path]) => ({
    path,
    element: routeElements[key as PathKey],
  })
);
