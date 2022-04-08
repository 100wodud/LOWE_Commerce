import { Component } from "react";
import "./Fifthsec.css";

class Fifthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_fifth_section">
                {
                    this.props.data ?
                        <div >
                            <div className="Payment_fifth_title">최종 결제정보</div>
                            <div className="Payment_fifth_content">
                                <div className="Payment_fifth_price_div">
                                    <div className="Payment_fifth_price_sub">시술 금액</div>
                                    <div className="Payment_fifth_price_main">{this.props.data.board.price.comma()}원</div>
                                </div>
                                {this.props.coupon.length ?
                                    <div className="Payment_fifth_price_div">
                                        <div className="Payment_fifth_price_sub">할인쿠폰 사용</div>
                                        <div>
                                        {this.props.coupon.map((e, i) => (
                                            <div className="Payment_fifth_price_main" key={i}>
                                                -{e.data.price.comma()}원
                                            </div>
                                        ))
                                        }
                                        </div>
                                    </div> : null
                                }
                            </div>
                            <div>
                                <div className="Payment_fifth_price_div">
                                    <div className="Payment_fifth_title">총 결제 금액</div>
                                    <div className="Payment_fifth_pricetotal" id="pricetotal" >{this.props.price.comma()}원</div>
                                </div>
                            </div>
                        </div> :
                        <div>시술 정보가 없습니다</div>
                }
            </section>
        )
    }
}

export default Fifthsec;