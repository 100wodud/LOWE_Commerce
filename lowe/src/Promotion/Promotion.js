import { Component } from "react";
import Header from "../Nav/Header";
import Firstsec from "./Firstsec";
import Secondsec from "./Secondsec";

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <Header header="clear" />
                <Firstsec />
                <Secondsec />
            </>
        )
    }
}

export default Promotion;
