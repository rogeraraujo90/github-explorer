import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repositoryName: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const {
    params: { repositoryName },
  } = useRouteMatch<RepositoryParams>();
  const [repository, updateRepository] = useState<Repository | null>(null);
  const [issues, updateIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function loadRepositoryData(): Promise<void> {
      const getRepoInfoPromise = api.get(`repos/${repositoryName}`);
      const getRepoIssuesPromise = api.get(`repos/${repositoryName}/issues`);

      const [
        { data: repositoryInfo },
        { data: issuesInfo },
      ] = await Promise.all([getRepoInfoPromise, getRepoIssuesPromise]);

      updateRepository(repositoryInfo);
      updateIssues(issuesInfo);
    }

    loadRepositoryData();
  }, [repositoryName]);

  return (
    <>
      <Header>
        <img src={logoImage} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} /> Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <p>Starts</p>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <p>Forks</p>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <p>Issues Abertas</p>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
