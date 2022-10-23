import { useContext, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { urls } from "../../constants/urls";
import { UserContext } from "../../components/UserContext";
import Weekdays from "./Weekdays";
import Swal from "sweetalert2";

export default function TaskCreator(props) {
  const { setAddTask, name, setName, days, setDays, habits, setHabits } = props;
  const [disabled, setDisabled] = useState(false);
  const { user } = useContext(UserContext);

  function handleDays(day) {
    if (!days.includes(day)) {
      setDays([...days, day]);
    } else {
      const newDays = days.filter((number) => !(number === day));
      setDays(newDays);
    }
  }

  function saveHabit(event) {
    event.preventDefault();
    setDisabled(true);
    if (days.length === 0) {
      Swal.fire("Você precisa escolher ao menos um dia");
      setDisabled(false);
      return;
    }
    axios
      .post(
        urls.habits,
        { name, days },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((response) => {
        setHabits([...habits, response.data]);
        setName("");
        setDays([]);
        setAddTask(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        });
        setDisabled(false);
      });
  }

  return (
    <AddTaskForm onSubmit={saveHabit} isDisabled={disabled}>
      <input
        data-identifier="input-habit-name"
        placeholder="nome do hábito"
        onChange={(event) => setName(event.target.value)}
        value={name}
        disabled={disabled}
        required
      />
      <Weekdays handleDays={handleDays} days={days} disabled={disabled} />
      <ButtonContainer isDisabled={disabled}>
        <p
          data-identifier="cancel-habit-create-btn"
          onClick={() => setAddTask(false)}
        >
          Cancelar
        </p>
        <button data-identifier="save-habit-create-btn" type="submit">
          {disabled ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Salvar"
          )}
        </button>
      </ButtonContainer>
    </AddTaskForm>
  );
}

const AddTaskForm = styled.form`
  width: 340px;
  height: 180px;

  background: ${colors.white};
  border-radius: 5px;

  margin-bottom: 30px;
  padding: 18px;

  position: relative;

  input {
    width: 303px;
    height: 45px;

    border: 1px solid #d5d5d5;
    border-radius: 5px;

    font-family: "Lexend Deca";
    font-size: 20px;

    padding-left: 11px;

    background: ${(props) => props.isDisabled && "#F2F2F2"};
  }

  input::placeholder {
    color: gray;
  }

  div {
    display: flex;
    gap: 5px;

    margin-top: 8px;
  }
`;

const ButtonContainer = styled.div`
  font-size: 16px;
  font-family: "Lexend Deca";

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-top: 30px;

  button {
    width: 84px;
    height: 35px;

    font-size: 16px;
    font-family: "Lexend Deca";

    opacity: ${(props) => props.isDisabled && 0.7};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    color: ${colors.lightblue};
    margin-right: 23px;
    cursor: pointer;
  }
`;
