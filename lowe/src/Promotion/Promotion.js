import { Component } from "react";
import Header from "../Nav/Header";
import Firstsec from "./Firstsec";
import ProFooter from "./ProFooter";

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
                <ProFooter footer="promotion1" />
            </>
        )
    }
}

export default Promotion;
