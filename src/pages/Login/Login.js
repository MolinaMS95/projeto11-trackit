import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Forms from "../../components/Forms";
import Logo from "../../components/Logo";
import { colors } from "../../constants/colors";
import { urls } from "../../constants/urls";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { UserContext } from "../../components/UserContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    axios
      .post(urls.login, form)
      .then((response) => {
        setUser(response.data);
        navigate("/hoje");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response.status === 422
              ? error.response.data.details[0]
              : error.response.data.message,
          footer: `Error status ${error.response.status}`,
        });
        setDisabled(false);
      });
  }

  return (
    <Body>
      <Logo />
      <Forms submit={login} isDisabled={disabled}>
        <input
          data-identifier="input-email"
          type="email"
          name="email"
          onChange={handleForm}
          placeholder="email"
          disabled={disabled}
          required
        />
        <input
          data-identifier="input-password"
          type="password"
          name="password"
          onChange={handleForm}
          placeholder="senha"
          disabled={disabled}
          required
        />
        <button type="submit" data-identifier="login-btn">
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
            "Entrar"
          )}
        </button>
      </Forms>
      <SignUpLink
        to="/cadastro"
        colors={colors.lightblue}
        data-identifier="sign-up-action"
      >
        Não tem uma conta? Cadastre-se!
      </SignUpLink>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpLink = styled(Link)`
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: ${(props) => props.colors};

  margin-top: 25px;
`;
