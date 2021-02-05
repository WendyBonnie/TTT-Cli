import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React, { Component } from "react";
import "./Commentaire.css";
import { Link } from "react-router-dom";

class Commentaires extends Component {
  constructor(props) {
    super(props);
    this.state = {commentaires:[{nom:"", prenom:"", texte:""}] };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewStatut = (e) => {
    e.preventDefault();
    const data = {
        prenom:this.state.prenom,
        nom:this.state.nom,
        texte: this.state.texte,
        id:this.props.serveurId

      
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
     
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/commentaire", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
           
          this.setState({ message: responseObject.message });
         
          this.props.history.push({
            state: {
              serveurId: this.props.id,
            
              
            },
            pathname:"/menu",
           

          });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  

  render() {
    return (
      <Container className='contCom'>
        <Row className='coms'>
          <Col xs={12} s={12} md={12}><h1 className='titreCom'>Laissez un commentaire à votre serveur</h1></Col>
        </Row>
            <Row className='coms'>
            <Col xs={12} s={12} md={12}>
            <Form.Group>
         
            <Form.Control
              onChange={this.handleInput}
              value={this.state.prenom}
              name="prenom"
              type="text"
              placeholder="Prenom"
            />
          </Form.Group>
          <Form.Group>
           
            <Form.Control
              onChange={this.handleInput}
              value={this.state.nom}
              name="nom"
              type="text"
              placeholder="nom"
            />
          </Form.Group>
          <textarea
            onChange={this.handleInput}
            value={this.state.texte}
            name="texte"
            type="text"
            class="form-control"
            placeholder="Que voulez-vous dire ?"
          ></textarea>
          </Col>
          
          <Col>
          <button
            className="buttonStatut"
            type="submit"
            onClick={this.addNewStatut}
          >
            Publier
          </button>
          </Col>
          <Col className='caract'>
          <small>100 caractères maximum</small>
          </Col>
          </Row>
        
      </Container>
    );
  }
}
export default Commentaires;