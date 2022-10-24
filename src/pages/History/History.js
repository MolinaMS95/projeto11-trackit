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
          ) : (
            <Calendar
              locale="pt"
              calendarType="US"
              tileClassName={checkHistory}
            />
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
