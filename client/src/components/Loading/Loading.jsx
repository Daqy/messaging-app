import React from "react";
import * as S from "./Loading.styles";
import ReactAnime from "react-animejs";
const { Anime } = ReactAnime;

export const Loading = (props) => {
  const circles = [
    { transition: 0 },
    { transition: 90 },
    { transition: 180 },
    { transition: 270 },
  ];
  return (
    <S.Container>
      <S.LoadingContainer>
        <Anime
          style={{ width: "80px", height: "80px", position: "relative" }}
          animeConfig={{
            loop: true,
          }}
          initial={[
            {
              targets: `.circle`,
              easing: "linear",
              keyframes: [
                {
                  translateX: 30,
                  translateY: 30,
                  duration: 300,
                  delay: 500,
                },
              ],
            },
            {
              targets: `#container`,
              easing: "easeInOutQuad",
              keyframes: [
                {
                  delay: 100,
                  rotate: 180,
                  duration: 300,
                },
              ],
            },
            {
              targets: `.circle`,
              easing: "linear",
              keyframes: [
                {
                  translateX: 0,
                  translateY: 0,
                  duration: 300,
                  delay: 200,
                },
              ],
            },
          ]}
        >
          <S.CircleContainerRotate id="container">
            {circles.map((circle, index) => {
              return (
                <S.Circle
                  key={index}
                  className="circle"
                  style={{ transform: `rotate(${circle.transition}deg)` }}
                ></S.Circle>
              );
            })}
          </S.CircleContainerRotate>
        </Anime>

        <S.TitleLoadingMessage>
          {props.message} {props.timer}
        </S.TitleLoadingMessage>
        <p>Sorry for any incovenience</p>
      </S.LoadingContainer>
    </S.Container>
  );
};
