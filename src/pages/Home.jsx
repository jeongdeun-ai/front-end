import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import Profile from "../components/Home/Profile";
import CardSection from "../components/common/CardSection";
import VitalStatCard from "../components/Home/VitalStatCard";
import StatusSummary from "../components/Home/StatusSummary";
import ScheduleTimeline from "../components/common/ScheduleTimeline";
import Loading from "../components/common/Loading";
import { getParentEventInfo, getDailyReport } from "../api/parent";

function Home() {
  const navigate = useNavigate();
  const [parentInfo, setParentInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [dailyReport, setDailyReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper function to get Korean time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "오전";
    if (hour < 18) return "오후";
    return "저녁";
  };

  // Helper function to get mood text in Korean
  const getMoodInKorean = (emotion) => {
    switch (emotion) {
      case "happy":
        return "기쁨";
      case "sad":
        return "슬픔";
      case "angry":
        return "화남";
      case "neutral":
        return "보통";
      default:
        return "보통";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("No access token found, redirecting to login");
          navigate("/login");
          return;
        }

        // Fetch parent event info
        console.log("Fetching parent event info...");
        const [parentData, reportData] = await Promise.all([
          getParentEventInfo(),
          getDailyReport(formatDateForAPI(new Date())),
        ]);

        // Process parent data
        console.log("Received parent data:", parentData);
        if (!parentData || !parentData.parent_info) {
          throw new Error("Invalid parent data format from server");
        }

        setParentInfo(parentData.parent_info);

        // Process events
        if (
          parentData.event_info?.events &&
          Array.isArray(parentData.event_info.events)
        ) {
          const formattedEvents = parentData.event_info.events.map((event) => ({
            time: `${event.start_time} - ${event.end_time}`,
            title: event.title,
            status: event.is_checked ? "done" : "upcoming",
          }));
          setEvents(formattedEvents);
        } else {
          console.warn(
            "No events found in response or invalid format:",
            parentData.event_info
          );
          setEvents([]);
        }

        // Process daily report
        console.log("Received daily report data:", reportData);
        if (reportData) {
          setDailyReport({
            chatTime: reportData.chat_time,
            taskSuccessRate: reportData.task_success_rate,
            emotion: reportData.emotion,
          });
        }
      } catch (err) {
        console.error("Failed to fetch parent info:", {
          error: err,
          message: err.message,
          response: err.response?.data,
        });
        setError(`정보를 불러오는 데 실패했습니다: ${err.message}`);
        if (err.response?.status === 401) {
          console.log("Unauthorized, redirecting to login");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return <Loading message="어르신 정보를 불러오는 중입니다..." />;
  }

  if (error) {
    return (
      <ErrorContainer>
        <h3>오류가 발생했습니다</h3>
        <p>{error}</p>
        <RetryButton onClick={() => window.location.reload()}>
          다시 시도
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <HomeWrapper>
      <Header>
        <Title>홈</Title>
        <StyledIcon>
          <ion-icon name="notifications-outline"></ion-icon>
        </StyledIcon>
      </Header>
      <ContentArea>
        {parentInfo && (
          <Profile
            name={parentInfo.name}
            birth={parentInfo.birth_date}
            age={
              new Date().getFullYear() -
              new Date(parentInfo.birth_date).getFullYear()
            }
            profileImage={parentInfo.photo_url}
          />
        )}
        <Card>
          <CardSection
            title="현재 상태"
            trailingText="오후 3:50 기준"
            trailingIcon="reload-outline"
          >
            <VitalStatCard label="심박수" value="75 bpm" status="normal" />
            <VitalStatCard label="혈압" value="120/80 mmHg" status="caution" />
            <VitalStatCard label="체온" value="38.2 °C" status="danger" />
          </CardSection>
        </Card>
        <Card>
          <CardSection
            title="일일 리포트"
            withChevronRight
            navigateTo="/archive"
          >
            <StatusSummary
              time={`${dailyReport?.chatTime || 0}분`}
              progress={`${dailyReport?.taskSuccessRate || 0}%`}
              mood={getMoodInKorean(dailyReport?.emotion)}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection
            title="오늘 일정"
            withChevronRight
            navigateTo="/schedule"
          >
            <ScheduleTimeline data={events} />
          </CardSection>
        </Card>
      </ContentArea>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-secondary);
  min-height: 100vh;
`;

const StyledIcon = styled.div`
  ion-icon {
    color: var(--icon-primary);
    cursor: pointer;
    font-size: 24px;
  }
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
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  color: var(--text-primary);

  h3 {
    color: var(--status-negative);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

export default Home;
