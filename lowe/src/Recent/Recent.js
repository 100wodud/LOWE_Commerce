import { Component } from "react";
import Header from "../Nav/LikeHeader";
import Firstsec from "./Firstsec";
import Footer from "../Nav/Footer";

class Recent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header header="최근 본" />
        <Firstsec />
        <Footer />
      </>
    )
  }
}

export default Recent;
