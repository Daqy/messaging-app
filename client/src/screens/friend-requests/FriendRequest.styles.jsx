import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PendingListMainContainer = styled.div`
  background-color: #383838;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
  width: 80%;
  height: 80%;
  min-width: 670px;
  min-height: 700px;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  font-weight: bold;
  font-size: 24px;
`;

export const PendingListContainer = styled.div`
  flex-grow: 100;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #252525 transparent;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar-thumb {
    background: #252525;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Item = styled.div`
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
`;

const imageSize = "50px";

export const IconContainer = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 50px;
  background-color: black;
  overflow: hidden;
  margin: 0px 15px 0px 10px;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  margin-left: 20px;
  flex-grow: 100;
`;

export const Text = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 0px;
  padding: 0px;
`;

export const HashTag = styled.p`
  margin: 0px 0px 0px 5px;
  padding: 0px;
  color: #909090;
  font-size: 16px;
  position: relative;
  top: 2px;
`;

const containerSize = 40;

export const AcceptContainer = styled.div`
  width: ${containerSize}px;
  height: ${containerSize}px;
  background-color: #22a966;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  :hover {
    background-color: #2ac97a;
    cursor: pointer;
  }

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const DeclineContainer = styled.div`
  width: ${containerSize}px;
  height: ${containerSize}px;
  background-color: #f25151;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 15px;
  border-radius: 5px;

  :hover {
    background-color: #f55b5b;
    cursor: pointer;
  }
  svg {
    width: 80%;
    height: 80%;
  }
`;
