import { Component } from "react";
import "./Secondsec.css"

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log(this.props)
        return (
            <>
                <section className="Receipt_second_section">
                    <div>
                        <div className="Receipt_first_title">결제정보</div>
                        {this.props.payment.length ?
                            <div id="rpayment">
                                <div>
                                    <dl className="dl">
                                        <dt className="dt">이름</dt>
                                        <dd className="dd">{this.props.payment[0].payer_name}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">휴대폰번호</dt>
                                        <dd className="dd">{this.props.user.phone.slice(0, 3) + "-" + this.props.user.phone.slice(3, 7) + "-" + this.props.user.phone.slice(7, 11)}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제일</dt>
                                        <dd className="dd">{this.props.payment[0].createdAt.slice(0, 10).replaceAll("-", ".")}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제수단</dt>
                                        <dd className="dd">{this.props.payment[0].pay_cardname + "결제"}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제상태</dt>
                                        <dd className="dd">{this.props.payment[0].state}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">주문번호</dt>
                                        <dd className="dd">{this.props.payment[0].pay_cardtradenum}</dd>
                                    </dl>
                                    {this.props.payment[0].surgery_date ?
                                        <dl className="dl">
                                            <dt className="dt">예약날짜</dt>
                                            <dd className="dd">{this.props.payment[0].surgery_date}</dd>
                                        </dl> : null
                                    }
                                </div>
                            </div>
                            : null}
                    </div>
                </section>
            </>
        );
    }
}

export default Secondsec;