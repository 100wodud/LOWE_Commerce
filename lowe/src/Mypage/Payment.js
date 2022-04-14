import { Component } from 'react';
import "./Payment.css";
import { Link } from 'react-router-dom';


class Payment extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    render() {
        return (
            <div className="mypayment" >
                {this.props.data ?
                    <div className={this.props.data.state === "환불완료" ? "refund" : ""}>
                            <Link to={{
                                pathname: "/mypayment/" + this.props.data.id,
                                state: {
                                    data: this.props.data
                                },
                            }}>
                                    <div className='mypayment_pay_goods'>{this.props.data.pay_goods}</div><div>
                                    <dl className="dl">
                                        <dt className="dt">결제금액</dt>
                                        <dd className="dd">{this.props.data.pay_total.comma()}원</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제날짜</dt>
                                        <dd className="dd">{this.props.data.createdAt.slice(0, 10).replaceAll("-", ".")}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제수단</dt>
                                        <dd className="dd">{this.props.data.pay_cardname + "결제"}</dd>
                                    </dl>
                                    <dl className="dl">
                                        <dt className="dt">결제상태</dt>
                                        <dd className="dd">{this.props.data.state}</dd>
                                    </dl>
                                    {this.props.data.surgery_date ?
                                        <dl className="dl">
                                            <dt className="dt">예약날짜</dt>
                                            <dd className="dd">{this.props.data.surgery_date}</dd>
                                        </dl> : null
                                    }
                                </div>

                            </Link>
                    </div> :
                    null
                }
            </div>
        );
    }
}
export default Payment;