import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ReactDOM from "react-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "./checkoutForm.css";

const stripePromise = loadStripe(
  "pk_test_51HAxRlHoh2Vgz5QdMpHXhINQMDhyGPR4gFvzs9vVzocySBI4WCfw8oPa7De6PC2ZJZlQKVQFRDPLU7FIGmXZC0QA00XGutN1eU"
);

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      client: {},
    };
  }
  postDataClient = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });
    const data = {
      /*on appel l'userId dans le body en le recuperant du localstorage */
      userId: localStorage.getItem("userId"),
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/getDataClient", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const clientInfo = responseObject;
          this.setState({ client: clientInfo, object: clientInfo });
        },

        (error) => {
          console.log(error);
        }
      );
  };
  app = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1HlxlYHoh2Vgz5QdLB8yIwWQ", // Replace with the ID of your price
          quantity: 10,
        },
      ],

      mode: "payment",
      successUrl:
        "https://back-end.osc-fr1.scalingo.io/client/transfert?qte=" +
        10 +
        "&mail=" +
        this.state.client.email +
        "&RN=" +
        localStorage.getItem("restaurantName"),
      cancelUrl: "https://client.tipourboire.com/ListeServeurs",
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  app1 = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1HlxlYHoh2Vgz5QdLB8yIwWQ", // Replace with the ID of your price
          quantity: 2,
        },
      ],
      mode: "payment",

      successUrl:
        "https://back-end.osc-fr1.scalingo.io/client/transfert?qte=" +
        2 +
        "&mail=" +
        this.state.client.email +
        "&RN=" +
        localStorage.getItem("restaurantName"),
      cancelUrl: "https://client.tipourboire.com/ListeServeurs",
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  app2 = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1HlxlYHoh2Vgz5QdLB8yIwWQ", // Replace with the ID of your price
          quantity: 5,
        },
      ],

      mode: "payment",
      successUrl:
        "https://back-end.osc-fr1.scalingo.io/client/transfert?qte=" +
        5 +
        "&mail=" +
        this.state.client.email +
        "&RN=" +
        localStorage.getItem("restaurantName"),
      cancelUrl: "https://client.tipourboire.com/ListeServeurs",
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  appChoice = async (event) => {
    if (this.state.amount <= 1) {
      window.alert("Le montant minimum du tips doit être de 2 euros");

      return;
    } else {
      // When the customer clicks on the button, redirect them to Checkout.
      const stripe = await stripePromise;
      let amount = this.state.amount;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1HlxlYHoh2Vgz5QdLB8yIwWQ", // Replace with the ID of your price
            quantity: Number(amount),
          },
        ],
        mode: "payment",

        successUrl:
          "https://back-end.osc-fr1.scalingo.io/client/transfert?qte=" +
          amount +
          "&mail=" +
          this.state.client.email +
          "&RN=" +
          localStorage.getItem("restaurantName"),
        cancelUrl: "https://client.tipourboire.com/ListeServeurs",
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    }
  };
  change = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentDidMount() {
    this.postDataClient();
  }
  render() {
    return (
      <Container className="check">
        <div className="blocTips">
          <div className="allButton">
            <h1 className="titleTips">Don Tipourboire</h1>
            <Row className="RowPourboire">
              <Col>
                <Button className="tipButton1" onClick={this.app1}>
                  2 €
                </Button>
              </Col>
              <Col>
                <Button className="tipButton2" onClick={this.app2}>
                  5 €
                </Button>
              </Col>
              <Col>
                <Button className="tipButton3" onClick={this.app}>
                  10 €
                </Button>
              </Col>
            </Row>
          </div>
          <h1 className="amount">Don libre</h1>
          <Row>
            <Col xs={12} s={12} md={12}>
              <Form>
                <Form.Group controlId="formGroupAmount">
                  <Form.Control
                    name="amount"
                    type="number"
                    placeholder="Montant"
                    onChange={this.change}
                    value={this.state.amount}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <p className="amountMsg">
            (Veuillez saisir uniquement des chiffres entiers)
          </p>
          <Button
            className="validAmount"
            variant="primary"
            type="submit"
            onClick={this.appChoice}
          >
            Valider
          </Button>
        </div>
      </Container>
    );
  }
}

export default CheckoutForm;
