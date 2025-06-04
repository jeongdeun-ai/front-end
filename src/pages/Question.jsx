import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/common/Card";
import QuestionCard from "../components/Question/QuestionCard";
import ConfirmModal from "../components/common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/common/TabBar";
import TextArea from "../components/TextArea";

function Question() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("기분");
  const [customInput, setCustomInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");

  const handleSend = () => {
    console.log("질문 전송됨:", pendingQuestion);
    setShowModal(false);
    setPendingQuestion("");
    setCustomInput("");
  };

  const handleOpenModal = (question) => {
    setPendingQuestion(question);
    setShowModal(true);
  };

  const categoryOptions = ["기분", "식사", "약", "추억"];

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
              question="최근에 무릎 통증 때문에 불편하신 점이 있으신가요?"
              reason="김영우님께서는 무릎 통증을 주요 질환으로 가지고 계시고, 이에 대한 약도 복용하고 계십니다. 나이가 80대이신 만큼, 일상생활에서 무릎 통증이 큰 불편함으로 작용할 수 있습니다. 최근의 상태를 여쭤보는 것은 김영우님의 현재 건강 상태를 이해하고, 필요에 따라 추가적인 조언이나 도움을 제공할 수 있는 기회를 가질 수 있습니다. 또한, 건강에 대한 관심을 보여주는 것은 김영우님에게 심리적 안정을 줄 수도 있습니다."
              onClickDetail={() => navigate("/archive")}
              onSend={() => handleOpenModal("최근에 무릎 통증 때문에...")}
            />
          </Card>
        </Content>
        <Content>
          <SubTitle>카테고리별 질문</SubTitle>
          <TabBar
            tabs={categoryTabs}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
            variant="category"
          />
          <Card>
            <QuestionCard
              question={`[${activeCategory}]에 대한 질문입니다.`}
              reason={`${activeCategory}에 대한 질문 이유입니다.`}
              onClickDetail={() => navigate("/archive")}
              onSend={() =>
                handleOpenModal(`${activeCategory}에 대한 질문입니다.`)
              }
            />
          </Card>
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
              <SendButton onClick={() => handleOpenModal(customInput)}>
                질문 보내기
              </SendButton>
            </SendButtonWrapper>
          </Card>
        </Content>
      </ContentArea>
      {showModal && (
        <ConfirmModal
          title={`‘${pendingQuestion}’ 질문을 보내시겠습니까?`}
          description="보낸 질문은 기록 탭에서 확인할 수 있어요."
          confirmText="보내기"
          cancelText="취소"
          onConfirm={handleSend}
          onCancel={() => setShowModal(false)}
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
