import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';

export const Logo = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 5px;
  height: 100%;
  cursor: pointer;
  margin-left: 0px;
`;

export const Nav = styled.nav`
  background: #22443d;
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Logo)`
  padding: 0;
  margin: 0 1rem;
  color: #fff;

  &:hover {
    color: #e8d4dd;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 978px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 978px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -20px;

  @media screen and (max-width: 978px) {
    display: none;
  }
`;

export const NavBtnLink = styled.a`
  border-radius: 7px; 
  background: ${({ inv }) => (inv ? '#fff': '#e6c7cf')};
  padding: 10px 22px;
  color: ${({ inv }) => (inv ? '#15cdfc': '#3a5331')};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ inv }) => (inv ? '#15cdfc': '#fff')};
    color: #3a5331;
  }
`;