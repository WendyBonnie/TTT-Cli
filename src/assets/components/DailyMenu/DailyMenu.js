import React, { Component } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DailyMenu.css";

class DailyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db1: {},
      menu: "",
    };
  }

  getDailyMenu = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/menu/", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          let db = data;
          this.setState({ db1: db });
          this.setState({ menu: this.state.db1.menu.dailyMenu.picture });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  componentDidMount() {
    this.getDailyMenu();
  }

  render() {
    return (
      <Container className="blocprincipal">
        <Card>
          <h2 className="Titre">MENU DU JOUR</h2>
          <Card.Body>
            <p className="datemenu"></p>
          </Card.Body>
          <a
            href={"https://back-end.osc-fr1.scalingo.io/" + this.state.menu}
            target="_blank"
          >
            <Card.Img
              variant="top"
              src={"https://back-end.osc-fr1.scalingo.io/" + this.state.menu}
              className="dailyMenu"
              alt="Menu du Jour"
            />
          </a>
        </Card>
        <Row>
          <Col md={12}>
            <Link to="/Home">
              <Button className="button" variant="outline-warning" size="lg">
                POURBOIRE
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DailyMenu;
