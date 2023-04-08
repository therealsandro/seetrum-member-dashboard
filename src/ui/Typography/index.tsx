import { Text, TextProps, Title } from "@mantine/core";

type TextVariantType =
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "headline-lg"
  | "headline-md"
  | "headline-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "label-lg"
  | "label-md"
  | "label-sm";

interface TypographyProps {
  textVariant: TextVariantType;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps & TextProps> = ({
  textVariant,
  children,
  ...textProps
}) => {
  const typoVariants: Record<TextVariantType, React.ReactNode> = {
    "display-lg": (
      <Title order={1} size="h1" fw={400} {...textProps}>
        {children}
      </Title>
    ),
    "display-md": (
      <Title order={1} size="h2" fw={400} {...textProps}>
        {children}
      </Title>
    ),
    "display-sm": (
      <Title order={1} size="h3" fw={400} {...textProps}>
        {children}
      </Title>
    ),
    "headline-lg": (
      <Title order={1} size="h4" fw={400}>
        {children}
      </Title>
    ),
    "headline-md": (
      <Title order={1} size="h5" fw={400}>
        {children}
      </Title>
    ),
    "headline-sm": (
      <Title order={1} size="h6" fw={400}>
        {children}
      </Title>
    ),
    "title-lg": (
      <Text size={"xl"} {...textProps}>
        {children}
      </Text>
    ),
    "title-md": (
      <Text fw={500} size={"lg"} {...textProps}>
        {children}
      </Text>
    ),
    "title-sm": (
      <Text fw={500} size={"md"} {...textProps}>
        {children}
      </Text>
    ),
    "body-lg": (
      <Text size={"lg"} {...textProps}>
        {children}
      </Text>
    ),
    "body-md": (
      <Text size={"md"} {...textProps}>
        {children}
      </Text>
    ),
    "body-sm": (
      <Text size={"sm"} {...textProps}>
        {children}
      </Text>
    ),
    "label-lg": (
      <Text fw={500} size={"md"} {...textProps}>
        {children}
      </Text>
    ),
    "label-md": (
      <Text fw={500} size={"sm"} {...textProps}>
        {children}
      </Text>
    ),
    "label-sm": (
      <Text size={"sm"} {...textProps}>
        {children}
      </Text>
    ),
  };

  return <>{typoVariants[textVariant]}</> || <Text>{children}</Text>;
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
