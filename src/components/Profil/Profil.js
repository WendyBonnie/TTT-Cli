import React, { Component } from "react";
//import Navbar from "../../assets/components/Navbar/Navbar";
//import Historique from "../Historique/Historique";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import Historique from "../Historique/Historique";

/*style import*/
import "./profil.css";

class Client extends Component {
  constructor(props) {
    console.log();
    super(props);
    this.state = {
      client: { historique: [] },
    };
  }
  click = () => {
    this.props.history.push({
      pathname: "/ListeServeurs",
    });
  };


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
          console.log(this.state);
        },

        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    this.postDataClient();
  }

  deleteClient = (e) => {
    window.confirm(
      "Etes-vous sur de vouloir supprimer votre compte? Cette action est irréversible."
    );

    e.preventDefault();
    const data = {
      userId: localStorage.getItem(
        "userID"
      ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      client: this.state.client,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
      /**"Bearer Token" est un JSON Web Token dont le rôle est d'indiquer que l'utilisateur 
       qui accède aux ressources est bien authentifié. */
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/delete", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          alert(
            "La suppression de votre compte a bien été prise en compte. Merci."
          );
          this.props.history.push("/Home");
        },

        (error) => {
          console.log(error);
        }
      );
  };
  signOut = () => {
    localStorage.clear();
    this.props.history.push("/Connexion");
  };
  render() {
    return (
      <Container className="blocprincipalProfil ">
        <Button
          className="buttontip"
          variant="warning"
          size="sm"
          onClick={this.click}
        >
          POURBOIRE
        </Button>
        <Row>
        <Col >
        
          <h1 className="Titre-profil">Mon Profil Client</h1>
        <div className="infoProfil">
              <p>
                {this.state.client.firstname} {this.state.client.lastname}
              </p>
              <p className="profilPara">
                {this.state.client.adress} 
              </p>
              <p className="profilPara">
                 {this.state.client.phone}
              </p>
            </div>
            </Col>
            </Row>
            <Row>
              <Col s={12} xs={12} md={6}>
        <Link to="/modifierMonProfil" className="modif">
             <Button className="buttonedit" type="submit">
                 Mettre à jour mon profil
             </Button>
         </Link>
         </Col>
         <Col s={12} xs={12} md={6}>
         <Link to="/ListeServeurs" className="modif">
             <Button className="buttonedit" type="submit">
                 Donner un pourboire
             </Button>
         </Link>
         </Col>
        <Col s={12} xs={12} md={6}>
         <Link to="/Historique" className="modif">
             <Button className="buttonedit" type="submit">
                 Historique de mes dons
             </Button>
         </Link>
         </Col>
         <Col s={12} xs={12} md={6}>
        <div className="Titre">
          <Button
            className="buttondeco"
            variant="outline-warning"
            type="submit"
            onClick={this.signOut}
          >
            Se déconnecter
          </Button>
        </div>
        </Col>
        <p>{this.state.message}</p>
        </Row>
      </Container>
    );
  }
}

export default Client;
