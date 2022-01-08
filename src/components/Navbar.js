import React from "react";
import "./Navbar.css";
import loginImg from "./logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Navigation = (props) => {
  console.log(props);

  const removeToken = async () => {
   localStorage.removeItem("state")
   window.location.reload();
  };
  
if(localStorage.getItem("state") !== null){
  return (
    
    <Navbar className="navbar">
      <Navbar.Collapse className="basic-navbar-nav">
        <Nav className="nav">
          <div className="image">
            <img src={loginImg} className="image" />{" "}
          </div>
          <a href="/FaceCounter"> Jelenlét ellenőrzés </a>
          <a href="/Tables">Jelenlét kimutatás</a>
          <Button 
          onClick={removeToken}>Kijelentkezés</Button>
        </Nav>
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );}else{
    return (
    
      <Navbar className="navbar">
        <Navbar.Collapse className="basic-navbar-nav">
          <Nav className="nav">
            <div className="image">
              <img src={loginImg} className="image" />{" "}
            </div>
            <a href="/">Bejelentkezés</a>
          
            
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
     ) }
};

export default withRouter(Navigation);
