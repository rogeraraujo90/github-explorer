import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
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
  const [repositories, updateRepositories] = useState<Repository[]>([]);

  async function newRepositoryAdded(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const repositoryResponse = await api.get<Repository>(
      `/repos/${inputValue}`
    );

    const newRepository = repositoryResponse.data;

    updateRepositories([...repositories, newRepository]);
    updateInputValue('');
  }

  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <Title>Explore Repostórios no Github</Title>

      <Form onSubmit={newRepositoryAdded}>
        <input
          value={inputValue}
          onChange={(event) => updateInputValue(event.target.value)}
          placeholder="Digite o nome do repositório."
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a
            key={repository.full_name}
            href="https://github.com/rogeraraujo90/bethehero"
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
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
