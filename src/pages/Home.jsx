import React from "react";
import styled from "styled-components";
import Card from "../components/common/Card";
import Profile from "../components/Home/Profile";
import CardSection from "../components/common/CardSection";
import VitalStatCard from "../components/Home/VitalStatCard";

function Home() {
  return (
    <HomeWrapper>
      <Header>
        <Title>홈</Title>
        <StyledIcon>
          <ion-icon name="notifications-outline"></ion-icon>
        </StyledIcon>
      </Header>
      <ContentArea>
        <Profile
          name="유인수"
          birth="1941.12.18"
          age={84}
          profileImage="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        />
        <Card>
          <CardSection
            title="현재 상태"
            trailingText="오후 3:50 기준"
            trailingIcon="reload-outline"
          >
            <VitalStatCard label="심박수" value="75 bpm" status="normal" />
            <VitalStatCard label="혈압" value="120/80 mmHg" status="caution" />
            <VitalStatCard label="체온" value="38.2 °C" status="danger" />
          </CardSection>
        </Card>
      </ContentArea>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-secondary);
  min-height: 100vh;
`;

const StyledIcon = styled.div`
  ion-icon {
    color: var(--icon-primary);
    cursor: pointer;
    font-size: 24px;
  }
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
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

export default Home;
