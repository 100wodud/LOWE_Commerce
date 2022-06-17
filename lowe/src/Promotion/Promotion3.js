import { Component } from "react";
import Header from "../Nav/Header";
import Firstsec from "./Firstsec";
import ProFooter from "./ProFooter";
import "./Promotion3.css"

class Promotion3 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <Header header="clear" />
                    <img className="Promotion3_img" src={`${process.env.PUBLIC_URL}/image/promotion/03/01.png`} alt="로위 프로모션" />
                    <img className="Promotion3_img" src={`${process.env.PUBLIC_URL}/image/promotion/03/02.png`} alt="로위 프로모션" />
                    <img className="Promotion3_img" src={`${process.env.PUBLIC_URL}/image/promotion/03/03.png`} alt="로위 프로모션" />
                    <img className="Promotion3_img" src={`${process.env.PUBLIC_URL}/image/promotion/03/04.png`} alt="로위 프로모션" />
                    <div className="Promotion3_div"></div>
                <ProFooter footer="promotion3" />
            </>
        )
    }
}

export default Promotion3;
