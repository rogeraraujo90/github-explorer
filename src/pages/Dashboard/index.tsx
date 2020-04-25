import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [inputValue, updateInputValue] = useState('');
  const [repositories, updateRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );

    return storedRepositories ? JSON.parse(storedRepositories) : [];
  });
  const [inputError, updateInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function newRepositoryAdded(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!inputValue) {
      updateInputError('Digite autor/nome do repositório.');
      return;
    }

    try {
      const repositoryResponse = await api.get<Repository>(
        `/repos/${inputValue}`
      );

      const newRepository = repositoryResponse.data;

      updateRepositories([...repositories, newRepository]);
      updateInputValue('');
      updateInputError('');
    } catch {
      updateInputError('Erro na busca do repositório.');
    }
  }

  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <Title>Explore Repostórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={newRepositoryAdded}>
        <input
          value={inputValue}
          onChange={(event) => updateInputValue(event.target.value)}
          placeholder="Digite o nome do repositório."
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
