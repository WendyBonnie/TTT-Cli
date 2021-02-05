import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../assets/components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_test_51HAxRlHoh2Vgz5QdMpHXhINQMDhyGPR4gFvzs9vVzocySBI4WCfw8oPa7De6PC2ZJZlQKVQFRDPLU7FIGmXZC0QA00XGutN1eU"
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
