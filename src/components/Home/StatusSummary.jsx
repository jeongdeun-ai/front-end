import styled from "styled-components";

const StatusSummary = ({ time, progress, mood }) => {
  return (
    <Wrapper>
      <Block>
        <Label>대화 시간</Label>
        <Value>{time}</Value>
      </Block>
      <Divider />
      <Block>
        <Label>일정 수행</Label>
        <Value>{progress}</Value>
      </Block>
      <Divider />
      <Block>
        <Label>기분</Label>
        <Value>{mood}</Value>
      </Block>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
`;

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const Label = styled.div`
  color: var(--text-tertiary);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.4px;
`;

const Value = styled.div`
  color: var(--text-brand);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 141.2%;
`;

const Divider = styled.div`
  width: 1px;
  flex-shrink: 0;
  align-self: stretch;
  background: var(--line-secondary);
  margin: 0 8px;
`;

export default StatusSummary;
