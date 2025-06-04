import React from "react";
import styled from "styled-components";

/**
 * A flexible tab bar component that can be used throughout the application
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with `id` and `label` properties
 * @param {string} props.activeTab - The currently active tab ID
 * @param {Function} props.onTabChange - Callback when a tab is clicked
 * @param {string} [props.variant='default'] - Visual variant: 'default' or 'category'
 * @param {string} [props.className] - Additional CSS class name
 * @param {Object} [props.style] - Additional inline styles
 */
const TabBar = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
  className,
  style,
}) => {
  return (
    <TabsContainer className={className} style={style} $variant={variant}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          $active={activeTab === tab.id}
          $variant={variant}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {variant === "default" && activeTab === tab.id && <ActiveIndicator />}
          {variant === "category" && (
            <ActiveIndicator $active={activeTab === tab.id} />
          )}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default TabBar;

const TabsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.$variant === "category" ? "flex-start" : "space-between"};
  align-self: stretch;
  border-bottom: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
  margin: ${(props) =>
    props.$variant === "category" ? "0 0 16px 0" : "0 20px 16px"};
  ${(props) => props.$variant === "category" && "flex-wrap: wrap;"}
  padding-bottom: 1px; /* Add space for the active indicator */
`;

const Tab = styled.button`
  flex: ${(props) => (props.$variant === "category" ? "0 0 auto" : "1 1 0")};
  min-width: ${(props) => (props.$variant === "category" ? "auto" : "32px")};
  height: 100%;
  padding: 14px ${(props) => (props.$variant === "category" ? "14px" : "0")};
  margin-right: ${(props) => (props.$variant === "category" ? "8px" : "0")};
  background: none;
  border: none;
  position: relative;
  font-size: 15px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.144px;
  text-align: center;
  white-space: nowrap;
  color: ${(props) =>
    props.$active
      ? "var(--text-primary, #171719)"
      : props.$variant === "category"
      ? "var(--text-quaternary, #C2C4C8)"
      : "var(--text-tertiary, #878A93)"};
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: var(--text-primary, #171719);
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary, #171719);
  display: ${(props) => (props.$active === false ? "none" : "block")};
`;
