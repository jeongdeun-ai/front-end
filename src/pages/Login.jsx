import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import FloatingButton from "../components/FloatingButton";
import TextField from "../components/TextField";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <LoginWrapper>
      <Navigation title="로그인" />
      <Content>
        <TextField
          label="이메일"
          placeholder="이메일 주소를 입력하세요"
          type="email"
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
        />
      </Content>
      <FloatingButton onClick={handleLogin}>로그인</FloatingButton>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px 16px;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Login;
