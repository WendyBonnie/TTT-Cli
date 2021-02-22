import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { Component } from "react";
import "./connexion.css";
import { Link } from "react-router-dom";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  change = (event) => {
    this.setState({
      [event.target.id]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
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
          console.log('ok')
          this.setState({ message: responseObject.message });
          if (responseObject.token && responseObject.userId) {
            /*stocker le token et l'userId dans le localStorage pour pouvoir les rappeler une fois la connection reussie */
            localStorage.setItem("token", responseObject.token);
            localStorage.setItem("userID", responseObject.userId);
            /*permet d'allez vers la page profil APRES avoir valider la connexion (et pouvoir recuperer le localstorage aussi)*/
            this.props.history.push("/ListeServeurs");
          }
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="connexion">
        <Row className="blocprincipalClient">
          <Col xs={12} s={12} md={6} lg={6} className='formConnexion'>
          <Form className="formConnexion">
            <Form.Label className="text">
              Déjà membre? 
            </Form.Label>
            <Form.Label className="text">
             Connectez-vous !
            </Form.Label>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Votre e-mail"
                id="email"
                onChange={this.change}
                value={this.state.email}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group
              className="passwordConnexion"
              controlId="formBasicPassword"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder="Mot de passe"
                id="password"
                onChange={this.change}
                value={this.state.password}
              />
            </Form.Group>
            
            <Col className='colMdp' xs={12} md={9}>
            <Link className="forgetpwd" to="/passwordReset">
             
                <p>Mot de passe oublié ?</p>
           
            </Link>
            <p className='politique'>J'ai lu et j'accepte <Link>la politique de confidentialité.</Link></p>
           
            </Col>
          
           
            <Col md={9} className='blocCompte'>
            <Button 
              className="connectButton"
              
              onClick={this.loginClient.bind(this)}
            >
              Se connecter
            </Button>
            <p>{this.state.message}</p>
            <Form.Group>
              <Form.Label className="text2">Pas encore membre ?</Form.Label>
            </Form.Group>
            <Link className="creerCompte" to="/Inscription">
              Créer mon compte
            </Link>
            </Col>
          </Form>
          
          </Col>
          <Col className='connexPic'></Col>
        </Row>
      </Container>
    );
  }
}
export default Connexion;
