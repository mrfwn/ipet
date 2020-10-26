import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

import { Container, Content, AnimationContainer, Background } from './styles';

const SignIn = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <div>
            <a href="/auth/google">
              <FcGoogle size={36} />
            </a>

            <a href="/auth/facebook">
              <FaFacebook size={36} />
            </a>

            <a href="/auth/instagram">
              <FaInstagram size={36} />
            </a>
          </div>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
