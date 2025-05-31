import React from "react";
import styled from "styled-components";

const categoryOptions = ["기분", "식사", "약", "추억"];

const TabsContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  border-bottom: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
  margin-bottom: 16px;
`;

const Tab = styled.button`
  flex: 1 1 0;
  min-width: 32px;
  height: 40px;
  padding: 12px 0;
  background: none;
  border: none;
  position: relative;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  text-align: center;
  color: ${(props) =>
    props.active
      ? "var(--text-primary, #171719)"
      : "var(--text-quaternary, #C2C4C8)"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: ${(props) =>
      props.active ? "var(--text-primary, #171719)" : "transparent"};
  }
`;

const TabBar = ({ activeCategory, setActiveCategory }) => {
  return (
    <TabsContainer>
      {categoryOptions.map((category) => (
        <Tab
          key={category}
          active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default TabBar;
