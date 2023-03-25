import { Text, TextProps, Title } from "@mantine/core";

type variantsType =
  | "headline-lg"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "title-lg"
  | "title-md"
  | "title-sm";

interface TypographyProps {
  variants: variantsType;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps & TextProps> = ({
  variants,
  children,
  ...textProps
}) => {
  const typoVariants: Record<variantsType, React.ReactNode> = {
    "headline-lg": (
      <Title order={1} size="h4" fw={400}>
        {children}
      </Title>
    ),
    "title-lg": (
      <Text {...textProps} size={"xl"}>
        {children}
      </Text>
    ),
    "title-md": (
      <Text {...textProps} fw={500} size={"lg"}>
        {children}
      </Text>
    ),
    "title-sm": (
      <Text {...textProps} fw={500} size={"md"}>
        {children}
      </Text>
    ),
    "body-lg": (
      <Text {...textProps} size={"lg"}>
        {children}
      </Text>
    ),
    "body-md": (
      <Text {...textProps} size={"md"}>
        {children}
      </Text>
    ),
    "body-sm": (
      <Text {...textProps} size={"sm"}>
        {children}
      </Text>
    ),
  };

  return <>{typoVariants[variants]}</> || <Text>{children}</Text>;
};

/* 
<Title size="h1">Display Large</Title>
<Title size="h2">Display Medium</Title>
<Title size="h3">Display Small</Title>
<Title size="h4">Headline Large</Title>
<Title size="h5">Headline Medium</Title>
<Title size="h6">Headline Small</Title>
<Text fz="xl">Title Large</Text>
<Text fz="lg">Title Medium</Text>
<Text fz="md">Title Small</Text>
<Text fz="lg">Body Large</Text>
<Text fz="md">Body Medium</Text>
<Text fz="sm">Body Small</Text>
<Text fw={700} fz="lg">Label Large</Text>
<Text fw={700} fz="lg" td="underline">Label Large - Underlined</Text>
<Text fw={700} fz="md">Label Medium</Text>
<Text fw={700} fz="sm">Label Small</Text>
*/
