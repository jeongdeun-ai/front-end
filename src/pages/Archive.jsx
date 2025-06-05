import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Calendar from "../components/common/Calendar";
import TabBar from "../components/common/TabBar";
import DailyReportCard from "../components/archive/DailyReportCard";
import AllRecordsContent from "../components/archive/AllRecordsContent";
import { getDailyReport } from "../api/reportApi";
import { getRecordsByDate } from "../api/recordsApi";
import { getParentEventInfo } from "../api/parent";
import Loading from "../components/common/Loading";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate, useLocation } from "react-router-dom";

// Tab types
const TAB_TYPES = {
  DAILY_REPORT: "dailyReport",
  ALL_RECORDS: "allRecords",
};

const formatDateForApi = (date) => {
  return format(date, "yyyy-MM-dd");
};

function Archive() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(TAB_TYPES.DAILY_REPORT);
  const [dailyReport, setDailyReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [isRecordsLoading, setIsRecordsLoading] = useState(false);
  const [recordsError, setRecordsError] = useState(null);
  const [parentInfo, setParentInfo] = useState(null);
  const [isParentInfoLoading, setIsParentInfoLoading] = useState(true);
  const [parentInfoError, setParentInfoError] = useState(null);
  const allRecordsRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = useCallback(() => {
    if (allRecordsRef.current) {
      allRecordsRef.current.scrollTo({
        top: allRecordsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    if (location.state?.scrollToBottom) {
      scrollToBottom();
    }
    if (location.state?.selectedDate) {
      setSelectedDate(location.state.selectedDate);
    }
  }, [location.state, scrollToBottom]);

  // Fetch parent info when component mounts
  useEffect(() => {
    const fetchParentInfo = async () => {
      try {
        setIsParentInfoLoading(true);
        const data = await getParentEventInfo();
        if (data?.parent_info) {
          setParentInfo(data.parent_info);
        }
      } catch (err) {
        console.error("Error fetching parent info:", err);
        setParentInfoError("부모 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsParentInfoLoading(false);
      }
    };

    fetchParentInfo();
  }, []);

  const fetchDailyReport = useCallback(async () => {
    if (activeTab !== TAB_TYPES.DAILY_REPORT) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getDailyReport(selectedDate);
      setDailyReport(data);
    } catch (err) {
      console.error("Error fetching daily report:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, selectedDate]);

  const fetchRecords = useCallback(
    async (date) => {
      if (activeTab !== TAB_TYPES.ALL_RECORDS) return;

      setIsRecordsLoading(true);
      setRecordsError(null);

      try {
        const data = await getRecordsByDate(date);
        setRecords(data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setRecordsError("기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsRecordsLoading(false);
      }
    },
    [activeTab]
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchDailyReport();
  }, [selectedDate, fetchDailyReport]);

  useEffect(() => {
    if (activeTab === TAB_TYPES.ALL_RECORDS) {
      fetchRecords(selectedDate);
    }
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
            <DailyReportCard
              date={selectedDate}
              data={dailyReport}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <AllRecordsContent
              ref={allRecordsRef}
              date={selectedDate}
              records={records}
              isLoading={isRecordsLoading || isParentInfoLoading}
              error={recordsError || parentInfoError}
              parentInfo={parentInfo}
            />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const DailyReportContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Archive;
