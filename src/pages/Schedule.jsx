import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/common/Calendar";
import ScheduleTimeline from "../components/common/ScheduleTimeline";
import MedicineSchedule from "../components/schedule/MedicineSchedule";
import Card from "../components/common/Card";
import CardSection from "../components/common/CardSection";
import TabBar from "../components/common/TabBar";
import { getEventsForDate } from "../api/scheduleApi";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";
import { ko } from "date-fns/locale";

function Schedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("schedule");

  const tabs = [
    { id: "schedule", label: "일정" },
    { id: "medicine", label: "약" },
  ];
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async (date) => {
    try {
      setIsLoading(true);
      setError(null);
      const formattedDate = format(date, "yyyy-MM-dd");
      const eventsData = await getEventsForDate(formattedDate);

      // Map the API response to match the ScheduleTimeline expected format
      const formattedEvents = eventsData.map((event) => ({
        id: event.id,
        title: event.title,
        time: `${event.start_time.substring(0, 5)} - ${event.end_time.substring(
          0,
          5
        )}`,
        status: event.is_checked ? "done" : "upcoming",
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("일정을 불러오는 중 오류가 발생했습니다.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <ScheduleWrapper>
      <Header>
        <Title>일정</Title>
      </Header>
      <ContentArea>
        <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />

        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <ContentContainer>
          {activeTab === "schedule" ? (
            <Card>
              <CardSection
                title={`${format(selectedDate, "M월 d일 (E)", {
                  locale: ko,
                })} 일정`}
                withChevronRight={false}
              >
                {isLoading ? (
                  <LoadingWrapper>
                    <ClipLoader color="var(--text-primary)" size={20} />
                  </LoadingWrapper>
                ) : error ? (
                  <ErrorText>{error}</ErrorText>
                ) : events.length > 0 ? (
                  <ScheduleTimeline data={events} />
                ) : (
                  <NoEventsText>등록된 일정이 없습니다.</NoEventsText>
                )}
              </CardSection>
            </Card>
          ) : (
            <MedicineSchedule />
          )}
        </ContentContainer>
      </ContentArea>
    </ScheduleWrapper>
  );
}

const ScheduleWrapper = styled.div`
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
  width: 100%;
  // padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  // gap: 16px;
  background: var(--background-primary);

  & > div:first-child {
    margin-bottom: 8px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  height: 250px;
`;

const ErrorText = styled.div`
  color: var(--status-negative);
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
`;

const NoEventsText = styled.div`
  color: var(--text-tertiary);
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
`;

export default Schedule;
