import React, { Component } from "react";

import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./TipCommun.css";

class TipCommun extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  postInfoCard = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
    };
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/TipUser", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("@data", JSON.stringify(data));
      });
    this.props.history.push("/TipCommun1");
  };
  componentDidMount() {}
  render() {
    return (
      <Container className="mainBlocCommun">
        <Row>
          <Col className="blocCommun"xs={12} s={12} md={12}>
         
        <p className="titleCommun">
          Information client
        </p>
        </Col>
        <Col className="formCommun" xs={12} s={12} md={12}>
        <Form className="formCommun">
          <Form.Group className="formCommunGrp" controlId="formGroupAmount">
            <Form.Control className="formMail"
              name="email"
              type="text"
              placeholder="E-Mail"
              onChange={this.handleInput}
              value={this.state.email}
            />
            <Form.Control
              name="lastname"
              type="text"
              placeholder="Nom"
              onChange={this.handleInput}
              value={this.state.lastname}
            />
            <Form.Control
              name="firstname"
              type="text"
              placeholder="Prénom"
              onChange={this.handleInput}
              value={this.state.firstname}
            />
          </Form.Group>
          </Form>
          </Col>
          <Col className="ButtonCol" xs={12} s={12} md={12}>
          <Button className="communButton" onClick={this.postInfoCard}>
            Continuer vers la page de paiement
          </Button>
          </Col>
        
      
      </Row>
      </Container>
     
    );
  }
}

export default TipCommun;
