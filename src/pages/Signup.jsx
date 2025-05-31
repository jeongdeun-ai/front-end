// SignUp.jsx
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default Signup;
