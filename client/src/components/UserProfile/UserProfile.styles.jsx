import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;

  @media (max-width: 1400px) {
    justify-content: center;
    :hover:after {
      ${(props) =>
        props.content
          ? `content: "${props.content}"`
          : `content: "Insert username"`};
      padding: 4px 8px;
      position: absolute;
      left: calc(100% + 20px);
      white-space: nowrap;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  :hover {
    cursor: pointer;
  }
`;

export const Username = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 0px;
  padding: 0px;
  display: flex;
`;

export const Hashtag = styled.p`
  margin: 0px 0px 0px 5px;
  padding: 0px;
  color: #909090;
  font-size: 16px;
  position: relative;
  top: 1px;
`;

const imageSize = "35px";

export const ImageContainer = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  overflow: hidden;
  border-radius: 50px;
  @media (max-width: 1400px) {
    margin: 0px;
  }
  margin: 0px 15px 0px 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
