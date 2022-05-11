import styled from "styled-components";

export const BGContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* background-image: url("https://i.pinimg.com/originals/ee/16/83/ee16833e714edc9100eea6b2ce90bc0b.jpg"); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const loginContainer = styled.div`
  background-color: #383838;
  width: 40%;
  min-width: 545px;
  max-width: 800px;
  height: 50%;
  min-height: 352px;
  max-height: 525px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
`;

export const loginButton = styled.a`
  // background-color: #6a99f8;
  background-color: #93e9be;
  width: 200px;
  height: 45px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: black;
  :hover {
    background-color: #53dc98;
  }
`;

export const logoContainer = styled.div`
  width: 120px;
  height: 120px;
  background-color: grey;
  border-radius: 100px;
`;

export const title = styled.h1`
  margin: 5% 0px 1% 0px;
  font-size: 1.5em;
  color: light-grey;
`;

export const description = styled.p`
  margin: 0px 0px 5% 0px;
  font-size: 1em;
  color: grey;
`;

export const DownloadClient = styled.a`
  margin-top: 20px;
  color: grey;
  :hover {
    text-decoration: underline;
    color: white;
  }
`;
