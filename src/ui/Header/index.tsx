import { Container, Header as MantineHeader, Text } from "@mantine/core";

export const Header: React.FC = () => {
  return (
    <MantineHeader height={60} p="xs">
      <Container>
        <Text align={"center"} size={"xl"} weight={"bold"}>
          Member Dashboard
        </Text>
      </Container>
    </MantineHeader>
  );
};
