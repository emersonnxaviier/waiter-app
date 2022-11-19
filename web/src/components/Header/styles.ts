import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  display: flex; // para os itens ficarem em linha
  justify-content: center;
  height: 150px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      color: #fff;
      font-size: 32px;
    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
    }
  }
`;
