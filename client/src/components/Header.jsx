import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation, useNavigate } from 'react-router-dom';

const breakpoint = 900;

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.header`
  @media only screen and (min-width: 1500px) {
    width: 1500px;
    margin: auto;
  };
  @media only screen and (min-width: 900px) {
    display: flex;
    justify-content: space-between;
  };
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  };
`;

const ContainerLogoHamb = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const Hamburger = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  margin: auto;
  margin-right: 0;
  display: ${(props) => (props.width <= breakpoint ? null : 'none')};
`;

const Line = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: black;
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

const ElementList = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 900px) {
    display: ${(props) => (props.active ? 'flex' : 'none')};
    transition: ${(props) => (props.active ? '0.3s ease out' : 'none')};
    opacity: ${(props) => (props.active ? '1' : '0')};
    top: 0;
    flex-direction: column;
    text-align: center;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 0px;
  };
`;

const Element = styled.div`
  list-style: none;
  padding: 5px 20px 5px 20px;
  transition: 0;
  &:nth-child(1) {
    color: ${(props) => (props.current === '/Dashboard' ? '#000000' : '#696969')};
  }
  &:nth-child(2) {
    color: ${(props) => (props.current === '/Manager' ? '#000000' : '#696969')};
  }
  &:nth-child(3) {
    color: ${(props) => (props.current === '/History' ? '#000000' : '#696969')};
  }
`;

const ElementContent = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const handleClickDashBoard = () => {
    navigate('/Dashboard');
  };
  const handleClickManager = () => {
    navigate('/Manager');
  };
  const handleClickHistory = () => {
    navigate('/History');
  };

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
    <Wrapper>
      <Container>
        <ContainerLogoHamb>
          <Hamburger width={width} onClick={handleClick}>
            <Line id="1" menu={menu} />
            <Line id="2" menu={menu} />
            <Line id="3" menu={menu} />
          </Hamburger>
        </ContainerLogoHamb>
        <ElementList active={menu}>
          <Element id="1" current={path} onClick={handleClickDashBoard}>
            <ElementContent>Dashboard</ElementContent>
          </Element>
          <Element id="2" current={path} onClick={handleClickManager}>
            <ElementContent>Manager</ElementContent>
          </Element>
          <Element id="3" current={path} onClick={handleClickHistory}>
            <ElementContent>History</ElementContent>
          </Element>
        </ElementList>
      </Container>
    </Wrapper>
  );
};

export default Header;
