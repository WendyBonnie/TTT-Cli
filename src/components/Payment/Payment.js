import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_live_51HAxRlHoh2Vgz5Qdxu3AGz9GC1q2B453vaXplDn3J0Q5wXRCZqwkuoCG5O1Nsr1VsbNIHmjVWj7XJo9cZmljPw7L00wQbxBO6Y"
);

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = { _id: "" };
  }

  Nocompte = () => {
    return (
      <Row>
        <Col>
          <p>Tipourboire ne collecte aucune information</p>
          <p>
            <Link to={"https://stripe.com/payment-terms/legal"}>
              CGU Stripe
            </Link>
          </p>
        </Col>
      </Row>
    );
  };

  componentDidMount() {
    /* if (!this.props.serveurId) {
      this.props.history.push("/home");
    }*/
  }

  componentDidMount() {
    /* if (!this.props.serveurId) {
      this.props.history.push("/home");
    }*/
  }

  render() {
    return (
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    );
  }
}

export default Payment;
