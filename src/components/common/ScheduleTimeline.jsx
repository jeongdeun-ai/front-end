import styled from "styled-components";

const STATUS = {
  done: {
    icon: "checkmark-circle",
    color: "var(--status-positive)",
    textColor: "var(--text-tertiary)",
    iconRight: true,
  },
  missed: {
    icon: "close-circle",
    color: "var(--status-negative)",
    textColor: "var(--text-tertiary)",
    iconRight: true,
  },
  upcoming: {
    icon: "time-outline",
    color: "var(--icon-brand)",
    textColor: "var(--text-primary)",
    iconRight: false,
  },
};

const LEFT_ICON = {
  약: { icon: "medical", color: "var(--icon-brand)" },
  병원: { icon: "medkit-outline", color: "var(--icon-brand)" },
  기본: { icon: "time-outline", color: "var(--icon-tertiary)" },
};

const ScheduleTimeline = ({ data = [] }) => {
  return (
    <Wrapper>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        const status = STATUS[item.status];
        const leftType = item.title.includes("약")
          ? LEFT_ICON["약"]
          : item.title.includes("병원")
          ? LEFT_ICON["병원"]
          : LEFT_ICON["기본"];

        return (
          <Item key={index}>
            <LeftColumn>
              <LeftIconGroup>
                <IconWrapper>
                  <ion-icon
                    name={leftType.icon}
                    style={{ color: leftType.color, fontSize: 20 }}
                  ></ion-icon>
                </IconWrapper>
                {!isLast && <Divider />}
              </LeftIconGroup>
              <InfoWrapper>
                <Time style={{ color: status.textColor }}>{item.time}</Time>
                <Title style={{ color: status.textColor }}>{item.title}</Title>
              </InfoWrapper>
            </LeftColumn>
            <RightColumn>
              {status.iconRight && (
                <CheckIcon>
                  <ion-icon
                    name={status.icon}
                    style={{ color: status.color, fontSize: 20 }}
                  ></ion-icon>
                </CheckIcon>
              )}
            </RightColumn>
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default ScheduleTimeline;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: stretch;
  padding-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  width: 288px;
`;

const LeftIconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 20px;
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 48px;
  background: var(--line-secondary, rgba(112, 115, 124, 0.16));
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Time = styled.div`
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 21px;
`;

const Title = styled.div`
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 21px;
`;

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`;
