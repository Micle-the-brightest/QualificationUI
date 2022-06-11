import React from "react";
import {Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import s from './header.module.css';

const AppHeader = () =>{
    return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home"> University Management System: гуртожитки</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink className={s.item} to="/" >Гуртожитки </NavLink>
                <NavLink className={s.item} to="/roomTypes">Типи кімнат</NavLink>
                <NavLink className={s.item} to="/roomList">Заселити студента</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppHeader;