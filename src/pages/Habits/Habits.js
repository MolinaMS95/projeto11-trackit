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
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(urls.habits, { headers: { "Authorization": `Bearer ${user.token}` } })
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

  return (
    <>
      <TopBar />
      <Body>
        <header>
          <p>Meus hábitos</p>
          <button onClick={() => setAddTask(true)}>+</button>
        </header>
        {addTask && (<TaskCreator setAddTask={setAddTask} name={name} setName={setName} days={days} setDays={setDays} habits={habits} setHabits={setHabits}/>)}
        {habits.length === 0 ? (
          <div>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </div>
        ):
        (<div>tem hábito</div>)}
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