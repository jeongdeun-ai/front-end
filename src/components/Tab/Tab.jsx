import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const tabs = [
  { name: "홈", path: "/", icon: "home" },
  { name: "질문", path: "/question", icon: "chatbubble" },
  { name: "기록", path: "/archive", icon: "archive" },
  { name: "일정", path: "/schedule", icon: "calendar" },
  { name: "설정", path: "/settings", icon: "settings" },
];

export default function Tab({ onTabChange }) {
  const location = useLocation();
  
  // Call onTabChange when the location changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange();
    }
  }, [location.pathname, onTabChange]);

  return (
    <TabBar>
      {tabs.map((tab) => (
        <StyledNavLink 
          key={tab.path} 
          to={tab.path} 
          end={tab.path === "/"}
          onClick={() => {
            // Call onTabChange when a tab is clicked
            if (onTabChange) {
              onTabChange();
            }
          }}
        >
          <StyledIcon>
            <ion-icon name={tab.icon}></ion-icon>
          </StyledIcon>
          <span>{tab.name}</span>
        </StyledNavLink>
      ))}
    </TabBar>
  );
}

const TabBar = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  padding-bottom: 36px;
  background-color: var(--background-primary);
  border-top: 0.5px solid var(--line-primary);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--icon-quaternary);
  font-size: 11px;
  font-weight: 500;
  line-height: 127.3%;
  letter-spacing: 0.342px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  transition: color 0.25s ease, transform 0.2s ease;

  &:hover {
    color: var(--icon-tertiary);
  }

  span {
    margin-top: 2px;
  }

  &.active {
    color: var(--icon-brand);
    font-weight: 700;
  }
`;

const StyledIcon = styled.div`
  ion-icon {
    font-size: 24px;
  }
`;
