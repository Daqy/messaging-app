import styled from "styled-components";

export const Container = styled.div`
  background-color: #2f2f2f;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: ${(props) => `${props.height}` || "0px"};
  width: ${(props) => `${props.width}` || "0px"};
  ${(props) => `${props.styles}`}
`;
