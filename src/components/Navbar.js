import React from "react";
import "./Navbar.css";
import loginImg from "./logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);

  return (
    <Navbar className="navbar">
      <Navbar.Collapse className="basic-navbar-nav">
        <Nav className="nav">
          <div className="image">
            <img src={loginImg} className="image" />{" "}
          </div>
          <a href="/">Kezdőlap</a>
          <a href="/FaceCounter"> Jelenlét ellenőrzés </a>
          <a href="/Tables">Jelenlét kimutatás</a>
        </Nav>
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
