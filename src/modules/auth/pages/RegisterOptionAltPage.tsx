import { authBgUrl } from "@/lib/assets";
import { Box } from "@mantine/core";
import { RegisterOptionsAltCard } from "../components/RegisterOptionsCard";

export const RegisterOptionAltPage: React.FC = () => {
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
      <RegisterOptionsAltCard />
    </Box>
  );
};
