import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "../components/common/Calendar";

function Archive() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // You can add additional logic here when a date is selected
  };

  return (
    <ArchiveWrapper>
      <Header>
        <Title>기록</Title>
      </Header>
      <ContentArea>
        <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        {/* Add your archive list or other components below the calendar */}
      </ContentArea>
    </ArchiveWrapper>
  );
}

const ArchiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-primary);
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.4%;
  letter-spacing: -0.552px;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
`;

export default Archive;
