import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }
  }

  svg {
    margin-right: 4px;
  }
`;

const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  div {
    margin-left: 24px;

    strong {
      font-size: 36px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #737380;
      margin-top: 4px;
    }
  }

  ul {
    margin-top: 40px;
    display: flex;
    align-items: center;
    list-style: none;
  }

  li {
    strong {
      display: block;
      font-size: 36px;
      color: #3d3d4d;
    }

    & + li {
      margin-left: 80px;
    }

    p {
      display: block;
      margin-top: 4px;
      color: #6c6c80;
    }
  }
`;

const Issues = styled.div`
  margin-top: 80px;

  a {
    display: flex;
    align-items: center;

    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;

    & + a {
      margin-top: 16px;
    }

    div {
      flex: 1;
      margin-left: 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin: 0 16px;
      color: #cbcbd6;
    }

    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }
  }
`;

export { Header, RepositoryInfo, Issues };
