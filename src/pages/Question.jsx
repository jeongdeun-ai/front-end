import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading";
import styled from "styled-components";
import Card from "../components/common/Card";
import QuestionCard from "../components/Question/QuestionCard";
import ConfirmModal from "../components/common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { generateRecommendedQuestion } from "../api/questionApi";
import { sendDirectQuestion } from "../api/questionApi";
import TabBar from "../components/common/TabBar";
import TextArea from "../components/TextArea";

// Tab types
const TAB_TYPES = {
  DAILY_REPORT: "dailyReport",
  ALL_RECORDS: "allRecords",
};

const CategoryTabBar = styled(TabBar)`
  margin: 0px 0px 16px !important;
`;

function Question() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("기분");
  const [customInput, setCustomInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [recommendedQuestion, setRecommendedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    try {
      setIsSending(true);
      const response = await sendDirectQuestion(pendingQuestion);
      console.log("Question sent successfully:", response);
      const today = new Date();
      navigate({
        pathname: "/archive",
        state: {
          scrollToBottom: true,
          activeTab: TAB_TYPES.ALL_RECORDS,
          selectedDate: today
        }
      });
    } catch (error) {
      console.error("Error sending question:", error);
    } finally {
      setIsSending(false);
      setShowModal(false);
      setPendingQuestion("");
      setCustomInput("");
      fetchRecommendedQuestion();
    }
  };

  const handleOpenModal = (question) => {
    if (!question.trim()) {
      alert("질문을 입력해주세요");
      return;
    }
    setPendingQuestion(question);
    setShowModal(true);
  };

  const fetchRecommendedQuestion = async () => {
    try {
      setLoading(true);
      const data = await generateRecommendedQuestion();
      setRecommendedQuestion(data);
    } catch (error) {
      console.error("Error fetching recommended question:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedQuestion();
  }, []);

  const categoryQuestions = {
    기분: [
      {
        question:
          "요즘 들어 특별히 기분이 좋아지는 순간이나 활동이 있으신가요?",
        reason:
          "김영익님은 최근 산책이나 따뜻한 날씨에 기분이 좋아진다고 종종 말씀하셨습니다. 반복적으로 기분이 좋아지는 상황을 스스로 자각하게 되면, 우울감이나 무기력한 날에도 그러한 활동을 통해 감정을 회복할 수 있는 내적 자원이 형성됩니다. 또한 본인의 정서 변화를 언어화하는 연습은 정서 인지력을 높이고 일상의 활력을 느끼게 해줄 수 있습니다.",
      },
    ],
    식사: [
      {
        question:
          "최근 식사 중 가장 입맛이 좋았던 날은 언제였는지 기억나시나요?",
        reason:
          "김영익님은 입맛이 없을 때가 있다고 종종 말씀하시지만, 특정 날에는 반찬이 맛있었다고 긍정적으로 말씀하신 적도 있습니다. 가장 맛있게 드셨던 기억을 떠올리는 질문은 음식에 대한 흥미를 환기시키고, 식욕을 자연스럽게 자극하는 데 도움이 됩니다. 또한 이러한 질문은 어르신의 건강 상태 변화나 식습관의 패턴을 파악하는 데에도 유용합니다.",
      },
    ],
    약: [
      {
        question: "아침 약 드실 때 가장 잊기 쉬운 건 어떤 약인가요?",
        reason:
          "김영익님은 약 복용을 비교적 잘 지키시지만, 멜록시캄을 자주 헷갈린다고 말씀하신 적이 있습니다. 복용 순서나 특정 약에 대한 기억 여부를 체크하는 질문은 약 복용 누락을 예방할 뿐 아니라, AI가 복약 리마인드를 더 맞춤형으로 제공하는 데 기반이 됩니다. 또한 스스로 어떤 약을 더 자주 인식하는지 점검하게 함으로써 약에 대한 자기 효능감을 높일 수 있습니다.",
      },
    ],
    추억: [
      {
        question:
          "요즘 자주 떠오르는 예전 기억이나 가족과의 추억이 있으신가요?",
        reason:
          "김영익님은 종종 자녀들과의 여행이나 자녀의 졸업식 같은 일을 언급하시며 감정적으로 연결된 경험을 떠올리곤 하셨습니다. 이러한 질문은 어르신이 긍정적인 기억을 회상하면서 정서적 안정을 찾을 수 있도록 도와줍니다. 특히, 외로움을 느끼는 시기에 따뜻한 기억을 떠올리는 것은 정서 회복과 자기 존중감 회복에 큰 도움이 됩니다.",
      },
    ],
  };

  const categoryOptions = Object.keys(categoryQuestions);

  // Convert category options to tabs format
  const categoryTabs = categoryOptions.map((category) => ({
    id: category,
    label: category,
  }));

  return (
    <QuestionWrapper>
      <Header>
        <Title>질문</Title>
        <TrailingContents>
          <TrailingText>오전 10:46 기준</TrailingText>
          <TrailingIcon>
            <ion-icon name="reload-outline"></ion-icon>
          </TrailingIcon>
        </TrailingContents>
      </Header>

      <ContentArea>
        <Content>
          <SubTitle>실시간 AI 추천 질문</SubTitle>
          <Card>
            <QuestionCard
              question={recommendedQuestion?.question}
              reason={recommendedQuestion?.reason}
              onClickDetail={() => navigate("/archive")}
              onSend={() => handleOpenModal(recommendedQuestion?.question)}
              loading={loading}
            />
          </Card>
        </Content>
        <Content>
          <SubTitle>카테고리별 질문</SubTitle>
          <CategoryTabBar
            tabs={categoryTabs}
            activeTab={activeCategory}
            onTabChange={(tab) => setActiveCategory(tab)}
          />
          {categoryQuestions[activeCategory]?.map((question, index) => (
            <Card key={index}>
              <QuestionCard
                question={question.question}
                reason={question.reason}
                onClickDetail={() => navigate("/archive")}
                onSend={() => handleOpenModal(question.question)}
              />
            </Card>
          ))}
        </Content>
        <Content>
          <SubTitle>직접 질문 작성하기</SubTitle>
          <Card>
            <TextArea
              label="질문을 입력해주세요"
              placeholder="예: 최근 식사는 어떠셨나요?"
              description="최대 100자까지 입력 가능합니다."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              rows={4}
            />
            <SendButtonWrapper>
              <SendButton
                onClick={() => handleOpenModal(customInput)}
                disabled={!customInput.trim()}
              >
                질문 보내기
              </SendButton>
            </SendButtonWrapper>
          </Card>
        </Content>
      </ContentArea>
      {showModal && (
        <ConfirmModal
          title={`'${pendingQuestion}' 질문을 보내시겠습니까?`}
          description="보낸 질문은 기록 탭에서 확인할 수 있어요."
          confirmText="보내기"
          cancelText="취소"
          onConfirm={handleSend}
          onCancel={() => setShowModal(false)}
          loading={isSending}
        />
      )}
    </QuestionWrapper>
  );
}

export default Question;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-secondary);
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
  font-weight: 700;
  letter-spacing: -0.552px;
`;

const TrailingContents = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TrailingText = styled.span`
  color: var(--text-tertiary);
  font-size: 14px;
  font-weight: 500;
`;

const TrailingIcon = styled.span`
  display: flex;
  font-size: 24px;
  color: var(--icon-tertiary);
  cursor: pointer;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h2`
  color: var(--text-primary);
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SendButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SendButton = styled.button`
  display: flex;
  padding: 7px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background-color: var(--button-brand);
  color: var(--text-brand-invert);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
