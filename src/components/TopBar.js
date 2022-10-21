import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { colors } from "../constants/colors";

export default function TopBar() {
  const { user } = useContext(UserContext);

  return (
    <NavBar>
      <h1>TrackIt</h1>
      <img src={user.image} alt="Foto do usuário" />
    </NavBar>
  );
}

const NavBar = styled.nav`
  width: 100%;
  height: 70px;
  padding: 0px 18px;

  background: ${colors.darkblue};

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;

  h1 {
    font-family: "Playball", cursive;
    font-size: 39px;
    color: ${colors.white};
  }

  img{
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
  }
`;
