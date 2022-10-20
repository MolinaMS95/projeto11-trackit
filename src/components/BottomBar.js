import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../constants/colors";

export default function BottomBar() {
  const percentage = 50;

  return (
    <Footer>
      <Link to="/habitos">
        <LetterButton>Hábitos</LetterButton>
      </Link>
      <TodayButton
        value={percentage}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: `${colors.lightblue}`,
          pathColor: `${colors.white}`,
          trailColor: "transparent",
        })}
      >
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/hoje"
        >
          <p
            style={{
              fontSize: 18,
              color: `${colors.white}`,
              fontFamily: "Lexend Deca",
              marginTop: -30,
              marginRight: -10,
            }}
          >
            Hoje
          </p>
        </Link>
      </TodayButton>
      <Link to="/historico">
        <LetterButton>Histórico</LetterButton>
      </Link>
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  height: 70px;

  position: fixed;
  right: 0px;
  bottom: 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0px 31px;
`;

const LetterButton = styled.button`
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  text-align: center;
  color: ${colors.lightblue};

  background: ${colors.white};

  border: none;
`;

const TodayButton = styled(CircularProgressbarWithChildren)`
  width: 91px;
  height: 91px;

  border-radius: 50%;

  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
`;
