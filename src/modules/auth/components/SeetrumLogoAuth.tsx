import { logoHorizontalUrl } from "@/lib/assets";
import { Box } from "@mantine/core";

export const SeetrumLogoAuth: React.FC = () => {
  return (
    <Box
      p={16}
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        img: {
          cursor: "pointer",
          height: 20,
        },
      }}
    >
      <a href="https://seetrum.id">
        <img alt="seetrum logo" src={logoHorizontalUrl} />
      </a>
    </Box>
  );
};
