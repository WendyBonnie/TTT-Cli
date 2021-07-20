import React, { Component, useEffect, useState, useRef } from "react";

import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { MdInfoOutline as Info } from "react-icons/md";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import qs from "qs";
import axios from "axios";

import { useHistory } from "react-router-dom";

import "./TipCommun1.css";
import { Alert } from "bootstrap";

function Icon() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.0)",
          borderColor: "rgba(52, 52, 52, 0.0)",
        }}
        ref={target}
      >
        <Info style={{ color: "black" }} />
      </button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Popover id="popover-basic" {...props}>
            <Popover.Title as="h3" style={{ textAlign: "center" }}>
              Paiements sécurisés
            </Popover.Title>
            <Popover.Content style={{ textAlign: "left" }}>
              Tous les paiements effectués sur Tipourboire sont cryptés. <br />
              Ils sont gérés par MangoPay, notre partenaire de confiance.
              <br /> Leur technologie sécurisée nous permet d'être assurés que
              le montant reglé pour une transaction est bien envoyé et reçu par
              le(s) serveur(s).
            </Popover.Content>
          </Popover>
        )}
      </Overlay>
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  const history = useHistory();

  let amount = localStorage.getItem("amount");
  let dataMango = JSON.parse(localStorage.getItem("@data"));
  return (
    <Modal {...props} centered backdrop="static">
      <Modal.Header style={{ borderBlockColor: "#f5a624" }}>
        <img style={{ width: 150, height: 150 }} src="/logoTTT/icone.png" />
        <h3 style={{ marginTop: 20, textAlign: "center", color: "#f5a624" }}>
          Tipourboire le pourboire digital !
        </h3>
      </Modal.Header>

      <h3 style={{ textAlign: "center", marginTop: 25 }}>
        Récapitulatif du pourboire
      </h3>

      <Modal.Body>
        <p>
          Montant du pourboire: {amount} €
          <br />
          Protection Bonne Attribution: {amount * 0.016 + 0.1} €
          <Icon />
          <br />
          <p style={{ fontWeight: "bolder" }}>
            Total prélevé: {Number(amount) + (Number(amount) * 0.016 + 0.1)} €
          </p>
        </p>
      </Modal.Body>
      <Modal.Title id="contained-modal-title-center">
        <h3 style={{ textAlign: "center" }}>Information de facturation</h3>
      </Modal.Title>
      <Modal.Body>
        <p>
          <br />
          Prénom : {localStorage.getItem("@dataFirstName")}
          <br />
          Nom: {localStorage.getItem("@dataLastName")}
          <br />
          E-mail: {localStorage.getItem("@dataMail")}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ borderBlockColor: "#f5a624" }}>
        <Button
          className="buttonModalPayout"
          onClick={() => {
            axios({
              method: "post",
              url: dataMango.CardRegistrationURL,
              data: qs.stringify({
                cardRegistrationId: dataMango.Id,
                accessKeyRef: dataMango.AccessKey,
                data: dataMango.PreregistrationData,
                cardNumber: localStorage.getItem("cardNumber"),
                cardExpirationDate: localStorage.getItem("expDate"),
                cardCvx: localStorage.getItem("cvx"),
              }),
              headers: {
                "content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }).then((result) => {
              console.log(
                dataMango.Id,
                dataMango.AccessKey,
                dataMango.PreregistrationData,
                localStorage.getItem("cardNumber"),
                localStorage.getItem("expDate"),
                localStorage.getItem("cvx"),
                dataMango.Id,
                result.data
              );
              const headers = new Headers({
                "Content-Type": "application/json",
              });
              const data1 = {
                walletID: localStorage.getItem("walletID"),
                amount: Number(amount) + (Number(amount) * 0.016 + 0.1),
                cardRegistrationId: dataMango.Id,
                registrationData: result.data,
              };
              const options = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data1),
              };

              fetch(
                "https://back-end.osc-fr1.scalingo.io/client/payin",
                options
              )
                .then((response) => {
                  return response.json();
                })
                .then((result1) => {
                  if (result1.Type === "param_error") {
                    window.alert(
                      "Une erreur s'est produite, veuillez vérifier le format de votre date d'expiration MMAA : (ex : 0622)."
                    );
                  } else {
                    let r = window.confirm(
                      "Merci pour votre pourboire. À bientôt dans nos restaurants partenaires."
                    );

                    if (r == true) {
                      history.push("/Menu");
                    } else {
                      console.log("false");
                    }
                  }
                });
            });
          }}
          style={{ backgroundColor: "#f5a624", border: "none" }}
        >
          Payer
        </Button>
        <Button
          className="buttonModalPayout"
          style={{ backgroundColor: "#f5a624", border: "none" }}
          onClick={props.onHide}
        >
          Annuler
        </Button>
        <img className="imgMango" src="/logoTTT/mangoPay.png" />
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

  payin = () => {};
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
        localStorage.setItem("walletID", result);
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
                  placeholder="Date d'expiration format : MMAA"
                  onChange={this.handleInput}
                  className="marginInput"
                />
                <Form.Control
                  name="cardCvx"
                  type="text"
                  placeholder="CVC "
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
                if (this.state.amount <= 1) {
                  window.alert(
                    "Le montant minimum du tips doit être de 2 euros"
                  );
                } else {
                  this.setState({ modal: true });
                  localStorage.setItem("amount", this.state.amount);
                  localStorage.setItem("cardNumber", this.state.cardNumber);
                  localStorage.setItem("cvx", this.state.cardCvx);
                  localStorage.setItem(
                    "expDate",
                    this.state.cardExpirationDate
                  );

                  console.log("test", localStorage.getItem("amount"));
                }
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
