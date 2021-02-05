import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class MangoCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formGroupAmount">
            <Form.Control
              name="email"
              type="text"
              placeholder="E-Mail"
              onChange={this.change}
              value={this.state.amount}
            />
            <Form.Control
              name="name"
              type="text"
              placeholder="Nom"
              onChange={this.change}
              value={this.state.amount}
            />
            <Form.Control
              name="firstname"
              type="text"
              placeholder="Prénom"
              onChange={this.change}
              value={this.state.amount}
            />
            <Form.Control
              name="birthday"
              type="date"
              placeholder="Date de naissance"
              onChange={this.change}
              value={this.state.amount}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default MangoCards;
