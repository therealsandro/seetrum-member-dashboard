import { AuthLayout } from "../components/AuthLayout";
import { RegisterOptionsCard } from "../components/RegisterOptionsCard";

export const RegisterOptionPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterOptionsCard />
    </AuthLayout>
  );
};
