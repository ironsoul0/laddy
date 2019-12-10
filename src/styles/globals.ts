import { css } from "@emotion/core";

const globals = css`
  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f7f7f7;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .active-icon {
    & svg {
      stroke: #f5cf67;
    }
  }
`;

export default globals;
