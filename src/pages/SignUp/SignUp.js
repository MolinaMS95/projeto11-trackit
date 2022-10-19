import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Forms from "../../components/Forms";
import Logo from "../../components/Logo";
import { colors } from "../../constants/colors";
import { urls } from "../../constants/urls";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function createAccount(event) {
    event.preventDefault();
    setDisabled(true);
    axios
      .post(urls.signup, form)
      .then(() => navigate("/"))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.status===422 ? error.response.data.details[0] : error.response.data.message,
          footer: `Error status ${error.response.status}`
        });
        setDisabled(false);
      });
  }

  return (
    <Body>
      <Logo />
      <Forms submit={createAccount} isDisabled={disabled}>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="senha"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
          name="name"
          placeholder="nome"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
          name="image"
          type="url"
          onChange={handleForm}
          placeholder="foto"
          disabled={disabled}
          required
        />
        <button type="submit">
          {disabled ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </Forms>
      <LoginLink to="/" colors={colors.lightblue}>
        Já tem uma conta? Faça login!
      </LoginLink>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginLink = styled(Link)`
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: ${(props) => props.colors};

  margin-top: 25px;
`;
