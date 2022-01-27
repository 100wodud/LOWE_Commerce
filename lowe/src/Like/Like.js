import { Component } from "react";
import Header from "../Nav/LikeHeader";
import Footer from "../Nav/Footer";
import Firstsec from "./Firstsec";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header header="찜한" />
        <Firstsec />
        <Footer />
      </>
    )
  }
}

export default Like;
