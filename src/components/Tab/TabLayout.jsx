import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Tab from "./Tab";
import { useEffect, useRef } from "react";

export default function TabLayout() {
  const location = useLocation();
  const contentRef = useRef(null);
  const prevPathRef = useRef(location.pathname);

  // Scroll to top when the pathname changes
  useEffect(() => {
    // Only scroll if the path has changed (not on initial render)
    if (prevPathRef.current !== location.pathname) {
      // Scroll the content area to top
      if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
      }
      // Also scroll the window to top as a fallback
      window.scrollTo(0, 0);
      // Update the previous path
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <LayoutWrapper>
      <ContentArea ref={contentRef}>
        <Outlet />
      </ContentArea>
      <Tab
        onTabChange={() => {
          // This will be called when a tab is clicked
          if (contentRef.current) {
            contentRef.current.scrollTo(0, 0);
          }
        }}
      />
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
