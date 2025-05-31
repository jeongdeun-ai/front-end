// components/common/FloatingButton.jsx
import styled from "styled-components";

const FloatingButton = ({ children, onClick, type = "button" }) => {
  return (
    <Wrapper>
      <Button type={type} onClick={onClick}>
        {children}
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
  background: var(--button-brand);
  box-shadow: 0px 10px 40px 0px rgba(29, 22, 23, 0.21);

  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  line-height: 150%;
  letter-spacing: 0.091px;

  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: var(--button-brand-hover);
  }
`;
