import { Component } from 'react';
import "./Payment.css";
import { Link } from 'react-router-dom';
import moment from 'moment';


class Payment extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    render() {
        let between = 0
        if (this.props.data.surgery_date) {
            between = moment(new Date(this.props.data.surgery_date.slice(0,10).replaceAll('-',"/")).setHours(0,0,0,0)).diff(moment(new Date().setHours(0,0,0,0)), 'days')
        }
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

                            <div>
                                <div style={{ textDecoration: "none" }} className={this.props.data.state === "시술완료" || this.props.data.state === "예약확정" || this.props.data.state === "예약변경" ? "mypayment_pay_state state_green" : "mypayment_pay_state state_red"}><span>{this.props.data.state === "예약변경" ? "예약확정" : this.props.data.state}</span></div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "calc(100% - 90px)" }}>
                                    <div className='mypayment_pay_goods'>{this.props.data.pay_goods}</div>
                                    <div className='mypayment_pay_goods'>{this.props.data.Manager.name} {this.props.data.Manager.rank} / {this.props.data.Manager.store}</div><div>
                                        {
                                            this.props.data.surgery_date ?
                                                <div className='mypayment_pay_goods'>
                                                    {new Date(this.props.data.surgery_date.replaceAll("-","/")).toLocaleString("US", { dateStyle: "full", timeStyle: "short" }).replace("일 ", "일(").replace("요일", ")").replace("년 ", ".").replace("월 ", ".").replace("일", "")}   
                                                </div> : null
                                        }
                                    </div>

                                </div>
                                {this.props.data.state === "예약확정" || this.props.data.state === "예약변경" ?
                                    <div>
                                        <div className='mypayment_pay_dday'>
                                            <div className='mypayment_pay_dday_content'>D-day</div>
                                            <div className='mypayment_pay_dday_num'>{between}</div>
                                        </div>
                                    </div> : null
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