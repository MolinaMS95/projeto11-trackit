import styled from "styled-components";
import { colors } from "../../constants/colors";

export default function TodayHabit({ item, checkHabit, uncheckHabit }) {
  return (
    <Habit key={item.id}>
      <div data-identifier="today-infos">
        <span>{item.name}</span>
        <p>
          Sequência atual:{" "}
          <Sequence completed={item.done}>{item.currentSequence} dias</Sequence>
        </p>
        <p>
          Seu recorde:{" "}
          <Record
            record={
              item.currentSequence === item.highestSequence &&
              item.highestSequence !== 0
            }
          >
            {item.highestSequence} dias
          </Record>
        </p>
      </div>
      <Checkmark
        data-identifier="done-habit-btn"
        completed={item.done}
        onClick={() => {
          item.done ? uncheckHabit(item.id) : checkHabit(item.id);
        }}
      >
        <ion-icon name="checkmark-sharp"></ion-icon>
      </Checkmark>
    </Habit>
  );
}

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

    word-break: break-word;
  }

  span {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
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

  cursor: pointer;
`;

const Sequence = styled.span`
  font-size: 13px !important;
  color: ${(props) => (props.completed ? "#8FC549" : colors.text)};
`;

const Record = styled.span`
  font-size: 13px !important;
  color: ${(props) => (props.record ? "#8FC549" : colors.text)};
`;
