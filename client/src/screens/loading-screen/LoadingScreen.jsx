import React, { useState, useEffect } from "react";
import * as S from "./LoadingScreen.styles";
import { Loading } from "../../components/Loading/Loading";

export const LoadingScreen = (props) => {
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer === 0) {
        setTimer(10);
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  });

  return (
    <S.Container>
      <Loading
        timer={timer}
        message={"Re-trying to connect to the server in"}
      />
    </S.Container>
  );
};
