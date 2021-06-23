import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { Component } from "react";
import "./connexion.css";
import { Link } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginClient = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/login", options)
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          this.setState({ message: responseObject.message });

          if (responseObject.token) {
            localStorage.setItem("token", responseObject.token);
            localStorage.setItem("userID", responseObject.userId);
            this.props.setLogin(true);
            this.props.history.push("/Profil");
          }
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="connexion-container">
        <CookieConsent
          location="top"
          buttonText="J'accepte"
          declineButtonText="Je refuse"
          expires={30}
          enableDeclineButton
          onDecline={() => {
            alert(
              "Le refus de nos cookies vous permets tout de même une bonne navigation sur notre site. A bientot :)"
            );
          }}
          cookieName="Tipourboire"
          style={{ background: "#ffffff", color: "#555" }}
          declineButtonStyle={{
            borderRadius: 12,
            padding: 8,
            color: "#fff",
            fontSize: "18px",
            background: "#f5a624",
            fontWeight: "bold",
          }}
          buttonStyle={{
            borderRadius: 12,
            padding: 8,
            color: "#fff",
            fontSize: "18px",
            background: "#f5a624",
            fontWeight: "bold",
          }}
          style={{
            fontSize: "20px",
            fontfamily: "Montserrat",
            fontWeight: "bold",
          }}
        >
          Le Site Tipourboire utilise différents cookies afin d’améliorer ses
          services et effectuer des suivis d’audience. Certains cookies sont
          indispensables au fonctionnement du Site. Vous pouvez accepter ces
          cookies, les refuser, ou gérer vos préférences. Vous pouvez consulter
          notre{" "}
          <a
            href="/cookies/POLITIQUE_DE_COOKIES.pdf"
            target="_blank"
            style={{
              fontSize: "20px",
              fontfamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Politique de cookies
          </a>
        </CookieConsent>
        <Row>
          <Col>
            <h1>Déja membre ? </h1>
            <h1>Connectez-vous !</h1>
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            name="email"
            type="email"
            ClassName="formMail"
            placeholder="Votre e-mail"
            id="email"
            onChange={this.change}
            value={this.state.email}
          />
          <Form.Control
            name="password"
            type="password"
            ClassName="formMail"
            placeholder="Votre mot de passe"
            id="password"
            onChange={this.change}
            value={this.state.password}
          />
        </Form.Group>
        <Col className="colMdp" xs={12} md={12}>
          <Link className="forgetpwd" to="/passwordReset">
            <p>Mot de passe oublié ?</p>
          </Link>
        </Col>
        <Col md={12} className="blocCompte">
          <Button className="connectButton" onClick={this.loginClient}>
            Se connecter
          </Button>
          <p>{this.state.message}</p>
        </Col>
        <Col className="alignRight">
          <Form.Label className="text2">
            Pas encore membre ?{" "}
            <Link className="creerCompte" to="/Inscription">
              Créer mon compte
            </Link>
          </Form.Label>
        </Col>
      </Container>
    );
  }
}
export default Connexion;
