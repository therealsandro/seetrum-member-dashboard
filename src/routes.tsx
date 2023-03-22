import { RouteObject } from "react-router-dom";
import { LoginPage } from "./modules/auth/pages/LoginPage";
import { RegisterPage } from "./modules/auth/pages/RegisterPage";
import { ProfilePage } from "./modules/user/pages/ProfilePage";

export const ROUTE_LOGIN = {
  path: "/",
  element: <LoginPage />,
};

export const ROUTE_REGISTER = {
  path: "/register",
  element: <RegisterPage />,
};
export const ROUTE_PROFILE = {
  path: "/profile",
  element: <ProfilePage />,
};

export const routes: RouteObject[] = [
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_PROFILE,
];
