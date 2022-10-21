import styled from "styled-components";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { colors } from "../../constants/colors";

export default function History() {
  return (
    <>
      <TopBar />
      <Body>
        <header>
          <p>Meus hábitos</p>
        </header>
        <div>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </div>
      </Body>
      <BottomBar />
    </>
  );
}

const Body = styled.main`
  background: ${colors.background};

  height: calc(100vh - 140px);
  margin: 70px 0px;
  padding: 0px 17px;

  font-family: "Lexend Deca", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    color: ${colors.darkblue};
    font-size: 23px;

    padding: 28px 0px;

    width: 100%;
  }

  div {
    font-size: 18px;
    color: ${colors.text};
  }
`;
