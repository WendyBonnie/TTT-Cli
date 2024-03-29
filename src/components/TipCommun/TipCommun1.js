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
  const hide = props.onHide;

  const [modal, setModal] = useState(false);

  let amount = localStorage.getItem("amount");
  let dataMango = JSON.parse(localStorage.getItem("@data"));

  const postInfoCard1 = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const data = {
      firstname: localStorage.getItem("@dataFirstName"),
      lastname: localStorage.getItem("@dataLastName"),
      email: localStorage.getItem("@dataMail"),
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
  };

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
                cardExpirationDate: localStorage
                  .getItem("expDate")
                  .replace(/[^a-zA-Z0-9]/g, ""),

                cardCvx: localStorage.getItem("cvx"),
              }),
              headers: {
                "content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }).then((result) => {
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
                "https://back-end.osc-fr1.scalingo.io/client/payin" +
                  window.location.search,
                options
              )
                .then((response) => {
                  return response.json();
                })
                .then((result1) => {
                  if (result1.Type === "param_error") {
                    console.log("test", result1);
                    window.alert(
                      "Une erreur s'est produite, veuillez réessayer"
                    );
                    localStorage.removeItem("cardNumber");
                    localStorage.removeItem("cvx");
                    localStorage.removeItem("expDate");
                    postInfoCard1();
                    hide();
                  } else {
                    window.confirm(
                      "Merci pour votre pourboire. À bientôt dans nos établissements partenaires."
                    );
                    history.push(
                      "/CommentairesReferent" + window.location.search
                    );
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
    let ccgRex = /^[0-9]{3,4}$/;
    var shortDateRex = /^(0?[1-9]|1[012])[\/\-]\d{2}$/;
    var cbRex =
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    return (
      <Container className="mainBlocCommun">
        <Row>
          <Col className="blocCommun" xs={12} s={12} md={12}>
            <p className="titleCommun">Paiement du pourboire</p>
            <h5 className="tipsMin">Le tips doit être de 1 euros minimum !</h5>
          </Col>
          <Col className="formCommun" xs={12} s={12} md={12}>
            <Form className="formCommun">
              <Form.Group className="formCommunGrp" controlId="formGroupAmount">
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder="Montant du Don Général"
                  onChange={this.handleInput}
                  className="inputPaymentTips"
                />
                <Form.Control
                  name="cardNumber"
                  type="text"
                  placeholder="Numéro de carte bleu"
                  onChange={this.handleInput}
                  className="inputPaymentTips"
                />
                <Row>
                  <Col>
                    <Form.Control
                      name="cardExpirationDate"
                      type="text"
                      placeholder="MM/AA"
                      onChange={this.handleInput}
                      className="inputPaymentTipsCol"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      name="cardCvx"
                      type="text"
                      placeholder="CVC "
                      onChange={this.handleInput}
                      className="inputPaymentTipsCol"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Col className="ButtonCol" xs={12} s={12} md={12}>
                <Button
                  className="communButtonVal"
                  onClick={() => {
                    console.log(
                      "test",
                      !this.state.cardNumber,
                      !this.state.cardExpirationDate,
                      !this.state.cardCvx
                    );
                    if (
                      !this.state.cardNumber ||
                      !this.state.cardExpirationDate ||
                      !this.state.cardCvx
                    ) {
                      console.log(
                        "Veuillez remplir tout les champs du formulaire."
                      );
                    } else if (
                      shortDateRex.test(this.state.cardExpirationDate) == false
                    ) {
                      alert(
                        "Une erreur s'est produite, veuillez vérifier le format de votre date d'expiration MM/AA : (ex : 06/22)."
                      );
                    } else if (ccgRex.test(this.state.cardCvx) == false) {
                      alert(
                        "Une erreur s'est produite, veuillez vérifier le format de votre CVX (Le numéro qui se trouve au dos de la carte bleue)."
                      );
                    } else if (cbRex.test(this.state.cardNumber) === false) {
                      alert(
                        "Une erreur s'est produite, veuillez rentrer votre bon numéro de carte bleue"
                      );
                    } else if (this.state.amount < 1 || !this.state.amount) {
                      alert("Le pourboire minimum est de 1 euro");
                    } else {
                      this.setState({ modal: true });
                      localStorage.setItem("amount", this.state.amount);
                      localStorage.setItem("cardNumber", this.state.cardNumber);
                      localStorage.setItem("cvx", this.state.cardCvx);
                      localStorage.setItem(
                        "expDate",
                        this.state.cardExpirationDate
                      );
                    }
                  }}
                >
                  Payer
                </Button>
                <img
                  className="imgMango bottomMango"
                  src="/logoTTT/mangoPay.png"
                />
              </Col>
            </Form>
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
