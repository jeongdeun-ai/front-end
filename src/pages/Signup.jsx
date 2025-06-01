import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import FloatingButton from "../components/FloatingButton";
import styled from "styled-components";
import TextField from "../components/TextField";
import { signup } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    relation_type: "",
    ai_name_called: "정든이",
    parent_name: "",
    parent_birth_date: "",
    parent_sex: "",
    parent_address: "",
    parent_disease_info: "",
    parent_medication_info: "",
    parent_additional_notes: "",
    parent_photo: null,
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    try {
      const formDataToSend = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await signup(formDataToSend);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    }
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
            value={formData.email}
            onChange={handleChange("email")}
          />
          <TextField
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            description="로그인에 사용되는 비밀번호입니다."
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
          />
          <TextField
            label="보호자 이름"
            placeholder="보호자 이름을 입력하세요"
            description="보호자 이름을 입력해주세요."
            type="text"
            value={formData.username}
            onChange={handleChange("username")}
          />
          <TextField
            label="보호자 연락처"
            placeholder="보호자 연락처를 입력하세요"
            description="보호자 연락처를 입력해주세요."
            type="tel"
            value={formData.phone_number}
            onChange={handleChange("phone_number")}
          />
          <TextField
            label="보호자와 어르신과의 관계"
            placeholder="보호자와 어르신과의 관계를 입력하세요"
            description="보호자와 어르신과의 관계를 입력해주세요."
            type="text"
            value={formData.relation_type}
            onChange={handleChange("relation_type")}
          />
        </Content>
        <Content>
          <Title>어르신 정보</Title>
          <TextField
            label="이름"
            placeholder="이름을 입력하세요"
            description="어르신 이름을 입력해주세요."
            type="text"
            value={formData.parent_name}
            onChange={handleChange("parent_name")}
          />
          <TextField
            label="성별"
            placeholder="성별을 입력하세요 (M 또는 F)"
            description="어르신 성별을 입력해주세요."
            type="text"
            value={formData.parent_sex}
            onChange={handleChange("parent_sex")}
          />
          <TextField
            label="생년월일"
            placeholder="생년월일을 입력하세요"
            description="어르신 생년월일을 입력해주세요."
            type="date"
            value={formData.parent_birth_date}
            onChange={handleChange("parent_birth_date")}
          />
          <TextField
            label="주소"
            placeholder="주소를 입력하세요"
            description="어르신 주소를 입력해주세요."
            type="text"
            value={formData.parent_address}
            onChange={handleChange("parent_address")}
          />
          <TextField
            label="주요 질환 정보"
            placeholder="주요 질환 정보를 입력하세요"
            description="어르신의 주요 질환 정보를 입력해주세요."
            type="text"
            value={formData.parent_disease_info}
            onChange={handleChange("parent_disease_info")}
          />
          <TextField
            label="복용 중인 약"
            placeholder="복용 중인 약을 입력하세요"
            description="어르신이 복용 중인 약을 입력해주세요."
            type="text"
            value={formData.parent_medication_info}
            onChange={handleChange("parent_medication_info")}
          />
          <TextField
            label="기타 참고사항"
            placeholder="기타 참고사항을 입력하세요"
            description="어르신에 대한 기타 참고사항을 입력해주세요."
            type="text"
            value={formData.parent_additional_notes}
            onChange={handleChange("parent_additional_notes")}
          />
          <FileInput>
            <label htmlFor="parent_photo">어르신 사진</label>
            <input
              type="file"
              id="parent_photo"
              accept="image/*"
              onChange={handleChange("parent_photo")}
            />
          </FileInput>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Content>
      </Contents>
      <FloatingButton onClick={handleSignUp}>가입하기</FloatingButton>
    </SignupWrapper>
  );
};

export default Signup;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const FileInput = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

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
