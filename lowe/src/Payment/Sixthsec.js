import { Component } from "react";
import "./Sixthsec.css";

class Sixthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_sixth_section">
                <div>
                    <div className="Payment_sixth_title">결제수단</div>
                    <div className="Payment_sixth_content">
                        <div className={this.props.method === "card" ? "sixth_click" : "sixth_nonclick"} onClick={this.props.onClickMethod("card")}>신용카드</div>
                        <div className={this.props.method === "transfer" ? "sixth_click" : "sixth_nonclick"} onClick={()=>{window.alert("준비중입니다.")}}>계좌이체</div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Sixthsec;