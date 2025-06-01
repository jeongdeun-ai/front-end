import styled from 'styled-components';
import { Spinner } from './Spinner';

const Loading = ({ message = '로딩 중...' }) => {
  return (
    <LoadingContainer>
      <Spinner size="large" />
      <Message>{message}</Message>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
  width: 100%;
  padding: 2rem;
`;

const Message = styled.p`
  margin-top: 1rem;
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: center;
`;
