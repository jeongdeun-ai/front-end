import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Navigation({ title, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <NavWrapper>
      <StyledIcon onClick={handleBack}>
        <ion-icon name="chevron-back-outline"></ion-icon>
      </StyledIcon>
      <Title>{title}</Title>
    </NavWrapper>
  );
}

const NavWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 16px;
  align-self: stretch;
  background-color: var(--background-primary);
`;

const StyledIcon = styled.div`
  ion-icon {
    color: var(--icon-primary);
    cursor: pointer;
    font-size: 24px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.4%;
  letter-spacing: -0.552px;
`;
