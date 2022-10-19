import styled from "styled-components";
import { colors } from "../constants/colors";

export default function Forms({children, isDisabled, submit}) {
  return <Form onSubmit={submit} colors={colors.lightblue} isDisabled={isDisabled}>{children}</Form>;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 80%;
  margin: auto;

  input {
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;

    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;

    padding-left: 11px;

    background: ${props => props.isDisabled && ('#F2F2F2')};
  }

  input::placeholder{
    color:gray;
  }

  button {
    height: 45px;

    background: ${(props) => props.colors};
    border: none;
    border-radius: 5px;

    font-family: "Lexend Deca", sans-serif;
    font-size: 21px;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
