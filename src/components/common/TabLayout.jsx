import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Tab from "./Tab";

export default function TabLayout() {
  return (
    <LayoutWrapper>
      <ContentArea>
        <Outlet />
      </ContentArea>
      <Tab />
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
`;
