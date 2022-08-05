import { Component } from "react";
import "./Firstsec.css";
import axios from 'axios';
import RefundModal from "./RefundModal";
import ModalPhone from "../Sign/ModalPhone";
import moment from 'moment';

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refund: false,
            phonemodal: false,
            modalcomment: '',
            reason: "",
        };
    }

    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e, refund: false, });
    };
    closemodalPhone = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        this.setState({ phonemodal: false, modalcomment: "", refund: false, });
        window.location.href = `/mypayments${funnel}`
    };

    handlebuttonRefund = (e) => {
        this.setState({ refund: true })
    }

    onClickRefund = (e) => {
        if (this.state.reason) {
            axios.post('http://54.180.117.244:5000/updatePayment', {
                id: Number(this.props.mypayment.id), //결제 DB 상의 id 값
                state: '환불대기', //원하시는 형태로 결제 상태 입력해주세요!
                cancel_reason: this.state.reason,
            }).then((res) => {
                axios.post("http://54.180.117.244:5000/alert", {
                    type: 5,
                    PaymentId: Number(this.props.mypayment.id)
                }).then((res) => {
                    this.openmodalPhone(`취소/환불요청이 완료되었습니다`)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            });
        } else {
            window.alert("이유를 설명해 주세요")
        }
        //! 환불!!
        // e.preventDefault();
        // axios
        //   .post('http://localhost:5000/payAuth', {
        //     PCD_PAYCANCEL_FLAG: 'Y',
        //   })
        //   .then((authResult) => {
        //     axios
        //       .post('http://localhost:5000/refund', {
        //         ...authResult.data,
        //         payment_id: this.props.id, //Payment 아이디!
        //         PCD_REFUND_TOTAL: this.props., //결제취소 요청금액 (기존 결제금액보다 적은 금액 입력 시 부분취소로 진행)
        //         cancel_reason: this.state.reason,
        //         state: '환불대기',
        //       })
        //       .then((refundResult) => {
        //         if (refundResult.data.PCD_PAY_MSG === '승인취소성공') {
        //           console.log('환불 성공!!');
        //         } else {
        //           console.log('환불 실패 ㅠㅠ');
        //         }
        //       });
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     window.alert(err);
        //   });
    }

    onClickrefundclose = () => {
        this.setState({ refund: false })
    }

    onChangeRefundreason = (key) => (e) => {
        this.setState({ reason: key })
        if (key === "reason") {
            this.setState({ reason: e.target.value })
        }
    }

    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let between = 0
        let id = window.location.pathname.split("/")[2];
        let s_date = moment(this.props.payment.surgery_date).subtract(1, 'days').format('YYYY-MM-DD 17:00')
        between = moment(s_date).diff(moment(new Date()))
        return (
            <section className="Receipt_first_section">
                {
                    this.props.data ?
                        this.props.mypayment ?
                            <>
                                <div className={this.props.mypayment.state === "환불완료" ? "decoration" : ""}>
                                    <div className="Receipt_first_title" style={{ color: "#333333", textDecoration: "none" }}>
                                        <div style={{ color: "#333333", textDecoration: "none" }}>예약정보</div>
                                        <div>
                                            <div style={{ textDecoration: "none" }} className={this.props.mypayment.state === "시술완료" || this.props.mypayment.state === "예약확정" || this.props.mypayment.state === "예약변경" ? "Mypayment_state state_green" : "Mypayment_state state_red"}><span style={this.props.mypayment.state === "환불완료" ? { textDecoration: "none", color: "#FF3D12" }:{ textDecoration: "none" }}>{this.props.mypayment.state === "예약변경" ? "예약확정" : this.props.mypayment.state}</span></div>
                                        </div>
                                    </div>
                                    <div className="Receipt_first_content ">
                                        <div>

                                            <div><span className="Receipt_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>시술명</span><span className="Receipt_first_content_content" >{this.props.mypayment.pay_goods}</span></div>
                                            <div><span className="Receipt_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>담당 / 지점</span><span className="Receipt_first_content_content" >{this.props.mypayment.Manager.name} {this.props.mypayment.Manager.rank} / {this.props.mypayment.Manager.store}</span></div>
                                            <div><span className="Receipt_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>시술금액</span><span className="Receipt_first_content_content" style={{ font: '700 14px "Montserrat' }}>{this.props.mypayment.pay_amount.comma()}</span></div>
                                            {this.props.payment.surgery_date ?
                                                <div>
                                                    <span className="Reservation_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%"  }}>예약일자</span><span className="Reservation_first_content_content state_red" style={{ font: '700 14px "Montserrat', border: "none" }}>
                                                    {new Date(this.props.payment.surgery_date.replaceAll("-","/")).toLocaleString("US", { dateStyle: "full", timeStyle: "short" }).replace("일 ", "일(").replace("요일", ")").replace("년 ", ".").replace("월 ", ".").replace("일", "")}                                                    </span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                {this.props.mypayment.state === "환불대기" || this.props.mypayment.state === "환불완료" ?
                                    null :
                                    this.props.mypayment.state === "시술완료" ?
                                        <div style={{ marginTop: "20px" }}>
                                            <a style={{ display: "contents" }} href={`/review/write/${this.props.payment.ManagerId}/${this.props.data.board.id}/${this.props.payment.id}${this.props.payment.SurgeryId ? "/" + this.props.payment.SurgeryId : ""}${funnel}`} >
                                                <div className="Mypayment_box">리뷰쓰기</div>
                                            </a>
                                        </div> :
                                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                                            {between >= 0 ?
                                                <a style={{ display: "contents" }} href={`/reservation_change/${id}`} >
                                                    <div className="Mypayment_box" style={{ marginRight: "5px" }}>
                                                        예약변경
                                                    </div>
                                                </a> :
                                                <div className="Mypayment_box_cant" style={{ marginRight: "5px" }}>
                                                    예약변경
                                                </div>
                                            }
                                            <div onClick={this.handlebuttonRefund} style={{ marginLeft: "5px" }} className="Mypayment_box">취소 / 환불요청</div>
                                        </div>
                                }
                                {this.props.mypayment.state === "예약확정" || this.props.mypayment.state === "예약변경" ?
                                    <>
                                        <div style={{ paddingTop: "32px", font: '700 14px "Noto Sans"', lineHeight: "100%" }}>예약 취소시 유의사항 안내</div>
                                        <div className="Refund_caution" style={{ padding: "20px 0 0 0" }}>
                                            <li>시술 <span>예약 전일 오후 <strong>5시 이전</strong></span></li>
                                            <li className="Receipt_Contact_li_margin">예약 날짜 및 시간 <strong>변경 가능</strong></li>
                                            <li className="Receipt_Contact_li_margin">예약 취소 <strong>100% 환불</strong></li>
                                            <li>시술 <span>예약 전일 오후 <strong>5시 이후</strong></span></li>
                                            <li className="Receipt_Contact_li_margin">예약 날짜 및 시간 <strong>변경 불가</strong></li>
                                            <li className="Receipt_Contact_li_margin">당일 취소, 예약시간 경과, 노쇼 <strong>90% 환불</strong></li>
                                        </div>
                                    </> : null
                                }
                            </> :

                            <div>
                                <div className="Receipt_first_title">시술정보</div>
                                <div className="Receipt_first_content">
                                    {this.props.data.board.thumbnail ?
                                        <div><img src={this.props.data.board.thumbnail} alt="결제 상품 정보" /></div> :
                                        <div><img src="https://lowe-image.s3.ap-northeast-2.amazonaws.com…8237171_525430271510486_1571957910076915712_n.png" alt="결제 상품 정보" /></div>
                                    }
                                    <div>
                                        <div className="Receipt_first_content_name">{this.props.payment.pay_goods}</div>
                                        <div>
                                            <div className="Receipt_first_content_price"><span>{Number(this.props.payment.event_percent) ? this.props.payment.event_price.comma() : this.props.payment.list_price.comma()}원</span><span style={{ color: "#FF3D12" }}>{this.props.payment.event_percent ? this.props.payment.event_percent + "%" : null}</span></div>
                                            <div className="Mypayment_state"><span>{this.props.mypayment.state}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                        <div>시술 정보가 없습니다</div>
                }
                {this.state.refund ?
                    <RefundModal refund={this.onClickRefund} reason={this.state.reason} close={this.onClickrefundclose} submitreason={this.onChangeRefundreason} /> : null
                }
                {
                    this.state.phonemodal ?

                        <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} /> : null
                }
            </section>
        )
    }
}

export default Firstsec;