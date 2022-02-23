import React, { Component } from "react";
import "./Footer.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Modal,
  NavDropdown,
} from "react-bootstrap";

class footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  deleteProfil = (e) => {
    const data = {
      userId:
        localStorage.getItem(
          "userID"
        ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      profil: this.state.profil,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
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
        () => {
          let link = "https://client.tipourboire.com/";
          window.location.href = link;
        },

        (error) => {
          console.log(error);
        }
      );
  };
  modalDelete = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={() => {
          this.setState({ showModal: false });
        }}>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Supprimer mon compte</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          Etes vous sur de vouloir supprimer votre compte Tipourboire ?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modalButtonDelete"
            variant="secondary"
            onClick={() => {
              this.deleteProfil();
            }}>
            Supprimer
          </Button>
          <Button
            className="modalButtonDelete"
            variant="primary"
            onClick={() => {
              this.setState({ showModal: false });
            }}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  render() {
    return (
      <div className="footer">
        {this.modalDelete()}
        <Navbar fixed="bottom" collapseOnSelect expand="lg" bg="#edeaea">
          <Navbar.Brand href="#home" className="textFooter">
            @Tipourboire
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="mentionsLegales/mentionsLégales.pdf"
                className="textFooter">
                Mentions Légales
              </Nav.Link>
              <Nav.Link href="cgu-cgv/CGA.pdf" className="textFooter">
                CGA
              </Nav.Link>
              <Nav.Link
                href="confidentialité/Politique_de_confidentialité_client.pdf"
                className="textFooter">
                Confidentialité
              </Nav.Link>
              <Nav.Link
                href=""
                className="textFooter"
                href="cookies/POLITIQUE_DE_COOKIES.pdf">
                Cookies
              </Nav.Link>
              <Nav.Link
                href="mailto:contact@tipourboire.com"
                className="textFooter">
                Contact
              </Nav.Link>
              {localStorage.getItem("token") ? (
                <Nav.Link
                  className="textFooter"
                  onClick={() => this.setState({ showModal: true })}>
                  Supprimer mon compte
                </Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes" className="textFooter">
                A propos
              </Nav.Link>
            </Nav>
            <img className="imgMango" src="/logoTTT/mangopay-terms.png" />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default footer;
