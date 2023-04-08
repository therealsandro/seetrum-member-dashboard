import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
