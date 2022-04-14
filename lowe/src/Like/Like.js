import { Component } from "react";
import Footer from "../Nav/Footer";
import Firstsec from "./Firstsec";
import Firstsecs from "../Recent/Firstsec";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Firstsec />
        <Firstsecs />
        <Footer />
      </>
    )
  }
}

export default Like;
