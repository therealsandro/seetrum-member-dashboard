import { AppShell, Container } from "@mantine/core";
import { Header } from "../Header";
import { DEFAULT_TITLE } from "@/lib/constants";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
  title = DEFAULT_TITLE,
  children,
}) => {
  return (
    <AppShell header={<Header />}>
      <Container>{children}</Container>
    </AppShell>
  );
};
