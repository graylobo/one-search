import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import OptionModal from "../components/modals/OptionModal";

interface StyledInterface {
  width?: string;
  height?: string;
  position?: string;
}

const Wrapper = styled.main<StyledInterface>`
  #input-container {
    display: flex;
    justify-content: center;
    position: fixed;
    white-space: nowrap;
    left: 50%;
    transform: translate(-50%);
  }
  .divider {
    height: 3vw;
  }
  #iframe-container {
    ${(props) =>
      props.position === "horizontal" &&
      css`
        display: flex;
        width: max-content;
      `}
  }
  .frame {
    display: block;
    margin: 0 auto;
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
  }
`;

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [marketState, setMarketState] = useState({
    naver: true,
    google: true,
    coupang: true,
    gmarket: true,
    auction: true,
    lotteon: true,
    eleven: true,
    homeplus: true,
    wmp: true,
  });
  const [optionState, setOptionState] = useState({
    width: "90",
    height: "90",
    position: "vertical",
  });
  const propsContainer = {
    optionState,
    marketState,
    setOptionModalOpen,
    setOptionState,
    setMarketState,
  };

  useEffect(() => {
    const marketStateData = localStorage.getItem("marketState");
    const optionStateData = localStorage.getItem("optionState");
    if (marketStateData) {
      setMarketState(JSON.parse(marketStateData));
    }
    if (optionStateData) {
      setOptionState(JSON.parse(optionStateData));
    }
  }, []);

  return (
    <Wrapper width={optionState.width} height={optionState.height} position={optionState.position}>
      {optionModalOpen && <OptionModal {...propsContainer} />}

      <div id="input-container">
        <input
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setResult(text);
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
        />
        <button
          onClick={() => {
            setResult(text);
          }}
        >
          검색
        </button>
        <button
          onClick={() => {
            setOptionModalOpen(true);
          }}
        >
          옵션
        </button>
      </div>
      <div className="divider"></div>
      <div id="iframe-container">
        {marketState.naver && (
          <iframe
            className="frame"
            src={`https://search.shopping.naver.com/search/all?query=${result}`}
          ></iframe>
        )}
        {marketState.google && (
          <iframe
            className="frame"
            src={` https://www.google.com/search?igu=1&query=${result}`}
          ></iframe>
        )}
        {marketState.coupang && (
          <iframe className="frame" src={`https://www.coupang.com/np/search?q=${result}`}></iframe>
        )}
        {marketState.gmarket && (
          <iframe
            className="frame"
            src={`https://browse.gmarket.co.kr/search?keyword=${result}`}
          ></iframe>
        )}
        {marketState.auction && (
          <iframe
            className="frame"
            src={`https://browse.auction.co.kr/search?keyword=${result}`}
          ></iframe>
        )}
        {marketState.lotteon && (
          <iframe
            className="frame"
            src={`https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=${result}&mallId=1`}
          ></iframe>
        )}

        {marketState.eleven && (
          <iframe
            className="frame"
            src={`https://search.11st.co.kr/Search.tmall?kwd=${result}`}
          ></iframe>
        )}
        {marketState.homeplus && (
          <iframe
            className="frame"
            src={`https://front.homeplus.co.kr/search?entry=direct&keyword=${result}`}
          ></iframe>
        )}
        {marketState.wmp && (
          <iframe
            className="frame"
            src={`https://search.wemakeprice.com/search?search_cate=top&keyword=${result}`}
          ></iframe>
        )}
      </div>
    </Wrapper>
  );
}
