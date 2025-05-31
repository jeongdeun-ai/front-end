import styled from "styled-components";
import getTransparentColor from "../../utils/getTransparentColor";

const Badge = ({ type = "normal", text }) => {
  return (
    <BadgeWrapper $type={type}>
      <BadgeText $type={type}>{text}</BadgeText>
      {(type === "caution" || type === "danger") && (
        <Icon $type={type}>
          <ion-icon name="chevron-forward-circle-outline"></ion-icon>
        </Icon>
      )}
    </BadgeWrapper>
  );
};

const STATUS_COLOR = {
  normal: "var(--status-positive, #00BF40)",
  caution: "var(--status-cautionary, #FFA500)",
  danger: "var(--status-negative, #FF3B30)",
};

const BadgeWrapper = styled.div`
  display: inline-flex;
  height: 24px;
  padding: 0px 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background-color: ${({ $type }) =>
    getTransparentColor(STATUS_COLOR[$type], 0.08)};
  box-sizing: border-box;
`;

const BadgeText = styled.span`
  color: ${({ $type }) => STATUS_COLOR[$type]};
  font-feature-settings: "ss10" on;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 133.4%;
  letter-spacing: 0.302px;
`;

const Icon = styled.span`
  color: ${({ $type }) => STATUS_COLOR[$type]};
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export default Badge;
