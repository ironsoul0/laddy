import { css } from "@emotion/core";

const mixins = {
  dropDecoration: css`
    &,
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
      outline: none;
    }
  `
};

export default mixins;
