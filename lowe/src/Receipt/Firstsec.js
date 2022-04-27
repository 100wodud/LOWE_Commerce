import { Component } from "react";
import "./Firstsec.css";
import axios from 'axios';
import RefundModal from "./RefundModal";
import ModalPhone from "../Sign/ModalPhone";

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
        this.setState({ phonemodal: false, modalcomment: "", refund: false, });
        window.location.replace('/mypayments')
    };

    handlebuttonRefund = (e) => {
        this.setState({ refund: true })
    }

    onClickRefund = (e) => {
        if (this.state.reason) {
            axios.post('https://d205rw3p3b6ysa.cloudfront.net/updatePayment', {
                id: Number(this.props.mypayment.id), //결제 DB 상의 id 값
                state: '환불대기', //원하시는 형태로 결제 상태 입력해주세요!
                cancel_reason: this.state.reason,
            }).then((res) => {
                axios.post("https://d205rw3p3b6ysa.cloudfront.net/alert", {
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
        console.log(this.props)
        return (
            <section className="Receipt_first_section">
                {
                    this.props.data ?
                        this.props.mypayment ?
                            <>
                                <div className={this.props.mypayment.state === "환불완료" ? "decoration" : ""}>
                                    <div className="Receipt_first_title" style={{ color: "#333333", textDecoration: "none" }}>시술정보</div>
                                    <div className="Receipt_first_content ">
                                        <div> <img src={this.props.data.board.thumbnail} alt="결제 상품 정보" /></div>
                                        <div>
                                            <div className="Receipt_first_content_name">{this.props.payment.pay_goods}</div>
                                            <div>
                                                <div className="Receipt_first_content_price"><span>{this.props.payment.event_price ? this.props.payment.event_price.comma() : this.props.payment.list_price.comma()}원</span><span style={this.props.mypayment.state === "환불완료" ? { color: "#9C9C9C" } : { color: "#FF3D12" }}>{Number(this.props.payment.event_percent) ? this.props.payment.event_percent + "%" : null}</span></div>
                                                <div style={{ textDecoration: "none" }} className={this.props.mypayment.state === "환불대기" || this.props.mypayment.state === "환불완료" ? "Mypayment_state state_green" : "Mypayment_state state_red"}><span>{this.props.mypayment.state}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.props.mypayment.state === "환불대기" || this.props.mypayment.state === "환불완료" ?
                                    null :
                                    this.props.mypayment.state === "시술완료" ?
                                        this.props.data.board.id === 122 ?
                                            null :
                                            <div style={{ marginTop: "20px",height: "40px" }}>
                                                <a href={`/review/write/${this.props.data.board.ManagerId}/${this.props.data.board.id}`} className="Mypayment_box">리뷰쓰기</a>
                                            </div> :
                                        <div onClick={this.handlebuttonRefund} style={{ marginTop: "20px", textAlign: "center" }}>
                                            <div className="Mypayment_box">취소 / 환불요청</div>
                                        </div>
                                }
                            </> :

                            <div>
                                <div className="Receipt_first_title">시술정보</div>
                                <div className="Receipt_first_content">
                                    { this.props.data.board.thumbnail ?
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