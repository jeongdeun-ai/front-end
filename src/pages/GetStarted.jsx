import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => navigate("/login")}>로그인</button>
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </div>
  );
};

export default GetStarted;
