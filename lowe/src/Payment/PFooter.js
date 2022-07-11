import { Component } from "react";
import "./PFooter.css"

class PFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

        
    render() {
        return (
            <>
                <section className="Payment_footer_section" onClick={this.props.onclickSubmit}>
                    <div className="Payment_footer_price">결제하기</div>
                    <div className={this.props.modalopen? "Payment_footer_modal_up":"Payment_footer_modal"}>
                        <strong>결제진행 필수 동의</strong>에 체크해주세요!
                    </div>
                </section>
            </>
        );
    }
}

export default PFooter;