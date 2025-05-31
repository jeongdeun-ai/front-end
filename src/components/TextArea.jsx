import styled from "styled-components";
import { useState } from "react";

const TextArea = ({ label, placeholder, description, rows = 4, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper $focused={isFocused}>
        <StyledTextArea
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </InputWrapper>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  color: var(--text-secondary);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 142.9%;
  letter-spacing: 0.203px;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;

  border-radius: 8px;
  border: 1.5px solid
    ${({ $focused }) =>
      $focused ? "var(--line-brand)" : "var(--line-secondary)"};
  background-color: white;
  transition: border 0.2s ease;

  &:focus-within {
    border-color: var(--line-brand);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.091px;

  color: var(--text-primary);
  font-family: Pretendard;

  &::placeholder {
    color: var(--text-quaternary);
  }
`;

const Description = styled.span`
  font-size: 12px;
  font-family: Pretendard;
  color: var(--text-tertiary);
`;

export default TextArea;
