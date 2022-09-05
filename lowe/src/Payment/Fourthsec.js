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
                                <div className="Payment_fourth_title">할인적용</div>
                                <div className="Payment_fourth_title_coupon" onClick={this.onClickOpen}>

                                    {this.props.coupon.length && !this.state.open ?
                                        <>
                                            <span className="Payment_fourth_coupon_content">{this.props.coupon[0].data.content.slice(0, this.props.coupon[0].data.content.indexOf("]") + 1)} <span>{this.props.coupon[0].data.price.comma()}원</span> 할인쿠폰</span>
                                            <span className="Payment_fourth_coupon_date">{this.props.coupon[0].data.createdAt.slice(2, 10).replaceAll("-", ".")}~{this.props.coupon[0].data.expired.slice(2, 10).replaceAll("-", ".")}</span>
                                            <span style={{ float: "right", marginTop: "4px" }}>
                                                {this.props.user.Coupons.length ?
                                                    <img className={this.state.open ? "Payment_fourth_title_up" : "Payment_fourth_title_down"} src={process.env.PUBLIC_URL + "/image/nav/designer_filter_arrow.svg"} alt="로위 서치" /> : null
                                                }
                                            </span>
                                        </>
                                        :
                                        <>
                                            보유 할인쿠폰
                                            <span> <strong style={{ color: "#FF3D12" }}>{this.props.user.Coupons.filter((e) => { return e.used === 1 && !e.deletedAt ? e : null }).length}장</strong></span>
                                            <span style={{ float: "right", marginTop: "4px" }}>
                                                {this.props.user.Coupons.length ?
                                                    <img className={this.state.open ? "Payment_fourth_title_up" : "Payment_fourth_title_down"} src={process.env.PUBLIC_URL + "/image/nav/designer_filter_arrow.svg"} alt="로위 서치" /> : null
                                                }
                                            </span>
                                        </>
                                    }
                                </div>
                            </div>
                            {this.state.open && this.props.user.Coupons.length ?
                                <div className="Payment_fourth_title_coupon_list">
                                    {
                                        this.props.user.Coupons.map((e) => (
                                            <>
                                                {e.used === 1 ?
                                                    <Fourcoupon e={e} key={e.id} onClickCoupon={this.props.onClickCoupon} onClickOpen={this.onClickOpen} data={this.props.data} coupon={this.props.coupon} /> : null
                                                }
                                            </>
                                        ))
                                    }
                                </div>
                                : null
                            }
                        </>
                        :
                        <div>시술 정보가 없습니다</div>

                }
                <div>
                    <div className="Payment_fourth_title" style={{ margin: "32px 0 12px 0" }}>포인트<span style={{ fontSize: "12px", fontWeight: "400", marginLeft: "8px" }}>보유 포인트 <span style={{ color: "#FF3D12" }}>{this.props.user.point ||this.props.user.point <= 0 ? this.props.user.point.comma() : 0}P</span></span></div>
                    <div className="Payment_fourth_allpoint">
                        <input id="point_input" pattern="[0-9]*" style={this.props.point > 0 ? { backgroundColor: "#ffffff", color: "#FF3D12" } : null} onBlur={this.props.onBlurPoint} type="number" placeholder="0" onChange={this.props.handleInputValue("point")}></input>
                        {this.props.point ?
                            <div onClick={this.props.onInputnoPoint}>사용 안함</div> :
                            <div onClick={this.props.onInputPoint}>모두 사용</div>
                        }
                    </div>
                    <div className="Payment_fourth_pointwarning">포인트는 쿠폰 적용 금액의 90%까지 100P 단위로 사용 가능합니다.</div>
                </div>
            </section>
        )
    }
}

export default Fourthsec;