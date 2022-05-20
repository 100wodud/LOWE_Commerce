import { Component } from "react";
import "./Firstsec.css";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <section className="Promotion_spring">
                <div>
                    <img src={process.env.PUBLIC_URL + "/image/promotion/01/01.png"} alt="프로모션" />
                    <div className="Promotion_spring_second_img">
                    <img src={process.env.PUBLIC_URL + "/image/promotion/01/02.png"} alt="프로모션" />
                    </div>
                </div>
            </section>
        )
    }
}

export default Firstsec;