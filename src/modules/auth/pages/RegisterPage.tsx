import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
