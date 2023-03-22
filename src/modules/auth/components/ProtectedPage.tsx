import { ROUTE_LOGIN } from "@/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const withAuth = <P extends object>(
  OriginalComponent: React.ComponentType<P>
): React.FC<P> => {
  const NewComponent: React.FC<P> = (props) => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!user && !loading) {
        navigate(ROUTE_LOGIN.path);
      }
    }, [user, loading]);
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
      navigate(ROUTE_LOGIN.path);
    }
  }, [user, loading]);

  return <>{children}</>;
};
