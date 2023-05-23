import { RouteObject } from "react-router-dom";
import { LoginPage } from "./modules/auth/pages/LoginPage";
import { RegisterOptionAltPage } from "./modules/auth/pages/RegisterOptionAltPage";
import { RegisterOptionPage } from "./modules/auth/pages/RegisterOptionPage";
import { RegisterPage } from "./modules/auth/pages/RegisterPage";
import { ProfilePage } from "./modules/user/pages/ProfilePage";
import { MainLayout } from "./ui/Layout";
import { TrainingsPage } from "./modules/trainings/pages/TrainingPage";
import { TrainingDetailPage } from "./modules/trainings/pages/TrainingDetailPage";
import { PlaygroundPage } from "./modules/playground/PlaygroundPage";
import { trainingModelDummy } from "./types/models/training";
import { Timestamp } from "firebase/firestore";

const ROUTES = {
  SIGNIN: {
    path: "/signin",
    element: <LoginPage />,
  },
  REGISTER_OPTION: {
    path: "/register-option",
    element: <RegisterOptionPage />,
  },
  REGISTER_OPTION_ALT: {
    path: "/register-option-alt",
    element: <RegisterOptionAltPage />,
  },
  REGISTER: {
    path: "/register",
    element: <RegisterPage />,
  },
  DASHBOARD: {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
      {
        path: "trainings",
        element: <TrainingsPage />,
      },
      {
        path: "mytrainings",
        element: <TrainingsPage myTrainings />,
      },
      {
        path: "trainings/:id",
        element: <TrainingDetailPage />,
      },
    ],
  },
  PLAYGROUND: {
    path: "/playground",
    element: <PlaygroundPage />,
  },
} as const;

type RouteKey = keyof typeof ROUTES;
type RoutePath = (typeof ROUTES)[RouteKey]["path"];

export const routePaths: Record<RouteKey, RoutePath> = Object.keys(
  ROUTES
).reduce((acc, key) => {
  return { ...acc, [key]: ROUTES[key as RouteKey].path };
}, {}) as Record<RouteKey, RoutePath>;

export const routes = Object.values(ROUTES) as RouteObject[];
