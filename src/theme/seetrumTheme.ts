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
    platinum: [
      "#fdfdfd",
      "#f9f8f8",
      "#f6f5f5",
      "#f2f0f0",
      "#efeded",
      "#ebe9e9",
      "#d6d4d4",
      "#a7a5a5",
      "#818080",
      "#636262",
    ],
    night: [
      "#e7e6e7",
      "#b3b3b4",
      "#8e8e8f",
      "#5b5a5c",
      "#3b3a3d",
      "#0a090c",
      "#09080b",
      "#070609",
      "#060507",
      "#040405",
    ],
    red: [
      "#f8e7e6",
      "#e9b4b3",
      "#de8f8e",
      "#cf5c5a",
      "#c63d3a",
      "#b80c09",
      "#a70b08",
      "#830906",
      "#650705",
      "#4d0504",
    ],
  },
  primaryColor: "biceblue",
};
