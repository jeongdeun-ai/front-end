import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  const handleCode = () => {
    navigate("/chatting");
  };

  return (
    <SettingWrapper>
      <Header>
        <Title>설정</Title>
        <StyledIcon onClick={handleCode}>
          <ion-icon name="code-slash"></ion-icon>
        </StyledIcon>
      </Header>
      <ContentArea></ContentArea>
    </SettingWrapper>
  );
}

const SettingWrapper = styled.div`
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

const StyledIcon = styled.div`
  ion-icon {
    color: var(--icon-tertiary);
    cursor: pointer;
    font-size: 24px;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
`;

export default Setting;
