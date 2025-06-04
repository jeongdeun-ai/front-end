import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import Card from "../common/Card";
import StatusSummary from "../Home/StatusSummary";

const MOOD_TRANSLATIONS = {
  happy: "기쁨",
  sad: "슬픔",
  angry: "화남",
  anxious: "불안",
  neutral: "보통",
  depressed: "우울함",
};

const getMoodText = (emotion) => MOOD_TRANSLATIONS[emotion] || emotion;

const shouldShowAlert = (emotion) =>
  ["sad", "anxious", "depressed"].includes(emotion);

const DailyReportCard = ({ date, data, isLoading, error }) => {
  if (isLoading) {
    return (
      <LoaderContainer>
        <ClipLoader color="var(--primary)" size={40} />
      </LoaderContainer>
    );
  }

  if (error) {
    return (
      <LoaderContainer>
        데이터를 불러오는 중 오류가 발생했습니다.
      </LoaderContainer>
    );
  }

  if (!data) {
    return <NoDataMessage>해당 날짜의 데이터가 없습니다.</NoDataMessage>;
  }

  const { total_chat_time, event_success_ratio, parent_emotion, summary } =
    data;
  const moodText = getMoodText(parent_emotion);
  const progressPercentage = Math.round(event_success_ratio);

  return (
    <Card padding="16px" width="335px">
      <Header>
        <Title>일일 리포트</Title>
      </Header>

      <StatusSummary
        time={`${total_chat_time}분`}
        progress={`${progressPercentage}%`}
        mood={moodText}
      />

      <SummaryContainer>
        <SummaryTitle>대화 요약</SummaryTitle>
        <SummaryText>{summary}</SummaryText>
      </SummaryContainer>

      {shouldShowAlert(parent_emotion) && (
        <Alert>
          <AlertIcon name="warning" />
          <AlertText>
            {moodText}이(가) 감지되었어요. 직접 연락하거나 질문을 남겨보세요.
          </AlertText>
        </Alert>
      )}
    </Card>
  );
};

export default DailyReportCard;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: var(--text-primary, #171719);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin: 0;
`;

const SummaryContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  border-radius: 14px;
  padding: 13px 16px;
  border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
`;

const SummaryTitle = styled.h3`
  color: var(--text-primary, #171719);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 0 0 8px 0;
`;

const SummaryText = styled.p`
  color: var(--text-secondary, #4d4f5c);
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  margin: 0;
  white-space: pre-line;
`;

const NoDataMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
`;

const Alert = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 12px;
  background-color: color-mix(
    in srgb,
    var(--status-cautionary) 5%,
    transparent
  );
  border-radius: 12px;
  gap: 8px;
`;

const AlertIcon = styled("ion-icon")`
  font-size: 20px;
  color: var(--status-cautionary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
`;

const AlertText = styled.p`
  color: var(--text-primary, #171719);
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0.14px;
  margin: 0;
  padding: 0;

  br {
    display: none;

    @media (max-width: 320px) {
      display: block;
    }
  }
`;
