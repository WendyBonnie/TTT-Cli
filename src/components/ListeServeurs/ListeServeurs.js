import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Cards from "../../assets/components/Cards/Cards";
import "./listeServeurs.css";

class Liste extends Component {
  constructor(props) {
    super(props);
    this.state = { serveur: { tabServeur: [] } };
  }

  componentDidMount() {
    this.getDataServeurs();
  }

  getDataServeurs = (e) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/client/getDataServeur" +
        window.location.search,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
          this.setState({ serveur: data });
          console.log(this.state.serveur.pourboireGeneral);
          localStorage.setItem("restaurantName", data.restaurantName);
          localStorage.setItem("@idRestaurant", data._id);
          console.log(data);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  display = () => {
    if (this.state.serveur.pourboireIndividuel === true) {
      return this.state.serveur.tabServeur.map((element, index) => {
        return (
          <Container fluid>
            <Row className="rowImage">
              <Col>
                <Image
                  src={
                    "https://s3.amazonaws.com/b.c.bucket.tipourboire/" +
                    element.serveurPicture
                  }
                />
              </Col>
            </Row>

            <Row className="rowTitre2">
              <Col s={12}>
                <p>{element.serveurName}</p>
              </Col>
            </Row>
            <Row className="butTips">
              <Col>
                <Button
                  onClick={() => {
                    localStorage.setItem("@mailServeur", element.serveurMail);
                    this.props.history.push(
                      "/information-client" + window.location.search
                    );
                  }}
                >
                  Donner un Pourboire
                </Button>
              </Col>
            </Row>
          </Container>
        );
      });
    } else {
      return;
    }
  };

  displayGeneral = () => {
    if (
      this.state.serveur.pourboireGeneral === true &&
      this.state.serveur.pourboireIndividuel === false
    ) {
      return (
        <Container className="tipsTrueFalse">
          <Row>
            <Col className="colButton">
              <Button
                onClick={() => {
                  const headers = new Headers({
                    "Content-Type": "application/json",
                  });
                  const data = {};
                  const options = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data),
                  };

                  fetch(
                    "https://back-end.osc-fr1.scalingo.io/client/emailServeur",
                    options
                  )
                    .then((response) => {
                      return response;
                    })
                    .then(
                      (data) => {
                        console.log(data);
                      },

                      (error) => {
                        console.log(error);
                      }
                    );
                  this.props.history.push(
                    "/TipCommun" + window.location.search
                  );
                }}
              >
                Donner à toute l'équipe !
              </Button>
            </Col>
          </Row>
          {this.state.serveur.tabServeur.map((element, index) => {
            return (
              <Container fluid>
                <Row className="rowImage">
                  <Col>
                    <Image
                      src={
                        "https://s3.amazonaws.com/b.c.bucket.tipourboire/" +
                        element.serveurPicture
                      }
                    />
                  </Col>
                </Row>

                <Row className="rowTitre2">
                  <Col s={12}>
                    <p>{element.serveurName}</p>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Container>
      );
    } else if (
      this.state.serveur.pourboireGeneral === true &&
      this.state.serveur.pourboireIndividuel === true
    ) {
      return (
        <Container>
          <Row>
            {" "}
            <Col className="colButton">
              <Button
                onClick={() => {
                  const headers = new Headers({
                    "Content-Type": "application/json",
                  });
                  const data = {};
                  const options = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data),
                  };

                  fetch(
                    "https://back-end.osc-fr1.scalingo.io/client/emailServeur",
                    options
                  )
                    .then((response) => {
                      return response;
                    })
                    .then(
                      (data) => {
                        console.log(data);
                      },

                      (error) => {
                        console.log(error);
                      }
                    );
                  this.props.history.push(
                    "/TipCommun" + window.location.search
                  );
                }}
              >
                Donner à toute l'équipe !
              </Button>
            </Col>
          </Row>
          {this.state.serveur.tabServeur.map((element, index) => {
            return (
              <Container fluid>
                <Row className="rowImage">
                  <Col>
                    <Image
                      src={
                        "https://s3.amazonaws.com/b.c.bucket.tipourboire/" +
                        element.serveurPicture
                      }
                    />
                  </Col>
                </Row>

                <Row className="rowTitre2">
                  <Col s={12}>
                    <p>{element.serveurName}</p>
                  </Col>
                </Row>
                <Row className="butTips">
                  <Col>
                    <Button
                      onClick={() => {
                        localStorage.setItem(
                          "@mailServeur",
                          element.serveurMail
                        );
                        this.props.history.push(
                          "/information-client" + window.location.search
                        );
                      }}
                    >
                      Donner un Pourboire
                    </Button>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Container>
      );
    } else {
      return this.state.serveur.tabServeur.map((element, index) => {
        return (
          <Container fluid>
            <Row className="rowImage">
              <Col>
                <Image
                  src={
                    "https://s3.amazonaws.com/b.c.bucket.tipourboire/" +
                    element.serveurPicture
                  }
                />
              </Col>
            </Row>

            <Row className="rowTitre2">
              <Col s={12}>
                <p>{element.serveurName}</p>
              </Col>
            </Row>
            <Row className="butTips">
              <Col>
                <Button
                  onClick={() => {
                    localStorage.setItem("@mailServeur", element.serveurMail);
                    this.props.history.push(
                      "/information-client" + window.location.search
                    );
                  }}
                >
                  Donner un Pourboire
                </Button>
              </Col>
            </Row>
          </Container>
        );
      });
    }
  };
  render() {
    return (
      <Container className="blocPrincipalClient">
        <Row className="vousEtes">
          <Col className="colLieu" s={12}>
            <img src="/logoTTT/map.png" />
            <h1 className="Titre">
              Lieu : {this.state.serveur.restaurantName}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>{this.displayGeneral()}</Col>
        </Row>
      </Container>
    );
  }
}

export default Liste;
