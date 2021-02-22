/**
 * App.js - Main app component
 */

/*Module imports*/
import React, { Component } from "react";
import Inscription from "../Inscription/Inscription";
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from "../Connexion/Connexion";
import Profil from "../Profil/Profil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "../../assets/components/Footer/Footer";
import HomePageClient from "../HomePageClient/HomePageClient";
import Liste from "../ListeServeurs/ListeServeurs";
import BarreMenu from "../../assets/components/Navbar/Navbar";
import Payment from "../Payment/Payment";
import Menu from "../Menu/Menu";
import PasswordRenew from "../PasswordRenew/PasswordRenew";
import PasswordReset from "../PasswordReset/PasswordReset";
import Commentaires from "../Payment/Commentaire";
import Historique from "../Historique/Historique";
import modifierMonProfil from "../modifierSonProfil/modifierSonProfil";
import TipCommun from "../TipCommun/TipCommun";
import TipCommun1 from "../TipCommun/TipCommun1";
import MangoCards from "../MangoCards/MangoCards";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.

/*Main app component*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }
  setLogin = (value) => {
    this.setState({ login: value });
  };
  render() {
    return (
      <div>
        <Router>
          <BarreMenu />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Connexion setLogin={this.setLogin} {...props} />
              )}
            />
            <Route path="/Inscription" exact component={Inscription} />
            <Route path="/Profil" exact component={Profil} />
            <Route path="/Home" exact component={HomePageClient} />
            <Route path="/ListeServeurs" exact component={Liste} />
            <Route path="/Payment" exact component={Payment} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/Commentaires" exact component={Commentaires} />
            <Route path="/passwordReset" exact component={PasswordReset} />
            <Route path="/passwordRenew" exact component={PasswordRenew} />
            <Route path="/Historique" exact component={Historique} />
            <Route path="/TipCommun" exact component={TipCommun} />
            <Route path="/TipCommun1" exact component={TipCommun1} />
            <Route path="/MangoCards" exact component={MangoCards} />
            <Route
              path="/modifierMonProfil"
              exact
              component={modifierMonProfil}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
