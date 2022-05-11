import styled from "styled-components";
import { Link } from "react-router-dom";

export const Item = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #eaeaec;
  padding: 7px 10px;
  z-index: 1;

  @media (max-width: 1400px) {
    display: flex;
    justify-content: center;
    align-items: center;

    :hover:after {
      ${(props) =>
        props.content
          ? `content: "${props.content}"`
          : `content: "Insert Content"`};
      padding: 4px 8px;
      position: absolute;
      left: 90px;
      white-space: nowrap;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  p :hover {
    background-color: #474747;
  }

  > svg {
    width: 30px;
    margin-right: 15px;
    @media (max-width: 1400px) {
      margin-right: 0px;
    }
    color: #c4c4c4;
  }
`;

export const Text = styled.p`
  margin: 0px;

  @media (max-width: 1400px) {
    display: none;
  }
`;
