import styled from "styled-components";

export const LinkItem = styled.li`
  list-style: none;
  font-weight: 400;
  border-radius: 5px;

  :hover {
    background-color: #474747;
    ${(props) => `${props.hoverStyles}`}
  }
  ${(props) => `${props.styles}`}
`;

export const UnorderedList = styled.ul`
  padding: 0px;
  scrollbar-width: thin;
  scrollbar-color: #252525 transparent;
  max-height: calc(100vh - 163px);
  ::-webkit-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
  ${(props) => ` ${props.listStyle}`}
`;
