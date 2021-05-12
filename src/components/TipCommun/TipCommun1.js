import React, { Component } from "react";

import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import qs from "qs";
import axios from "axios";

import "./TipCommun1.css";
import { Alert } from "bootstrap";

function MyVerticallyCenteredModal(props) {
  let amount = localStorage.getItem("amount");
  let attribution = amount * 0.016;
  let total = amount + attribution + 0.1;
  return (
    <Modal {...props} centered backdrop="static">
      <Modal.Header>
        <img style={{ width: 150, height: 150 }} src="/logoTTT/icone.png" />
        <h3 style={{ marginTop: 50, textAlign: "center" }}>
          {" "}
          Tipourboire le pourboire digitale !
        </h3>
      </Modal.Header>

      <h3 style={{ textAlign: "center", marginTop: 25 }}>
        Récapitulatif du pourboire
      </h3>

      <Modal.Body>
        <p>
          Montant du pourboire: {amount} €
          <br />
          Protection Attribution du Pourboire : {amount * 0.016} €
          <br />
          Total : {amount + amount * 0.016} €
        </p>
      </Modal.Body>
      <Modal.Title id="contained-modal-title-center">
        <h3 style={{ textAlign: "center" }}>Adresse de facturation</h3>
      </Modal.Title>
      <Modal.Body>
        <p>
          Adresse
          <br />
          Arnaud Puaud
          <br />
          95 Corniche Fleurie
          <br />
          06200 Nice
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Payer</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class TipCommun1 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, resultat: {}, walletID: "", modal: false };
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
        if (result.Type === "param_error") {
          window.alert("Une erreur s'est produite, veuillez réessayer.");
        } else {
          this.setState({ walletID: result });
          window.alert(
            "Merci pour votre pourboire. A bientôt dans nos restaurants partenaires"
          );
        }
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
        this.setState({ message: result.message });
        console.log(result.ResultMessage);
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
                  className="marginInput"
                />
                <Form.Control
                  name="cardNumber"
                  type="text"
                  placeholder="Numéro de carte bleu"
                  onChange={this.handleInput}
                  className="marginInput"
                />
                <Form.Control
                  name="cardExpirationDate"
                  type="text"
                  placeholder="Date d'expiration"
                  onChange={this.handleInput}
                  className="marginInput"
                />
                <Form.Control
                  name="cardCvx"
                  type="text"
                  placeholder="CVX"
                  onChange={this.handleInput}
                  className="marginInput"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col className="ButtonCol" xs={12} s={12} md={12}>
            <Button
              className="communButtonVal"
              onClick={() => {
                this.setState({ modal: true });
                localStorage.setItem("amount", this.state.amount);
                console.log("test", localStorage.getItem("amount"));
              }}
            >
              Payer
            </Button>
          </Col>
          <MyVerticallyCenteredModal
            show={this.state.modal}
            onHide={() => this.setState({ modal: false })}
          />
        </Row>
      </Container>
    );
  }
}

export default TipCommun1;
