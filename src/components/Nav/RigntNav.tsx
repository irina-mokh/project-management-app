import { LangSwitcher } from 'components/LangSwitcher';
import { ThemeSwitcher1 } from 'components/ThemeSwitcher';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { CreateBoardModal } from 'components/Modals';

const Ul = styled.div<{ open: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  right: 10px;
  top: 15px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    gap: 10px;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 4rem;
    padding-right: 10px;
    padding-left: 10px;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export const RightNav = (props: { open: boolean }) => {
  const ref = useRef(null);
  return (
    <Ul ref={ref} open={props.open}>
      <LangSwitcher />
      <ThemeSwitcher1 />
      <CreateBoardModal />
    </Ul>
  );
};
