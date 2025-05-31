import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import welcomeImg from "../assets/svg/welcome.svg";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentArea>
        <WelcomeImage src={welcomeImg} alt="Welcome" />
      </ContentArea>
      <StickyButtons>
        <ButtonWhite onClick={() => navigate("/login")}>로그인</ButtonWhite>
        <ButtonBrand onClick={() => navigate("/signup")}>회원가입</ButtonBrand>
      </StickyButtons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(
    --Gradient,
    linear-gradient(
      180deg,
      var(--background-primary, #fff) 0%,
      var(--background-brand, #008dcf) 33.17%,
      var(--background-primary, #fff) 87.08%
    )
  );
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
`;

const WelcomeImage = styled.img`
  width: 70%;
`;

const StickyButtons = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ButtonWhite = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--line-secondary);
  color: var(--text-brand);
  background-color: var(--button-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.091px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: var(--button-primary-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonBrand = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 0px;
  color: var(--text-brand-invert);
  background-color: var(--button-brand);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.091px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: var(--button-brand-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default GetStarted;
