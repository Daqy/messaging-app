import styled from "styled-components";

export const PopupContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  :before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const PopupBox = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  max-height: 70vh;
  background: #393939;
  border-radius: 4px;
  padding: 20px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  overflow: hidden;
`;

export const CloseIcon = styled.span`
  z-index: 2;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  :hover {
    color: #22a966;
    cursor: pointer;
  }
`;
