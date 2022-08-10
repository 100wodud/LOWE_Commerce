import { Component } from "react";
import Firstsec from "./Firstsec";
import Header from "../Nav/Header";
import Footer from "../Nav/Footer";
import Secondsec from "./Secondsec";
import Thirdsec from "./Thirdsec";
import Fourthsec from "./Fourthsec";

class Mainpage extends Component {
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
        <Thirdsec />
        <Fourthsec />
        <Footer />
      </>
    )
  }
}

export default Mainpage;
