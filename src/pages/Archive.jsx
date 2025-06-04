import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../components/common/Calendar";
import TabBar from "../components/common/TabBar";
import DailyReportCard from "../components/archive/DailyReportCard";
import { getDailyReport } from "../api/reportApi";
import Loading from "../components/common/Loading";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

// Tab types
const TAB_TYPES = {
  DAILY_REPORT: "dailyReport",
  ALL_RECORDS: "allRecords",
};

const formatDateForApi = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Archive() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(TAB_TYPES.DAILY_REPORT);
  const [dailyReport, setDailyReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailyReport = async (date) => {
    if (activeTab !== TAB_TYPES.DAILY_REPORT) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await getDailyReport(date);
      setDailyReport(data);
    } catch (err) {
      console.error("Error fetching daily report:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    fetchDailyReport(selectedDate);
  }, [selectedDate, activeTab]);

  const tabs = [
    { id: TAB_TYPES.DAILY_REPORT, label: "일일 리포트" },
    { id: TAB_TYPES.ALL_RECORDS, label: "전체 기록" },
  ];

  const DailyReportContent = ({ date, data, isLoading, error }) => (
    <DailyReportContentContainer>
      <DailyReportCard
        date={date}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </DailyReportContentContainer>
  );

  const AllRecordsContent = ({ date }) => (
    <div>
      <h3>{format(date, "yyyy년 M월 d일")}의 전체 기록 보기</h3>
      {/* Add your all records content here */}
    </div>
  );

  return (
    <ArchiveWrapper>
      <Header>
        <Title>기록</Title>
      </Header>
      <ContentArea>
        <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          variant="default"
        />
        <ContentContainer>
          {activeTab === TAB_TYPES.DAILY_REPORT ? (
            <DailyReportContent
              date={selectedDate}
              data={dailyReport}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <AllRecordsContent date={selectedDate} />
          )}
        </ContentContainer>
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

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 375px;
`;

const DailyReportContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export default Archive;
