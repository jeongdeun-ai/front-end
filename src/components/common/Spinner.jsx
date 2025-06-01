import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = ({ size = "medium", color = "var(--primary)" }) => {
  const sizes = {
    small: "20px",
    medium: "40px",
    large: "60px",
  };

  return (
    <SpinnerContainer $size={sizes[size] || sizes.medium} $color={color}>
      <div></div>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => `calc(${props.$size} * 0.8)`};
    height: ${(props) => `calc(${props.$size} * 0.8)`};
    margin: ${(props) => `calc(${props.$size} * 0.1)`};
    border: ${(props) => `calc(${props.$size} * 0.1)`} solid
      ${(props) => props.$color};
    border-radius: 50%;
    animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.$color} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
