import styled, { css } from "styled-components";
export const Todo = styled.div`
  font-size: 18px;
  display: flex;
  background: #292929;
  color: white;
  width: 251px;
  gap: 4px;

  align-content: center;
  align-items: center;

  input[type="checkbox"]:checked + label > input {
    text-decoration: line-through;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  width: 171px;
  overflow: hidden;
  input[type="text"] {
    background: none;
    outline: none;
    border: none;
  }
`;
export const Delete = styled.button`
  height: auto;
  outline: none;
  background: none;
  border: none;
`;
