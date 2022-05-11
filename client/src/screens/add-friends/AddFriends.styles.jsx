import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddFriendMainContainer = styled.div`
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
  // padding: 0px 10px;
  // box-sizing: border-box;
`;

export const SearchContainer = styled.div`
  width: 100%;
  height: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
`;
export const Search = styled.input`
  width: 80%;
  mind-width: 500px;
  height: 50%;
  border: none;
  background-color: #565656;
  color: white;
  font-size: 24px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;

  :focus {
    border: none;
    outline: none;
  }
`;
export const SearchIconContainer = styled.div`
  position: absolute;
  right: 12%;
  width: 30px;
  height: 30px;

  svg {
    height: 100%;
    width: 100%;
    color: #afafaf;
  }

  svg:hover {
    color: white !important;
    cursor: pointer;
  }
`;

export const SearchResultContainer = styled.div`
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

export const SearchResult = styled.div`
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
`;

export const UserProfileContainer = styled.div`
  height: 64px;
  width: 64px;
  background-color: black;
  margin-left: 8px;
  border-radius: 100px;
  overflow: hidden;
`;

export const Imagine = styled.img`
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

const svgSize = 40;

export const AddFriendContainer = styled.div`
  margin-right: 20px;

  svg {
    height: ${svgSize}px;
    width: ${svgSize}px;
    color: #c4c4c4;
  }

  svg:hover {
    color: white;
    cursor: pointer;
  }
`;

export const FriendText = styled.p`
  margin: 0px;
  padding: 0px;
  color: #909090;
`;
//#565656
