import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
`;
export const TextContainer = styled.div`
  > p {
    margin: 0px;
  }
`;

export const Username = styled.p`
  font-weight: bold;
`;

export const PreviousMessage = styled.p`
  color: #c4c4c4;
  font-size: 15px;
`;

export const chatTypeContainer = styled.div`
  .active {
    color: white !important;
  }
`;

export const Options = styled.ul`
  margin: 0px;
  padding: 0px;
  display: flex;
  margin-left: 30px;
`;
export const Option = styled.li`
  list-style: none;
  padding: 5px;

  a {
    color: #c4c4c4;
  }
  a:hover {
    color: white;
  }
`;
export const Text = styled.p`
  font-weight: bold;
  color: #c4c4c4;
  :hover {
    cursor: pointer;
  }
`;

export const CreateGroupContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreateGroupButton = styled.button`
  border: none;
  width: 80%;
  background-color: transparent;
  height: 70%;
  color: white;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #474747;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
  }
`;

export const ButtonText = styled.p`
  margin: 0px;
`;

export const popContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GroupNameInput = styled.input`
  border: none;
  max-height: 45px;
  min-height: 40px;
  width: 80%;
  background-color: #565656;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  box-sizing: border-box;
  padding: 0px 55px 0px 15px;
  margin-bottom: 20px;

  :focus {
    border: none;
    outline: none;
  }
`;

export const FriendsListContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px inset;
  /* background-color: red; */
  width: 80%;
  min-height: 400px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Friend = styled.div`
  background-color: #424242;
  width: 40%;
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const FriendProfilePictureContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50px;
  margin-right: 10px;
  overflow: hidden;
`;

export const FriendImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const FriendtextContainer = styled.div`
  flex-grow: 100;
`;

export const FriendName = styled.p`
  font-weight: bold;
`;

export const AddToGroupButton = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;

  > svg {
    height: 100%;
    width: 100%;
  }

  > svg:hover {
    color: ${(props) => (props.state == 1 ? "#22a966" : "#d32d27")};
  }
`;

export const SubmitGroup = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;

  :hover {
    background-color: #474747;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
  }
`;
