import { logoHorizontalUrl } from "@/lib/assets";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { Box, Button, Flex, Header as MantineHeader } from "@mantine/core";

export const Header: React.FC = () => {
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <MantineHeader height={60} p="xs">
      <Flex justify={"space-between"} align={"center"}>
        <Box
          sx={{
            height: "30px",
            img: {
              height: "100%",
            },
          }}
        >
          <a href="https://seetrum.id">
            <img src={logoHorizontalUrl} alt={"seetrum logo"} />
          </a>
        </Box>
        <Button onClick={() => logOut()}>Log out</Button>
      </Flex>
    </MantineHeader>
  );
};
