import React from "react";
import * as S from "./Notification.styles";

export const Notification = (props) => {
  return (
    <S.Notification>
      <S.NotificationNumber>{props.count}</S.NotificationNumber>
    </S.Notification>
  );
};
