import React from 'react';
import styled from 'styled-components';
import { Burger } from './BurgerMenu';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const Navbar = () => {
  return (
    <Nav>
      <Burger />
    </Nav>
  );
};
