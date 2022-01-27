import { Component } from "react";
import Firstsec from "./Firstsec";
import Header from "../Nav/Header";
import Footer from "../Nav/Footer";
import Secondsec from "./Secondsec";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header header="home" />
        <Firstsec />
        <Secondsec />
        <Footer />
      </>
    )
  }
}

export default Home;
