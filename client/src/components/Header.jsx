import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import logo from '../res/logo.svg';

const breakpoint = 900;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
  height: 5rem;
  @media only screen and (min-width: 1300px) {
    width: 1300px;
    margin: auto;
  }
`;

const Logo = styled.img`
  width: 4rem;
`;

const ElementList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 900px) {
    position: fixed;
    left: ${(props) => (props.active === true ? '0%' : '-100%')};
    top: 5rem;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow:
        0 10px 27px rgba(0, 0, 0, 0.05);
  };
`;

const Element = styled.li`
  list-style: none;
  @media only screen and (min-width: 900px) {
    margin-left: 3rem;
  }
  padding: 10px;
`;

const ElementContent = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  color: #475569;
  &:hover {
    color: #a43c3c;
    font-size: 1.8rem;
  }
`;

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  if (width > breakpoint && menu) {
    setMenu(!menu);
  }

  return (
    <Container>
      <Logo src={logo} />
      <ElementList active={menu}>
        <Element>
          <ElementContent href="\selection">Dashboard</ElementContent>
        </Element>
        <Element>
          <ElementContent href="\manager">Gestione</ElementContent>
        </Element>
        <Element>
          <ElementContent href="\history">Storico</ElementContent>
        </Element>
      </ElementList>
    </Container>
  );
};

export default Header;
