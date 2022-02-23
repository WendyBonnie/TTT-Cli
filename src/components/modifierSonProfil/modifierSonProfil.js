import React, { Component } from "react";
import "./modifierSonProfil.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class modifierMonProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
    };
  }

  change = (event) => {
    let client = this.state.client;
    client[event.target.name] = event.target.value;
    this.setState({
      client: client,
      // identifier name de l'input = choisir la valeur qui se trouve dans l'input donc necessité d'avoir le bon name!!
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

  editClient = (e) => {
    e.preventDefault();
    const data = {
      userId:
        localStorage.getItem(
          "userID"
        ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      client: this.state.client,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/edit", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  componentDidMount() {
    this.postDataClient();
  }

  render() {
    return (
      <div className="bloc-modifierProfil">
        <Row>
          <Col md={12} className="titreModif">
            <h1>Modification du profil</h1>

            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Control
                  name="lastname"
                  type="text"
                  placeholder="Nom"
                  onChange={this.change}
                  value={this.state.client.lastname}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPrenom">
                <Form.Control
                  name="firstname"
                  type="text"
                  placeholder="Prénom"
                  onChange={this.change}
                  value={this.state.client.firstname}
                />
              </Form.Group>
              <Form.Group controlId="formAdresse">
                <Form.Control
                  as="select"
                  type="text"
                  placeholder="Sexe"
                  name="gender"
                  onChange={this.change}
                  value={this.state.client.gender}>
                  <option>-</option>
                  <option>Femme</option>
                  <option>Homme</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formVille">
                <Form.Control
                  type="text"
                  placeholder="Ville"
                  name="adress"
                  onChange={this.change}
                  value={this.state.client.adress}
                />
              </Form.Group>
              <Form.Group controlId="formTel">
                <Form.Control
                  type="text"
                  placeholder="Telephone(Facultatif)"
                  name="phone"
                  onChange={this.change}
                  value={this.state.client.phone}
                />
              </Form.Group>
              {/* <Form.Group controlId="formAge">
            
            <Form.Control
              type="text"
              placeholder="Age"
              name="age"
              onChange={this.change}
              value={this.state.client.age}
            />
           </Form.Group>*/}
            </Form>
            <Button
              className="submitButton"
              variant="primary"
              type="submit"
              onClick={this.editClient}>
              Mettre à jour mon profil
            </Button>
            <br />
            {this.state.message}
          </Col>
        </Row>
      </div>
    );
  }
}

export default modifierMonProfil;
