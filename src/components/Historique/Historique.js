import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./historique.css";

class Historique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client : { historique : []} ,
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
  display = () => {
    return this.state.client.historique.map((element, index) => {
      return (
      
          <tr>
            <td type="text" id="montant" name="montant">
              {" "}
              {element.montant / 100}€
            </td>
            <td type="date" id="date" name="date">
              {" "}
              {new Date(element.date).toLocaleDateString()}
            </td>
            <td type="text" id="waiter" name="waiter">
              {" "}
              {element.waiter}
            </td>
            <td type="text" id="restaurantName" name="restaurantName">
              {" "}
              {element.restaurantName}
            </td>
          </tr>
         
      )
    })
  }

  componentDidMount() {
    this.postDataClient();
  }

  render() {
    return (
      <Container className='histoClient'>
        <Row>
          <Col className='titleHisto'> <h3>Historique de vos pourboire</h3></Col>
        </Row>
       
      <Row class="table-responsive">
        <Table striped hover>
        <thead>
      <tr>
        <th>Montant</th>
        <th>Date</th>
        <th>Serveur</th>
        <th>Restaurant</th>
      </tr>
      </thead>
        <tbody>
        {this.display()}
        </tbody>
      </Table>
      </Row>
        
       
      
      </Container>
    
    );
  }
}

export default Historique
