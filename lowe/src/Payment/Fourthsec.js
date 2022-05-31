import { Component } from "react";
import Fourcoupon from "./Fourcoupon";
import "./Fourthsec.css";

class Fourthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onClickOpen = () => {
        this.setState({ open: !this.state.open })
    }


    render() {
        return (
            <section className="Payment_fourth_section">
                {
                    this.props.user && this.props.data ?
                        <>
                            <div className="Payment_fourth_title_div">
                                <div className={this.state.open ? "Payment_fourth_title_margin" : "Payment_fourth_title"} >할인적용</div>
                                <div className="Payment_fourth_title_coupon" onClick={this.onClickOpen}>보유 할인쿠폰
                                    <span> <strong style={{ color: "#FF3D12" }}>{this.props.user.Coupons.length}장</strong></span>
                                    <span>
                                        {this.props.user.Coupons.length ?
                                            <img className={this.state.open ? "Payment_fourth_title_up" : "Payment_fourth_title_down"} src={process.env.PUBLIC_URL + "/image/nav/designer_filter_arrow.svg"} alt="로위 서치" /> : null
                                        }
                                    </span>
                                </div>
                            </div>
                            {this.state.open && this.props.user.Coupons.length ?
                                this.props.user.Coupons.map((e) => (
                                    <>
                                        {e.used === 1 && (!this.props.coupon.length ||this.props.coupon[0].id === e.id ) ?
                                            <Fourcoupon e={e} key={e.id} onClickCoupon={this.props.onClickCoupon} data={this.props.data} coupon={this.props.coupon} /> : null
                                        }
                                    </>
                                ))
                                : null
                            }
                        </>
                        :
                        <div>시술 정보가 없습니다</div>

                }
            </section>
        )
    }
}

export default Fourthsec;