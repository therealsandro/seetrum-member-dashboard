import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { LoginPage } from "./modules/auth/pages/LoginPage";
import { RegisterPage } from "./modules/auth/pages/RegisterPage";
import { RouteObject } from "react-router-dom";
import { ProtectedPage } from "./modules/auth/components/ProtectedPage";

const BaseApp: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <ProtectedPage>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </ProtectedPage>
  );
};

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
  element: <BaseApp />,
};

export const routes: RouteObject[] = [
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_PROFILE,
];
