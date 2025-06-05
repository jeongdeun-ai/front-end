import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import logo from "../../assets/svg/favicon.svg";
import { getRecordsByDate } from "../../api/recordsApi";
import { ClipLoader } from "react-spinners";

// Helper function to get parent's name from parentInfo or fallback to localStorage
const getParentName = (parentInfo) => {
  // First try to get from parentInfo prop
  if (parentInfo?.name) {
    return parentInfo.name;
  }

  // Fallback to localStorage if parentInfo is not available
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return "어르신";

    const userData = JSON.parse(userInfo);
    return userData.parent_name || "어르신";
  } catch (e) {
    console.error("Error parsing user info:", e);
    return "어르신";
  }
};

const AllRecordsContent = ({ date, parentInfo }) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const data = await getRecordsByDate(date);
        setRecords(data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError("기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [date]);

  const formatTime = (dateString) => {
    return format(parseISO(dateString), "a hh:mm", { locale: ko });
  };

  const renderMessage = (message) => {
    return message.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <LoaderContainer>
        <ClipLoader color="var(--primary)" size={40} />
      </LoaderContainer>
    );
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (records.length === 0) {
    return <NoDataContainer>해당 날짜의 기록이 없습니다.</NoDataContainer>;
  }

  return (
    <Container>
      <DateHeader>{format(date, "yyyy년 M월 d일")}의 기록</DateHeader>
      <RecordsList>
        {records.map((record, index) => (
          <RecordItem key={record.id} $isAI={record.sender === "gpt"}>
            <Avatar $isAI={record.sender === "gpt"}>
              {record.sender === "gpt" ? (
                <AIProfileImage src={logo} alt="AI" />
              ) : (
                <UserProfileImage
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                />
              )}
            </Avatar>
            <MessageContent>
              <MessageHeader>
                <SenderName $isAI={record.sender === "gpt"}>
                  {record.sender === "gpt"
                    ? "AI (정든이)"
                    : getParentName(parentInfo)}
                </SenderName>
                <MessageTime>{formatTime(record.timestamp)}</MessageTime>
              </MessageHeader>
              <MessageText>{renderMessage(record.message)}</MessageText>
            </MessageContent>
          </RecordItem>
        ))}
      </RecordsList>
    </Container>
  );
};

export default AllRecordsContent;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

const DateHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
`;

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RecordItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isAI ? "transparent" : "var(--text-secondary)"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const AIProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
`;

const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const MessageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SenderName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.$isAI ? "var(--primary)" : "var(--text-primary)")};
`;

const MessageTime = styled.span`
  font-size: 12px;
  color: var(--text-tertiary);
`;

const MessageText = styled.div`
  font-size: 15px;
  line-height: 1.5;
  color: var(--text-primary);
  white-space: pre-line;
  word-break: break-word;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
`;

const ErrorContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--status-error);
`;

const NoDataContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--text-tertiary);
`;
