import { Component } from 'react';
import "./Coupon.css";
import Moment from 'react-moment';
import moment from 'moment';


class Coupon extends Component {
    constructor() {
        super();
        this.state = {
            used: [],
            can: []
        }
    }

    componentDidMount = () => {
        let used = [];
        let can = []
        if (this.props.data) {
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].used === 1) {
                    can.push(this.props.data[i])
                } else {
                    used.push(this.props.data[i])
                }
            }
            this.setState({ used: used, can: can });
        }
    }

    render() {
        return (
            <>
                <div style={{ padding: "12px 0 40px 0" }}>
                    <div style={{ marginBottom: "12px", font: "700 16px Montserrat" }}>쿠폰 사용방법</div>
                    <ul className='coupon_ul'>
                        <li>1. 결제 전, <strong>매장 직원에게</strong> 사용할 <strong>쿠폰을 보여주세요.</strong></li>
                        <li>2. 쿠폰이 적용되면 <strong>할인된 금액으로 결제</strong>됩니다.</li>
                        <li>3. 쿠폰이 사용되면 쿠폰은 사용완료 처리가 되어요.</li>
                    </ul>
                </div>
                {this.state.can.map((e) => {
                    return (
                        <div key={e.id} className="coupon_div">
                            <div className="coupon_first_div">
                                <div>{e.price.comma()}원</div>
                            </div>
                            <div className="coupon_second_div">
                                <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "5px" }}>{e.content}</div>
                                { e.minimum ?
                                    <div style={{ fontSize: "12px", marginBottom: "14px" }}>{e.minimum.comma()}원 이상 시술 결제시 사용가능</div>:
                                    <div style={{ fontSize: "12px", marginBottom: "14px" }}>-</div>
                                }
                                <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "7px", color: "#999999" }}>{e.createdAt.slice(0, 10).replaceAll("-", ". ")} - <Moment date={e.expired} format='YYYY. MM. DD'></Moment></div>
                                <div style={{ fontSize: "12px", fontWeight: "500", color: "#999999" }}>일부상품제외</div>
                            </div>
                        </div>
                    )
                })
                }
                {this.state.used.map((e) => {
                    let expired = moment(e.createdAt).add(1, "months")
                    return (
                        <div key={e.id} className="coupon_div">
                            <div className="coupon_first_div_used">
                                <div>사용완료</div>
                            </div>
                            <div className="coupon_second_div">
                                <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "5px" }}>{e.content}</div>
                                <div style={{ fontSize: "12px", marginBottom: "14px" }}>30,000원 이상 시술 결제시 사용가능</div>
                                <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "7px", color: "#999999" }}>{e.createdAt.slice(0, 10).replaceAll("-", ". ")} - <Moment date={expired} format='YYYY. MM. DD'></Moment></div>
                                <div style={{ fontSize: "12px", fontWeight: "500", color: "#999999" }}>일부상품제외</div>
                            </div>
                        </div>
                    )
                })
                }
            </>
        );
    }
}
export default Coupon;