import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const FloatingButton = ({
  children,
  onClick,
  type = "button",
  status = "default", // 'default' or 'loading'
}) => {
  console.log("FloatingButton.jsx: received status =", status);
  return (
    <Wrapper>
      <Button
        type={type}
        onClick={onClick}
        disabled={status === "loading"}
        $isLoading={status === "loading"}
      >
        {status === "loading" ? (
          <SpinnerContainer>
            <ClipLoader color="white" size={20} />
          </SpinnerContainer>
        ) : (
          children
        )}
      </Button>
    </Wrapper>
  );
};

export default FloatingButton;

const Wrapper = styled.div`
  padding: 20px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 10px 40px 0px rgba(29, 22, 23, 0.21);
  background: var(--button-brand);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: 150%;
  letter-spacing: 0.091px;

  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: var(--button-brand-hover);
  }
`;
