import { Component } from 'react';
import "./Coupon.css";
import Moment from 'react-moment';
import moment from 'moment';
import axios from "axios";
import Header from "../Sign/SignHeader";
import Footer from '../Nav/Footer';


class Coupon extends Component {
    constructor() {
        super();
        this.state = {
            used: [],
            can: []
        }
    }

    componentDidMount = async () => {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let id = window.localStorage.getItem("id");
        if (id) {
            await axios.post("http://54.180.117.244:5000/getOneUser", {
                id: id,
            })
                .then((res) => {
                    let used = [];
                    let can = []
                    if (res.data) {
                        for (let i = 0; i < res.data[0].Coupons.length; i++) {
                            if (res.data[0].Coupons[i].used === 1) {
                                can.push(res.data[0].Coupons[i])
                            } else {
                                used.push(res.data[0].Coupons[i])
                            }
                        }
                        this.setState({ used: used, can: can });
                    }
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            window.location.href = `/signin${funnel}`
        }
    }

    render() {
        return (
            <>
                <Header header="쿠폰" />
                <div className='Coupon_mycoupons'>
                    <div className='Coupon_mycoupons_title'>나의 할인쿠폰 <span>{this.state.can.length}장</span></div>
                    {this.state.can.length || this.state.used.length ?
                        <>
                            {this.state.can.map((e) => {
                                return (
                                    <div key={e.id} className="coupon_div">
                                        <div className="coupon_first_div">
                                            <div>{e.price.comma()}원</div>
                                        </div>
                                        <div className="coupon_second_div">
                                            <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "5px" }}>{e.content}</div>
                                            {e.minimum ?
                                                <div style={{ fontSize: "12px", marginBottom: "14px" }}>{e.minimum.comma()}원 이상 시술 결제시 사용가능</div> :
                                                <div style={{ fontSize: "12px", marginBottom: "14px" }}>-</div>
                                            }
                                            <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "7px", color: "#999999" }}>{e.createdAt.slice(0, 10).replaceAll("-", ". ")} - <Moment date={e.expired} format='YYYY. MM. DD'></Moment></div>
                                            <div style={{ fontSize: "12px", fontWeight: "500", color: "#999999" }}>일부상품제외, 매장 결제시 적용 불가</div>
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
                                            <div style={{ fontSize: "12px", fontWeight: "500", color: "#999999" }}>일부상품제외, 매장 결제시 적용 불가</div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </>
                        : 
                        <>
                            <div style={{height: "170px"}}></div>
                        </>}
                </div>
                <div className='mycoupon_policy'>
                    <div style={{ marginBottom: "12px", font: "400 14px 'Noto Sans'" }}>쿠폰 사용방법</div>
                    <ul className='coupon_ul'>
                        <li><span className="num">•</span><strong>쿠폰은 오프라인(매장)에서 적용불가합니다</strong></li>
                        <li><span className="num">•</span><strong>네이버 예약건은 예약일 전날 오후 5시 이전까지 로위몰로 변경 가능합니다 (이후 변경시 네이버 예약금 환불은 어렵습니다)</strong></li>
                        <li><span className="num">•</span>디자이너 전용 쿠폰은 해당 디자이너에게만 적용됩니다</li>
                        <li><span className="num">•</span>최소 결제 금액은 할인 쿠폰 제외한 주문 상품 금액 기준으로 적용됩니다</li>
                        <li><span className="num">•</span>취소 및 환불 시 사용한 쿠폰은 복구되며, 유효기간 만료 후 복구 된 쿠폰에 한해 유효기간이 연장됩니다</li>
                        <li><span className="num">•</span>유효기간 만료 및 사용된 쿠폰은 확인할 수 없습니다</li>
                    </ul>
                </div>
                <Footer />
            </>
        );
    }
}
export default Coupon;