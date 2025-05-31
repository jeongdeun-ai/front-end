import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardSection = ({
  title,
  trailingText,
  trailingIcon,
  withChevronRight = false,
  navigateTo = "/", // 기본 경로
  children,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (withChevronRight && navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <SectionWrapper>
      <SectionHeader>
        <TitleRow $clickable={withChevronRight} onClick={handleNavigate}>
          <Title>{title}</Title>
          {withChevronRight && (
            <InlineChevron>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </InlineChevron>
          )}
        </TitleRow>

        {(trailingText || trailingIcon) && (
          <TrailingContents>
            {trailingText && <TrailingText>{trailingText}</TrailingText>}
            {trailingIcon && (
              <TrailingIcon>
                <ion-icon name={trailingIcon}></ion-icon>
              </TrailingIcon>
            )}
          </TrailingContents>
        )}
      </SectionHeader>
      <Contents>{children}</Contents>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const Title = styled.h2`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.2%;
  margin: 0;
`;

const InlineChevron = styled.span`
  font-size: 18px;
  color: var(--icon-secondary);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TrailingContents = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TrailingText = styled.span`
  color: var(--text-tertiary);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 142.9%;
  letter-spacing: 0.203px;
`;

const TrailingIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--icon-tertiary);
  cursor: pointer;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export default CardSection;
