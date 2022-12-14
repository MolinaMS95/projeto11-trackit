import styled from "styled-components";
import { colors } from "../../constants/colors";

export default function Weekdays(props) {
  const { handleDays, days, disabled } = props;

  return (
    <div>
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="D"
        onClick={() => handleDays(0)}
        isSelected={days.includes(0)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="S"
        onClick={() => handleDays(1)}
        isSelected={days.includes(1)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="T"
        onClick={() => handleDays(2)}
        isSelected={days.includes(2)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="Q"
        onClick={() => handleDays(3)}
        isSelected={days.includes(3)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="Q"
        onClick={() => handleDays(4)}
        isSelected={days.includes(4)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="S"
        onClick={() => handleDays(5)}
        isSelected={days.includes(5)}
        disabled={disabled}
      />
      <Day
        data-identifier="week-day-btn"
        type="button"
        value="S"
        onClick={() => handleDays(6)}
        isSelected={days.includes(6)}
        disabled={disabled}
      />
    </div>
  );
}

const Day = styled.input`
  width: 30px !important;
  height: 30px !important;
  padding: 0px !important;

  background: ${(props) =>
    props.isSelected ? "#CFCFCF" : colors.white} !important;
  color: ${(props) => (props.isSelected ? "white" : "#DBDBDB")};

  cursor: pointer;
`;
