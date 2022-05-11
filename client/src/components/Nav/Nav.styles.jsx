import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  background-color: #393939;
  width: 20vw;
  max-width: 350px;
  min-width: 300px;
  height: 100vh;
  padding: 25px 15px 0px 15px;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1400px) {
    max-width: 80px;
    min-width: 50px;
    padding: 25px 5px 0px 5px;
  }

  > div:nth-child(-n + 2) {
    position: relative;
    margin-bottom: 20px;
  }

  > div:nth-child(2):after {
    content: "";
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    // background-color: #474747;
    position: absolute;
    bottom: -16px;
    left: -25px;
    width: calc(100% + 40px);
    height: 500px;
    @media (max-width: 1400px) {
      width: calc(100% + 32px);
    }
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: 10px;
`;

export const DeleteAccountContainer = styled.div`
  font-weight: bold;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #474747;
    cursor: pointer;
  }

  @media (max-width: 1400px) {
    :hover:after {
      content: "Delete Account";
      padding: 4px 8px;
      position: absolute;
      left: 90px;
      white-space: nowrap;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const DeleteAccount = styled.p`
  margin: 0px;
  padding: 7px 10px;
  color: white;
`;

export const LogoContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;

  @media (max-width: 1400px) {
    margin-right: 0px;
  }
`;

export const LogoText = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 26px;
`;
// #393939

export const SVGContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: 80%;
    height: 80%;
    color: #c4c4c4;
  }
`;
