import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  border-radius: 10px;
  padding: 4px 4px 4px 4px;
  width: 8rem;
`;

const Icon = styled.img`
  width: 1.8rem;
  margin: auto;
  margin-left: 10px;
`;

const ContainerText = styled.div`
`;

const Title = styled.h1`
  color: #212427;
  font-size: 0.7rem;
`;

const Text = styled.h1`
  color: #212427;
  font-size: 1.3rem;
`;

const Card = ({
  icon,
  state,
  title,
  unity,
}) => (
  <Container>
    <Icon src={icon} />
    <ContainerText>
      <Title>{title}</Title>
      <Text>
        {state}
        {unity}
      </Text>
    </ContainerText>
  </Container>
);

Card.propTypes = {
  icon: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  unity: PropTypes.string.isRequired,
};

export default Card;
