import { authBgUrl } from "@/lib/assets";
import { Box } from "@mantine/core";
import { RegisterOptionsCard } from "../components/RegisterOptionsCard";

export const RegisterOptionPage: React.FC = () => {
  return (
    <Box
      sx={{
        background: `url(${authBgUrl})`,
        height: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RegisterOptionsCard />
    </Box>
  );
};
