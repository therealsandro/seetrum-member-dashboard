import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { RegisterOptionsCard } from "../components/RegisterOptionsCard";

export const RegisterOptionPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Join Seetrum";
  }, []);

  return (
    <AuthLayout>
      <RegisterOptionsCard />
    </AuthLayout>
  );
};
