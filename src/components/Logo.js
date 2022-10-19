import styled from "styled-components";
import Img from "../assets/images/Logo.svg";

export default function Logo() {
  return (
    <LogoImg>
      <img src={Img} alt="Logo TrackIt" />
    </LogoImg>
  );
}

const LogoImg = styled.div`
  width: 180px;
  height: 178px;

  margin: 68px auto 33px auto;
`;
