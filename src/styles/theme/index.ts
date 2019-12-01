import { darken } from "polished";

import { Theme } from "../../utils/styled";
import brandColors from "../colors/brandColors";

const theme: Theme = {
  colors: {
    background: brandColors.gray,
    body: brandColors.gray75,
    headings: brandColors.black,
    black: brandColors.black,
    white: brandColors.white,
    green: brandColors.green,
    borders: darken(0.05, brandColors.gray5),
    tableOdd: darken(0.025, brandColors.gray5),
    brand: brandColors.red,
    attrs: {
      str: "#f44336",
      agi: "#39d402",
      int: "#01a9f4"
    }
  },
  fonts: {
    headings:
      "Lato, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,  Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
    body:
      "Lato, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
    monospace:
      "Lato, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace, monospace"
  },
  fontSizes: {
    h1: "2.441rem",
    h2: "1.953rem",
    h3: "1.563rem",
    h4: "1.25rem"
  },
  containerPadding: "1.5rem",
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px"
  },
  widths: {
    md: "720px",
    lg: "960px",
    xl: "1140px"
  },
  heights: {
    header: "60px"
  }
};

export default theme;
