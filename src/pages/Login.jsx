import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import FloatingButton from "../components/FloatingButton";
import TextField from "../components/TextField";
import styled from "styled-components";
import { login } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      console.log("Login attempt with email:", formData.email);
      const response = await login(formData.email, formData.password);

      if (response && response.access) {
        console.log("Login successful:", response);

        // Store tokens and user info in localStorage
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: response.username,
            email: response.email,
            phoneNumber: response.phone_number,
          })
        );

        console.log("User info stored, navigating to home page");
        // Navigate to home page with replace to prevent going back to login
        window.location.href = "/";
      } else {
        console.error("Login failed: Invalid response format", response);
        setError("로그인에 실패했습니다. 응답 형식이 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "로그인 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <LoginWrapper>
      <Navigation title="로그인" />
      <Content>
        <TextField
          label="이메일"
          placeholder="이메일 주소를 입력하세요"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Content>
      <FloatingButton onClick={handleLogin}>로그인</FloatingButton>
    </LoginWrapper>
  );
};

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;

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
