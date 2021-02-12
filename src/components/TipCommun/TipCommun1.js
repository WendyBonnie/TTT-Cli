import React, { Component } from "react";

import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import qs from "qs";
import axios from "axios";

import "./TipCommun1.css";
import { Alert } from "bootstrap";

class TipCommun1 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, resultat: {}, walletID: "" };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  postToken = () => {
    if (this.state.amount <= 1) {
      window.alert("Le montant minimum du tips doit être de 2 euros");
    } else {
      axios({
        method: "post",
        url: this.state.data.CardRegistrationURL,
        data: qs.stringify({
          cardRegistrationId: this.state.data.Id,
          accessKeyRef: this.state.data.AccessKey,
          data: this.state.data.PreregistrationData,
          cardNumber: this.state.cardNumber,
          cardExpirationDate: this.state.cardExpirationDate,
          cardCvx: this.state.cardCvx,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((result) => {
        this.setState({ resultat: result });

        this.payin();
      });
    }
  };
  payin = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const data1 = {
      walletID: this.state.walletID,
      amount: this.state.amount,
      cardRegistrationId: this.state.data.Id,
      registrationData: this.state.resultat.data,
    };
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data1),
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/payin", options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({ walletID: result });
        console.log(result);
      });
  };
  getWalletId = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const data1 = {
      _id: localStorage.getItem("@idRestaurant"),
    };
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data1),
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/getWalletId", options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({ walletID: result });
        console.log(result);
      });
  };

  componentDidMount() {
    this.getWalletId();
    console.log("JSON");
    this.setState({ data: JSON.parse(localStorage.getItem("@data")) });
    console.log(JSON.parse(localStorage.getItem("@data")));
  }
  render() {
    return (
      <Container className="mainBlocCommun">
        <Row>
          <Col className="blocCommun" xs={12} s={12} md={12}>
            <p className="titleCommun">Paiement du pourboire</p>
            <h5 className="tipsMin">Le tips doit être de 2 euros minimum !</h5>
          </Col>
          <Col className="formCommun" xs={12} s={12} md={12}>
            <Form className="formCommun">
              <Form.Group className="formCommunGrp" controlId="formGroupAmount">
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder="Montant du Don Général"
                  onChange={this.handleInput}
                />
                <Form.Control
                  name="cardNumber"
                  type="text"
                  placeholder="Numéro de carte bleu"
                  onChange={this.handleInput}
                />
                <Form.Control
                  name="cardExpirationDate"
                  type="text"
                  placeholder="Date d'expiration"
                  onChange={this.handleInput}
                />
                <Form.Control
                  name="cardCvx"
                  type="text"
                  placeholder="CVX"
                  onChange={this.handleInput}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col className="ButtonCol" xs={12} s={12} md={12}>
            <Button className="communButton" onClick={this.postToken}>
              Payer
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TipCommun1;
