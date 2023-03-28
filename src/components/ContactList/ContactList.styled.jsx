import styled from 'styled-components';

export const ListOfContacts = styled.ul`
  font-size: 16px;
`;

export const ListItem = styled.li``;

export const ListItemButton = styled.button`
  margin-left: 15px;
  font-size: 16px;

  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, 'proxima nova', sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 5px 10px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  transition: all 250ms ease-in-out;

  :hover,
  :active {
    background-color: initial;
    background-position: 0 0;
    color: #ff4742;
  }

  :active {
    opacity: 0.5;
  }
`;
