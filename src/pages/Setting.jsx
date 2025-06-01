import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  const handleCode = () => {
    navigate("/chatting");
  };

  const handleLogout = () => {
    try {
      // Clear all auth data from localStorage
      localStorage.clear(); // Clear everything to be safe

      // Force a hard redirect to the get-started page
      // This ensures all app state is completely reset
      window.location.href = "/get-started";
    } catch (error) {
      console.error("Error during logout:", error);
      // If there's an error, still try to redirect
      window.location.href = "/get-started";
    }
  };

  return (
    <SettingWrapper>
      <Header>
        <Title>설정</Title>
        <StyledIcon onClick={handleCode}>
          <ion-icon name="code-slash"></ion-icon>
        </StyledIcon>
      </Header>
      <ContentArea>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ContentArea>
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

const ContentArea = styled.div`
  width: 100%;
  padding: 20px;
  flex-grow: 1;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ff0000;
  }
`;

export default Setting;
