import styled, { css } from "styled-components";
export const Todos = styled.div`
  ${({ theme }) => css`
    background: #292929;
    border-radius: 30px;
    min-height: 334px;
    width: 346px;
    padding: 35px 42px 0 42px;
    font-family: ${theme.fonts.defaultFont};
    gap: 10px;
    display: flex;
    flex-direction: column;
  `}
`;

export const Create = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  margin: 1rem 0;
`;
