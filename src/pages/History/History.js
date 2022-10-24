import styled from "styled-components";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { colors } from "../../constants/colors";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { urls } from "../../constants/urls";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContext";
import dayjs from "dayjs";

export default function History() {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState(null);
  const [days, setDays] = useState([]);
  const [showDay, setShowDay] = useState(false);
  const [pastDay, setPastDay] = useState(null);

  useEffect(() => {
    axios
      .get(urls.history, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setHistory(response.data);
        const dates = [];
        for (let i = 0; i < response.data.length; i++) {
          dates[i] = response.data[i].day;
        }
        setDays(dates);
      });
  }, [user.token]);

  function checkHistory({ date, view }) {
    const newDate = dayjs(date).format("DD/MM/YYYY");
    if (newDate === dayjs().format("DD/MM/YYYY")) {
      return;
    }
    if (days.includes(newDate)) {
      return checkDone(newDate);
    }
  }

  function checkDone(newDate) {
    let completed = true;
    const index = days.indexOf(newDate);
    const habits = history[index].habits;
    for (let i = 0; i < habits.length; i++) {
      if (habits[i].done === false) {
        completed = false;
      }
    }
    if (completed === true) {
      return "complete";
    } else {
      return "incomplete";
    }
  }

  function showHabits(value) {
    const date = dayjs(value).format("DD/MM/YYYY");
    const index = days.indexOf(date);
    if (index !== -1) {
      setShowDay(true);
      setPastDay(index);
    }
  }

  function HistoryHabits({ habit }) {
    return (
      <Habit>
        <div>{habit.name}</div>
        <Checkmark completed={habit.done}>
          <ion-icon name="checkmark-sharp"></ion-icon>
        </Checkmark>
      </Habit>
    );
  }

  return (
    <>
      <TopBar />
      <Body>
        <header>
          <p>Histórico</p>
        </header>
        <Container>
          {history === null ? (
            <div> Carregando </div>
          ) : !showDay ? (
            <Calendar
              locale="pt"
              calendarType="US"
              tileClassName={checkHistory}
              onClickDay={(value) => showHabits(value)}
            />
          ) : (
            <ul>
              {history[pastDay].habits.map((habit) => (
                <HistoryHabits habit={habit} key={habit.id} />
              ))}
            </ul>
          )}
        </Container>
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
  }

  div {
    font-size: 18px;
    color: ${colors.text};
  }
`;

const Container = styled.div`
  .react-calendar {
    border: none;
  }

  .complete {
    background: green;
    border-radius: 50%;
    width: 100%;
  }

  .incomplete {
    background: red;
    border-radius: 50%;
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

    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${colors.text};

    word-break: break-word;
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

  font-size: 50px !important;
  color: white !important;
`;
