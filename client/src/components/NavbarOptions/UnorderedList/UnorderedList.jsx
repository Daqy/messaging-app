import React from "react";
import * as S from "./UnorderedList.styles";

export const UnorderedList = (props) => {
  if (props.children == undefined) {
    return "<IMPORTANT> Put a child component in.";
  }
  return (
    <div>
      <S.UnorderedList listStyle={props.listStyle}>
        {props.children.length == undefined ? (
          <S.LinkItem hoverStyles={props.hoverStyles} styles={props.styles}>
            {props.children}
          </S.LinkItem>
        ) : (
          props.children.map((reactComponent, index) => {
            return (
              <S.LinkItem
                key={index}
                hoverStyles={props.hoverStyles}
                styles={props.styles}
              >
                {reactComponent}
              </S.LinkItem>
            );
          })
        )}
      </S.UnorderedList>
    </div>
  );
};
