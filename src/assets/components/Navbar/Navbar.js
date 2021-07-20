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
    if (this.props.login) {
      return (
        <Dropdown className="nav justify-content-right">
          <Dropdown.Toggle alignRight variant="success" id="dropdown-basic">
            <img src="/logoTTT/user.png" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={"/Profil" + window.location.search}>
              Mon profil
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                window.confirm("Voulez vous vous déconnecter ?");
                localStorage.clear();
                this.props.setLogin(false);
                this.props.history.push("/");
              }}
              href="/"
            >
              Deconnexion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown className="nav justify-content-right">
          <Dropdown.Toggle alignRight variant="success" id="dropdown-basic">
            <img src="/logoTTT/user.png" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/">Connexion</Dropdown.Item>
            <Dropdown.Item href="/Inscription">Inscription</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  componentDidMount() {
    this.connect();
    console.log("............", this.props.login);
  }

  render() {
    return (
      <Container fluid>
        <Row className="partie1">
          {this.connect()}
          <Col className="logoPartie1" md={12}>
            <img src="/logoTTT/logoJaune.png" />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default BarreMenu;
