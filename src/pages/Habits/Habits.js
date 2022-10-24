import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { UserContext } from "../../components/UserContext";
import { colors } from "../../constants/colors";
import { urls } from "../../constants/urls";
import Swal from "sweetalert2";
import TaskCreator from "./TaskCreator";

export default function Habits() {
  const [addTask, setAddTask] = useState(false);
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [days, setDays] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(urls.habits, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((response) => setHabits(response.data))
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        })
      );
  }, [user.token]);

  function deleteHabit(id) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não será possível reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${urls.habits}/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            axios
              .get(urls.habits, {
                headers: { Authorization: `Bearer ${user.token}` },
              })
              .then((response) => setHabits(response.data));
          })
          .catch((error) => alert(error.response.data.message));
      }
    });
  }

  function Habit({ item }) {
    return (
      <HabitContainer>
        <p data-identifier="habit-name">{item.name}</p>
        <ion-icon
          data-identifier="delete-habit-btn"
          onClick={() => deleteHabit(item.id)}
          name="trash-outline"
        ></ion-icon>
        <div>
          <Day isSelected={item.days.includes(0)}>D</Day>
          <Day isSelected={item.days.includes(1)}>S</Day>
          <Day isSelected={item.days.includes(2)}>T</Day>
          <Day isSelected={item.days.includes(3)}>Q</Day>
          <Day isSelected={item.days.includes(4)}>Q</Day>
          <Day isSelected={item.days.includes(5)}>S</Day>
          <Day isSelected={item.days.includes(6)}>S</Day>
        </div>
      </HabitContainer>
    );
  }

  return (
    <>
      <TopBar />
      <Body>
        <header>
          <p>Meus hábitos</p>
          <button
            data-identifier="create-habit-btn"
            onClick={() => setAddTask(true)}
          >
            +
          </button>
        </header>
        {addTask && (
          <TaskCreator
            setAddTask={setAddTask}
            name={name}
            setName={setName}
            days={days}
            setDays={setDays}
            habits={habits}
            setHabits={setHabits}
          />
        )}
        {habits.length === 0 ? (
          <div data-identifier="no-habit-message">
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </div>
        ) : (
          habits.map((item) => <Habit key={item.id} item={item} />)
        )}
      </Body>
      <BottomBar />
    </>
  );
}

const Body = styled.main`
  background: ${colors.background};

  height: calc(100vh - 140px);
  margin: 70px 0px;
  padding: 0px 17px 50px 17px;

  font-family: "Lexend Deca", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${colors.darkblue};
    font-size: 23px;

    padding: 28px 0px;

    width: 100%;

    button {
      width: 40px;
      height: 35px;
      font-size: 27px;
    }
  }

  button {
    background: ${colors.lightblue};

    border-radius: 5px;
    border: none;

    color: ${colors.white};
  }

  div {
    font-size: 18px;
    color: ${colors.text};
  }
`;

const HabitContainer = styled.div`
  width: 340px;
  height: 91px;

  background: ${colors.white};
  border-radius: 5px;

  margin-bottom: 10px;
  padding: 15px;

  position: relative;

  word-break: break-word;

  div {
    display: flex;
    gap: 5px;

    margin-top: 8px;
  }

  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;
  }
`;

const Day = styled.span`
  width: 30px;
  height: 30px;

  background: ${(props) =>
    props.isSelected ? "#CFCFCF" : colors.white} !important;
  color: ${(props) => (props.isSelected ? "white" : "#DBDBDB")};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5d5d5;
  border-radius: 5px;
`;
