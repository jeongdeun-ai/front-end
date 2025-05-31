import React from "react";
import styled from "styled-components";

/**
 * @description
 *
 * @param {string} title - 모달 상단의 굵은 제목 텍스트
 * @param {string} description - 설명 텍스트
 * @param {string} confirmText - 확인 버튼에 들어갈 텍스트
 * @param {string} cancelText - 취소 버튼에 들어갈 텍스트
 * @param {function} onConfirm - 확인 버튼 클릭 시 호출되는 함수
 * @param {function} onCancel - 취소 버튼 클릭 시 호출되는 함수
 */

const ConfirmModal = ({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <Information>
          <p>{title}</p>
          <p>{description}</p>
        </Information>
        <Actions>
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </Actions>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(23, 23, 25, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 32rem;
  background: var(--background-primary);
  border-radius: 1.2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2rem;

  p:first-child {
    color: var(--text-primary);
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 150%;
  }

  p:last-child {
    color: var(--text-tertiary);
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 150%;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
  padding: 0 2rem 1.2rem;

  button {
    padding: 0.4rem 0;
    border: none;
    background: none;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 142.9%;
    cursor: pointer;
  }

  button:first-child {
    color: var(--text-tertiary);
  }

  button:last-child {
    color: var(--text-brand);
  }
`;

export default ConfirmModal;
