import React from "react";
import styled from "styled-components";

function Question() {
  return (
    <QuestionWrapper>
      <Header>
        <Title>질문</Title>
      </Header>
      <ContentArea></ContentArea>
    </QuestionWrapper>
  );
}

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

export default Question;
