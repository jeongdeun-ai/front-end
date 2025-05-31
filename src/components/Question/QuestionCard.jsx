import styled from "styled-components";

const QuestionCard = ({ question, reason, onClickDetail, onSend }) => {
  return (
    <Wrapper>
      <TextGroup>
        <QuestionText>{question}</QuestionText>
        <ReasonText>{reason}</ReasonText>
        <DetailWrapper onClick={onClickDetail}>
          <DetailText>자세히보기</DetailText>
          <IconWrapper>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </IconWrapper>
        </DetailWrapper>
      </TextGroup>
      <SendButtonWrapper>
        <SendButton onClick={onSend}>질문 보내기</SendButton>
      </SendButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const QuestionText = styled.div`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.4px;
`;

const ReasonText = styled.div`
  color: var(--text-tertiary);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.4px;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 2px;
  cursor: pointer;
`;

const DetailText = styled.span`
  color: var(--text-tertiary);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: -0.4px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--icon-tertiary);
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

export default QuestionCard;
