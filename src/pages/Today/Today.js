import styled from "styled-components";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { colors } from "../../constants/colors";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "../../constants/urls";
import Swal from "sweetalert2";
import { UserContext } from "../../components/UserContext";

export default function Today() {
  const [habits, setHabits] = useState([]);
  const { user } = useContext(UserContext);

  function currentDay() {
    const day = dayjs().day();
    switch (day) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      default:
        return;
    }
  }
  const text = currentDay();

  useEffect(() => {
    axios
      .get(urls.today, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((response) => setHabits(response.data))
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        })
      );
  }, [user.token, habits]);

  function checkHabit(id, done) {
    if (done === false) {
      axios
        .post(
          `${urls.habits}/${id}/check`,
          { id },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            footer: `Error status ${error.response.status}`,
          })
        );
    } else {
      axios
        .post(
          `${urls.habits}/${id}/uncheck`,
          { id },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            footer: `Error status ${error.response.status}`,
          })
        );
    }
  }

  return (
    <>
      <TopBar />
      <Body>
        <header>
          <p>
            {text}, {dayjs().date()}/{dayjs().month() + 1}
          </p>
          <span>Nenhum hábito concluído ainda</span>
        </header>
        <ul>
          {habits.map((item) => {
            return (
              <Habit key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <p>
                    Sequência atual:{" "}
                    <Sequence completed={item.done}>
                      {item.currentSequence} dias
                    </Sequence>
                  </p>
                  <p>
                    Seu recorde:{" "}
                    <Record
                      record={(item.currentSequence === item.highestSequence) && (item.highestSequence !== 0)}
                    >
                      {item.highestSequence} dias
                    </Record>
                  </p>
                </div>
                <Checkmark
                  completed={item.done}
                  onClick={() => checkHabit(item.id, item.done)}
                >
                  <ion-icon name="checkmark-sharp"></ion-icon>
                </Checkmark>
              </Habit>
            );
          })}
        </ul>
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

    span {
      color: ${colors.text};
      font-size: 18px;
    }
  }
`;

const Habit = styled.li`
  width: 340px;
  height: 94px;

  background: ${colors.white};
  border-radius: 5px;

  padding: 13px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;

  div {
    height: 69px;

    display: flex;
    flex-direction: column;

    color: ${colors.text};
  }

  span {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  p{
    font-size: 13px;
  }
`;

const Checkmark = styled.div`
  width: 69px;
  height: 69px;

  background: ${(props) => (props.completed ? "#8FC549" : "#ebebeb")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 50px;
  color: white !important;
`;

const Sequence = styled.span`
  font-size: 13px !important;
  color: ${(props) => (props.completed ? "#8FC549" : colors.text)};
`;

const Record = styled.span`
  font-size: 13px !important;
  color: ${(props) => (props.record ? "#8FC549" : colors.text)};
`;