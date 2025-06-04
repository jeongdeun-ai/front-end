import styled from "styled-components";
import { ClipLoader } from "react-spinners";

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
        {status === "loading" ? (
          <ClipLoader color="white" size={20} />
        ) : (
          <ButtonContent>{children}</ButtonContent>
        )}
      </Button>
    </Wrapper>
  );
};

export default FloatingButton;

const Wrapper = styled.div`
  padding: 20px;
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
  min-height: 56px; /* Fixed height to match both states */
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: var(--button-brand-hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px; /* Match the height of the spinner */
  line-height: 24px;
`;
