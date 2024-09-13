import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 24px;
`;
export const StyledContainer = styled.div`
  margin: 16px;
`;

export const TableContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid #e0e5eb;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: #f8f9fa;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5e6674;
    border-radius: 12px;
  }
`;
export const StyledTable = styled.table`
  margin: 0px;
  width: 100%;

  & td:first-child,
  th:first-child {
    text-align: center;
  }
  & th {
    text-align: start;
    background-color: #f0f3f7;
    font-size: 13px;
    font-weight: 500;
    color: #697180;
    padding: 7px;
    position: sticky;
    top: 0;
  }
  & tr {
    border-bottom: 1px solid ##ffffff;
    & button {
      visibility: hidden;
      margin-left: auto;
      background-color: #fee3e3;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: none;
      padding: 10px, 12px, 10px, 12px;
    }
  }

  & tr:hover {
    background-color: #e9e9e9;
    & button {
      cursor: pointer;
      visibility: visible;
    }
  }

  & td:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & td {
    padding: 7px;
    font-size: 14px;
    font-weight: 400;
    color: #1d2432;
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  & button {
    background-color: #ffffff;
    margin: 3px;
    cursor: pointer;
    padding: 8px, 12px, 8px, 12px;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #ced5de;
  }

  & button.active {
    background-color: #f2f5f8;
    color: black;
  }

  & button:hover {
    background-color: #e0e0e0;
  }
`;
