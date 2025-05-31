import { NavLink } from "react-router-dom";
import styled from "styled-components";

const tabs = [
  { name: "홈", path: "/" },
  { name: "질문", path: "/question" },
  { name: "기록", path: "/archive" },
  { name: "일정", path: "/schedule" },
  { name: "설정", path: "/settings" },
];

export default function Tab() {
  return (
    <TabBar>
      {tabs.map((tab) => (
        <StyledNavLink key={tab.path} to={tab.path} end={tab.path === "/"}>
          {tab.name}
        </StyledNavLink>
      ))}
    </TabBar>
  );
}

const TabBar = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
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

  &.active {
    color: var(--icon-brand);
    font-weight: 700;
  }
`;
