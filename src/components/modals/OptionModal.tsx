import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  #background {
    position: fixed;
    top: 0;
    left: 0;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }
  #option-box {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #position-container {
    display: flex;
  }
  #option-container {
    font-size: 13px;
    border-radius: 10px;
    position: absolute;
    width: 20%;
    height: 20%;
    opacity: 0.9;
    background-color: white;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .save-box {
      display: flex;
      gap: 5px;
      margin-top: 10px;
    }
  }
`;

export default function OptionModal(props: any) {
  const [width, setWidth] = useState(props.optionState.width);
  const [height, setHeight] = useState(props.optionState.height);
  const [position, setPosition] = useState(props.optionState.position);

  useEffect(() => {
    if (Number(width) > 100) {
      alert("길이는 100을 초과할 수 없습니다.");
      setWidth("100");
    }
    if (Number(height) > 100) {
      alert("높이는 100을 초과할 수 없습니다.");
      setHeight("100");
    }
  }, [width, height]);
  return (
    <Wrapper>
      <div id="background"></div>
      <div id="option-box">
        <div id="option-container">
          <div className="option-box">
            <span>가로길이: </span>
            <input
              placeholder={"길이"}
              type="number"
              value={width}
              max={100}
              min={10}
              onChange={(e) => {
                setWidth(e.target.value);
              }}
            />
          </div>
          <div className="option-box">
            <span>세로길이: </span>

            <input
              placeholder={"높이"}
              type="number"
              max={100}
              min={10}
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
          </div>
          <div id="position-container">
            <div>화면정렬: </div>
            <div className="option-box">
              <input
                defaultChecked={props.optionState.position === "horizontal"}
                type="radio"
                id="horizontal"
                name="direction"
                value={"horizontal"}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
              <label htmlFor="horizontal">가로</label>
            </div>
            <div className="option-box">
              <input
                defaultChecked={props.optionState.position === "vertical"}
                type="radio"
                id="vertical"
                value={"vertical"}
                name="direction"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
              <label htmlFor="vertical">세로</label>
            </div>
          </div>

          <div className="save-box">
            <button
              onClick={() => {
                props.setOptionState({ width, height, position });
                alert("설정값이 적용되었습니다.");
                props.setOptionModalOpen(false);
              }}
            >
              저장
            </button>
            <button
              onClick={() => {
                props.setOptionModalOpen(false);
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
