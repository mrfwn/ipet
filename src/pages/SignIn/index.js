import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import logo from '../../assets/logo.png';

import { Container, Content, AnimationContainer, Background } from './styles';

const SignIn = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await signIn({ email, password });
        history.push('/');
      } catch (err) {
        addToast({
          type: 'success',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history, email, password]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Dogmon" />

          <form onSubmit={handleSubmit}>
            <h1>Faça seu Login</h1>
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
