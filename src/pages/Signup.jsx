import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import FloatingButton from "../components/FloatingButton";
import styled from "styled-components";
import TextField from "../components/TextField";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/", { replace: true });
  };

  return (
    <SignupWrapper>
      <Navigation title="회원가입" />
      <Contents>
        <Content>
          <Title>보호자 정보</Title>
          <TextField
            label="이메일"
            placeholder="이메일 주소를 입력하세요"
            description="로그인에 사용되는 이메일입니다."
            type="email"
          />
          <TextField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            description="로그인에 사용되는 비밀번호입니다."
            type="password"
          />
          <TextField
            label="보호자 이름"
            placeholder="보호자 이름을 입력하세요"
            description="보호자 이름을 입력해주세요."
            type="text"
          />
          <TextField
            label="보호자 연락처"
            placeholder="보호자 연락처를 입력하세요"
            description="보호자 연락처를 입력해주세요."
            type="tel"
          />
          <TextField
            label="보호자와 어르신과의 관계"
            placeholder="보호자와 어르신과의 관계를 입력하세요"
            description="보호자와 어르신과의 관계를 입력해주세요."
            type="text"
          />
        </Content>
        <Content>
          <Title>어르신 정보</Title>
          <TextField
            label="이름"
            placeholder="이름을 입력하세요"
            description="어르신 이름을 입력해주세요."
            type="text"
          />
          <TextField
            label="성별"
            placeholder="성별을 입력하세요"
            description="어르신 성별을 입력해주세요."
            type="text"
          />
          <TextField
            label="생년월일"
            placeholder="생년월일을 입력하세요"
            description="어르신 생년월일을 입력해주세요."
            type="date"
          />
        </Content>
      </Contents>
      <FloatingButton onClick={handleSignUp}>가입하기</FloatingButton>
    </SignupWrapper>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  color: var(--text-primary);
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.2%;
`;
