import { Component } from "react";
import "./RFooter.css"

class RFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log()
        let path = window.location.pathname.split("/")[1];
        return (
            <section className="Reservation_footer_section">
                <div>
                    <div className="Reservation_footer_price">{this.props.data.board.price.comma()}</div>
                    <div className="Reservation_footer_price_content">총 결제금액</div>
                </div>
                {path === "reservation_change" ?
                    <div onClick={this.props.date && this.props.time ? this.props.changePaymentDate : ""} className={this.props.date && this.props.time ? "Reservation_footer_button" : "Reservation_footer_button_none"}>
                        변경하기
                    </div> :
                    <div onClick={this.props.date && this.props.time ? this.props.gotoPayment : ""} className={this.props.date && this.props.time ? "Reservation_footer_button" : "Reservation_footer_button_none"}>
                        예약하기
                    </div>
                }
            </section>
        );
    }
}

export default RFooter;