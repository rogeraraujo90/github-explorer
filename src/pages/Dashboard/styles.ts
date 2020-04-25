import styled from 'styled-components';
import { shade } from 'polished';

const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;
`;

const Form = styled.form`
  display: flex;
  margin-top: 40px;
  max-width: 700px;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    color: #fff;
    font-weight: bold;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

const Repositories = styled.div`
  margin-top: 80px;
  width: 700px;

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

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
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

export { Title, Form, Repositories };
