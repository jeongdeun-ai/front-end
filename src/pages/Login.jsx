import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Navigation title="로그인" />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
