import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { Container, Content, AnimationContainer, Background } from './styles';
import logo from '../../assets/logo.png';

const SignUp = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await api.post('/users', { email, password, name });
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no WebPet!',
        });
      } catch (err) {
        addToast({
          type: 'success',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history, email, password, name]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Dogmon" />

          <form onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Cadastrar</button>
          </form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
