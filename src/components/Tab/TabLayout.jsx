import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Tab from "./Tab";
import { useState } from 'react';

export default function TabLayout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // No floating button will be shown on any page
  const showFloatingButton = false;

  return (
    <LayoutWrapper>
      <ContentArea>
        <Outlet />
      </ContentArea>
      {/* Floating button removed as per requirements */}
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
  padding-bottom: 80px; // Add padding to prevent content from being hidden behind the floating button
`;
