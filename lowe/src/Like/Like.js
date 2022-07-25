import { Component } from "react";
import Footer from "../Nav/Footer";
import Firstsec from "./Firstsec";
import Firstsecs from "../Recent/Firstsec";
import Secondsec from "./Secondsec";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 1
    };
  }
  componentDidMount = () => {
    let funnel = "";
    if (window.location.href.split("?")[1]) {
      funnel = "?" + window.location.href.split("?")[1];
    } else {
      funnel = ''
    }
    let id = window.localStorage.getItem("id")
    if (!id) {
      window.location.replace(`/signin${funnel}`)
    } else {

      const script2 = document.createElement("script");

      script2.src = "//wcs.naver.net/wcslog.js";
      script2.async = true;

      document.getElementById("script").appendChild(script2);
      const script = document.createElement("script");
      script.innerHTML = "window.onload = function() {\n" +
          'var _nasa={ };\nif (window.wcs) _nasa["cnv"] = wcs.cnv("5", "10");' +
          "}"
      script.async = true;
      document.getElementById("script").appendChild(script);
    }

  }

  onclickList = (e) => () => {
    this.setState({ list: e })
  }

  render() {
    let funnel = "";
    if (window.location.href.split("?")[1]) {
      funnel = "?" + window.location.href.split("?")[1];
    } else {
      funnel = ''
    }
    return (
      <>
        <header className="header" style={{ position: "relative", border: "none" }}>
          <a href={`/${funnel}`}>
            <img className="header_logo" src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="로위 로고" />
          </a>
          <a href={`/search${funnel}`}>
            <img className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
          </a>
        </header>
        <div className="Designer-filter">
          <p style={{ lineHeight: "40px" }} className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>시술</p>
          <p style={{ lineHeight: "40px" }} className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>디자이너</p>
        </div>
        {this.state.list === 1 ?
          <>
            <Firstsec />
            <Firstsecs />
          </> :
          <Secondsec />
        }
        <div id="script"></div>
        <Footer />
      </>
    )
  }
}

export default Like;
