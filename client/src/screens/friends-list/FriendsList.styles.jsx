import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FriendsListContainer = styled.div`
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
  padding: 0px 10px;
  box-sizing: border-box;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  min-height: 100px;
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
`;

export const FriendList = styled.div`
  flex-grow: 100;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-columns: minmax(250px, 1fr);
  grid-auto-rows: 70px;
  overflow-y: auto;
  grid-gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #252525 transparent;
  ::-webkit-scrollbar-thumb {
    background: #252525;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: #424242;
  border-radius: 5px;
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
  flex-grow: 1;
  > p {
    margin: 0px;
  }
`;

export const Username = styled.div`
  font-weight: bold;
`;

export const QuickAccess = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  svg {
    width: 100%;
    height: 100%;
    color: #c4c4c4;
  }

  svg:hover {
    fill: white;
    cursor: pointer;
  }
`;

export const FillGreen = styled.div`
  svg {
    color: #22a966;
  }
`;
