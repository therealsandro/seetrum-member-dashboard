import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { routePaths } from "@/routes";

export const withAuth = <P extends object>(
  OriginalComponent: React.ComponentType<P>
): React.FC<P> => {
  const NewComponent: React.FC<P> = (props) => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!user && !loading) {
        navigate(routePaths.LOGIN);
      }
    }, [user, loading, navigate]);
    return <OriginalComponent {...props} />;
  };

  return NewComponent;
};

interface Props {
  children: React.ReactNode;
}

export const ProtectedPage: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && !loading) {
      navigate(routePaths.LOGIN);
    }
  }, [user, loading, navigate]);

  return <>{children}</>;
};
