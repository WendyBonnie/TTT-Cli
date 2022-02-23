import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePageClient.css";

class HomePageClient extends Component {
  render() {
    return (
      <Container className="ContainerHome">
        <Row className="blocHome">
          <Col className="centerAll" xs={12} md={12}>
            <h1>Donner un pourboire</h1>
            <h2>sans créer de compte</h2>

            <Link to={"/ListeServeurs" + window.location.search}>
              <Button className="rowButton"> Je donne</Button>
            </Link>
          </Col>
          {/*  <Col xs={12} md={6}>
            <h1>Donner un Tip</h1>
            <h2>Avec compte client</h2>
            <p>Me connecter à mon espace Tipourboire</p>
            <Link to={"/" + window.location.search}>
              <Button className="rowButton">Donner un pourboire</Button>
            </Link>
    </Col>*/}
        </Row>
      </Container>
    );
  }
}

export default HomePageClient;
