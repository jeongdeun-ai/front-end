// SignUp.jsx
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Navigation title="회원가입" />
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default Signup;
