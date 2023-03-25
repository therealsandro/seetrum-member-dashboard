import { MantineThemeOverride } from "@mantine/core";

export const seetrumTheme: MantineThemeOverride = {
  fontFamily: "Archivo",
  headings: {
    sizes: {
      h1: { fontSize: "57px" },
      h2: { fontSize: "45px" },
      h3: { fontSize: "36px" },
      h4: { fontSize: "32px" },
      h5: { fontSize: "28px" },
      h6: { fontSize: "24px" },
    },
  },
  fontSizes: {
    xl: "22px",
    lg: "16px",
    md: "14px",
    sm: "12px",
  },
  colors: {
    biceblue: [
      "#e6f0f5",
      "#b0d1e0",
      "#8abbd1",
      "#549dbc",
      "#3389af",
      "#006c9b",
      "#00628d",
      "#004d6e",
      "#003b55",
      "#002d41",
    ],
    moonstone: [
      "#eaf6f9",
      "#bfe4eb",
      "#9fd7e2",
      "#74c4d5",
      "#59b9cd",
      "#2fa7c0",
      "#2b98af",
      "#217788",
      "#1a5c6a",
      "#144651",
    ],
  },
  primaryColor: "biceblue",
};
