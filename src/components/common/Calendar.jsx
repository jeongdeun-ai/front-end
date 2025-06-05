import React, { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ko } from "date-fns/locale";

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days of the week in Korean
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // Add empty cells for days before the start of the month
  const startDay = monthStart.getDay();
  const emptyStartDays = Array(startDay).fill(null);

  // Add empty cells for days after the end of the month
  const endDay = 6 - monthEnd.getDay();
  const emptyEndDays = endDay < 6 ? Array(endDay + 1).fill(null) : [];

  const allDays = [...emptyStartDays, ...daysInMonth, ...emptyEndDays];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (day && onDateSelect && day <= today) {
      onDateSelect(day);
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton onClick={prevMonth}>
          <ChevronLeft size={20} color="var(--icon-tertiary)" />
        </NavButton>
        <MonthText>
          {format(currentMonth, "yyyy년 M월", { locale: ko })}
        </MonthText>
        <NavButton onClick={nextMonth}>
          <ChevronRight size={20} color="var(--icon-tertiary)" />
        </NavButton>
      </CalendarHeader>

      <WeekDaysContainer>
        {weekDays.map((day, index) => (
          <WeekDay key={index}>{day}</WeekDay>
        ))}
      </WeekDaysContainer>

      <DaysContainer>
        {allDays.map((day, index) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const isSelected =
            day && selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = day && isSameMonth(day, currentMonth);
          const isFuture = day > today;

          return (
            <DayCell
              key={index}
              $isSelected={isSelected}
              $isCurrentMonth={isCurrentMonth}
              $isFuture={isFuture}
              onClick={() => handleDateClick(day)}
            >
              {day && (
                <DayNumber $isSelected={isSelected}>
                  {format(day, "d")}
                </DayNumber>
              )}
            </DayCell>
          );
        })}
      </DaysContainer>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  width: 100%;
  padding: 16px 16px 8px;
  background: var(--background-primary, #fff);
  border-radius: 14px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: var(--background-secondary);
  }
`;

const MonthText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-tertiary);
`;

const WeekDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  font-size: 12px;
  color: var(--text-tertiary);
  padding: 4px 0;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$isFuture ? "not-allowed" : "pointer")};
  position: relative;
  color: ${(props) =>
    props.$isSelected
      ? "var(--text-on-primary, #fff)"
      : props.$isFuture
      ? "var(--text-disabled, rgba(0, 0, 0, 0.24))"
      : props.$isCurrentMonth
      ? "var(--text-primary, #171719)"
      : "var(--text-disabled, rgba(0, 0, 0, 0.24))"};
  background: ${(props) =>
    props.$isSelected ? "var(--button-brand)" : "transparent"};
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$isFuture ? 0.5 : 1)};

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? "var(--button-brand-hover)"
        : !props.$isFuture
        ? "var(--background-hover, rgba(0, 0, 0, 0.04))"
        : "inherit"};
  }
`;

const DayNumber = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
