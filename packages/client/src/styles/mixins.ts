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
  `,

  hideScrollBar: css`
    &::-webkit-scrollbar {
      display: none;
    }

    & {
      -ms-overflow-style: none;
    }
  `
};

export default mixins;
