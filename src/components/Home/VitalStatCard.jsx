import styled from "styled-components";
import Badge from "../common/Badge";

const ICONS = {
  심박수: "fitness-outline",
  혈압: "water-outline",
  체온: "thermometer-outline",
};

const VitalStatCard = ({ label, value, status }) => {
  const iconName = ICONS[label] || "help";

  return (
    <Wrapper>
      <Icon>
        <ion-icon name={iconName}></ion-icon>
      </Icon>
      <TextWrapper>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </TextWrapper>
      <Badge type={status} text={statusLabel(status)} />
    </Wrapper>
  );
};

export default VitalStatCard;

const statusLabel = (type) => {
  switch (type) {
    case "normal":
      return "정상";
    case "caution":
      return "주의";
    case "danger":
      return "위험";
    default:
      return "";
  }
};

const Wrapper = styled.div`
  display: flex;
  padding: 13px 16px;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;

  border-radius: 14px;
  border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
`;

const Icon = styled.span`
  font-size: 24px;
  color: var(--icon-primary, #171719);
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  flex: 1 0 0;
`;

const Label = styled.div`
  color: var(--icon-primary, #171719);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.4px;
`;

const Value = styled.div`
  color: var(--text-tertiary, #878a93);
  font-family: "SF Pro", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.4px;
`;
