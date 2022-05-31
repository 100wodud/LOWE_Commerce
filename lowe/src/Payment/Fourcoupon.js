import { Component } from "react";
import "./Fourthsec.css";

class Fourcoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false
        };
    }
    
    onClickCoupon = (e) => () => {
        this.setState({ click: !this.state.click })

        this.props.onClickCoupon(e)()
    }


    render() {
        //value={JSON.stringify(e)} onChange={this.props.handleInputValue("coupon")}
        return (
            <>
                {
                    (this.props.e.manager_id === this.props.data.board.ManagerId || this.props.e.manager_id === null) && this.props.e.used === 1 && this.props.e.minimum <= this.props.data.board.price?
                        <div onClick={this.onClickCoupon(JSON.stringify(this.props.e))} className={this.state.click ? "Payment_fourth_coupon_click" :"Payment_fourth_coupon"}>
                            <div>
                                <span className="Payment_fourth_coupon_content">{this.props.e.content.slice(0, this.props.e.content.indexOf("]") + 1)} <span>{this.props.e.price.comma()}원</span> 할인쿠폰</span>
                                <span className="Payment_fourth_coupon_date">{this.props.e.createdAt.slice(2, 10).replaceAll("-", ".")}~{this.props.e.expired.slice(2, 10).replaceAll("-", ".")}</span>
                            </div>
                            {this.state.click ?
                                     <img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="로위 쿠폰 사용" />
                                 : null
                            }
                        </div>
                        :
                        <div className="Payment_fourth_coupon_cant">
                            <div>
                                <span className="Payment_fourth_coupon_cant_content">{this.props.e.content.slice(0, this.props.e.content.indexOf("]") + 1)} <span>{this.props.e.price.comma()}원</span> 할인쿠폰</span>
                                <span className="Payment_fourth_coupon_cant_date">{this.props.e.createdAt.slice(2, 10).replaceAll("-", ".")}~{this.props.e.expired.slice(2, 10).replaceAll("-", ".")}</span>
                            </div>
                        </div>
                }
            </>
        )
    }
}

export default Fourcoupon;