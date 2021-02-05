import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import {
  Navbar,
  Nav,
  Row,
  Container,
  Col,
  Button,
  NavLink,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
//import Deconnexion from "../Deconnexion/Deconnexion";

class BarreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  connect = () => {
    if (localStorage.getItem("token") === null) {
      return (
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link className="navlink">
              <Link className="link" to="/Connexion">
                Se connecter
              </Link>
            </Nav.Link>
            <Nav.Link className="navlink">
              <Link className="link" to="/Inscription">
                S'inscrire
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link className="navlink">
              <Link className="link" to="/Profil">
                Gérer mon compte
              </Link>
            </Nav.Link>
            <Nav.Link className="navlink">
              <Link className="link" to="/Historique">
                Historique de pourboires
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
  };

  componentDidMount() {
    this.connect();
  }

  render() {
    return (
      <Container fluid>
        <Row className="partie1">
          <Dropdown className="nav justify-content-right">
            <Dropdown.Toggle alignRight variant="success" id="dropdown-basic">
              <img src="/logoTTT/user.png" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/Profil">Mon profil</Dropdown.Item>
              <Dropdown.Item href="/Home">Donner un pourboire</Dropdown.Item>
              <Dropdown.Item href="/Connexion">Connexion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Col className="logoPartie1" md={12}>
            <img src="/logoTTT/logoJaune.png" />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default BarreMenu;
