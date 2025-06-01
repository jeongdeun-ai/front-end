import styled, { keyframes } from "styled-components";

const FloatingButton = ({
  children,
  onClick,
  type = "button",
  status = "default", // 'default' or 'loading'
}) => {
  return (
    <Wrapper>
      <Button
        type={type}
        onClick={onClick}
        disabled={status === "loading"}
        $isLoading={status === "loading"}
      >
        {status === "loading" ? <Spinner /> : children}
      </Button>
    </Wrapper>
  );
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
`;

export default FloatingButton;

const Wrapper = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: ${(props) =>
    props.$isLoading ? "var(--button-brand-disabled)" : "var(--button-brand)"};
  box-shadow: 0px 10px 40px 0px rgba(29, 22, 23, 0.21);
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
