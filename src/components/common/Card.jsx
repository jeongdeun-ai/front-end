import styled from "styled-components";

const Card = ({ children, ...props }) => {
  return <CardWrapper {...props}>{children}</CardWrapper>;
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 14px;
  background: var(--background-primary, #fff);

  /* 그림자 */
  box-shadow: 0px 10px 40px 0px rgba(29, 22, 23, 0.07);
`;
