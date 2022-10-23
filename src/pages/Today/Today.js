import styled from "styled-components";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { colors } from "../../constants/colors";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "../../constants/urls";
import Swal from "sweetalert2";
import { UserContext } from "../../components/UserContext";
import TodayHabit from "./TodayHabit";
import { ProgressContext } from "../../components/ProgressContext";

export default function Today() {
  const [habits, setHabits] = useState([]);
  const { user } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressContext);

  const day = dayjs().locale("pt-br").format("dddd, DD/MM");
  const text = day.charAt(0).toUpperCase() + day.slice(1);

  useEffect(() => {
    axios
      .get(urls.today, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        let done = 0;
        setHabits(response.data);
        response.data.forEach((item) => item.done === true && done++);
        setProgress((done / response.data.length) * 100);
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        })
      );
  }, [setProgress, user.token]);

  function checkHabit(id) {
    axios
      .post(
        `${urls.habits}/${id}/check`,
        { id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        axios
          .get(urls.today, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((response) => {
            let done = 0;
            setHabits(response.data);
            response.data.forEach((item) => item.done === true && done++);
            setProgress((done / response.data.length) * 100);
          });
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        })
      );
  }

  function uncheckHabit(id) {
    axios
      .post(
        `${urls.habits}/${id}/uncheck`,
        { id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        axios
          .get(urls.today, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((response) => {
            let done = 0;
            setHabits(response.data);
            response.data.forEach((item) => item.done === true && done++);
            setProgress((done / response.data.length) * 100);
          });
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: `Error status ${error.response.status}`,
        })
      );
  }

  return (
    <>
      <TopBar />
      <Body progress={progress === null || progress === 0 || isNaN(progress)}>
        <header>
          <p data-identifier="today-infos">{text}</p>
          {progress === null || progress === 0 || isNaN(progress) ? (
            <span>Nenhum hábito concluído ainda</span>
          ) : (
            <span data-identifier="today-infos">
              {progress.toFixed(0)}% dos hábitos concluídos
            </span>
          )}
        </header>
        <ul>
          {habits.map((item) => (
            <TodayHabit
              key={item.id}
              item={item}
              checkHabit={checkHabit}
              uncheckHabit={uncheckHabit}
            />
          ))}
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
  padding: 0px 17px 50px 17px;

  font-family: "Lexend Deca", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  header {
    color: ${colors.darkblue};
    font-size: 23px;

    padding: 28px 0px;

    width: 100%;

    span {
      color: ${(props) => (props.progress ? colors.text : "#8FC549")};
      font-size: 18px;
    }
  }
`;
