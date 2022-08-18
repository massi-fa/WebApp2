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

const Hamburger = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  display: ${(props) => (props.width <= breakpoint ? null : 'none')};
`;

const Line = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #212427;
  &:nth-child(1) {
    transform: ${(props) => (props.menu ? 'translateY(8px) rotate(45deg)' : 'none')};
  }
  &:nth-child(2) {
    opacity: ${(props) => (props.menu ? '0' : 'none')};
  }
  &:nth-child(3) {
    transform: ${(props) => (props.menu ? 'translateY(-8px) rotate(-45deg)' : 'none')};
  }
`;

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
  };

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
          <ElementContent>Home</ElementContent>
        </Element>
        <Element>
          <ElementContent>Stats</ElementContent>
        </Element>
        <Element>
          <ElementContent>Info</ElementContent>
        </Element>
      </ElementList>
      <Hamburger width={width} onClick={handleClick}>
        <Line id="1" menu={menu} />
        <Line id="2" menu={menu} />
        <Line id="3" menu={menu} />
      </Hamburger>
    </Container>
  );
};

export default Header;
