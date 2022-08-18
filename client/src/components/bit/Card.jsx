import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  background-image: ${(props) => props.bgImg};
  margin: 5px;
  border-radius: 10px;
  padding: 2px 4px 2px 4px;
`;

const Icon = styled.img`
  width: 2rem;
  margin: auto 0px 5px auto;
`;

const Text = styled.h1`
  color: #212427;
  font-size: 1.2rem;
`;

const Card = ({ icon, state, bgImg }) => (
  <Container bgImg={bgImg}>
    <Icon src={icon} />
    <Text>{state}</Text>
  </Container>
);

Card.propTypes = {
  icon: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  bgImg: PropTypes.string.isRequired,
};

export default Card;
