import React from "react";
import "./RefundModal.css";

class RefundModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }
    handleClose = async() => {
        this.props.close();
    }

    render() {
        return (
            <div className="Refund_modalBody" >
                <div className="Refund_modalclick" onClick={this.handleClose}></div>
                <div className="Refund_modalInner">
                    <div className="Refund_modalclick" onClick={this.handleClose}></div>
                    <div className="Refund_content">
                        <div style={{height: "40px"}}>
                        </div>
                        <div className="Refund_content_title">결제취소하시려는 이유를 선택해주세요</div>
                        <div onClick={this.props.submitreason("변심에 의한 구매의사 취소")} className={this.props.reason==="변심에 의한 구매의사 취소" ? `Refund_content_div_click`:`Refund_content_div` }><div>변심에 의한 구매의사 취소</div><img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="환불사유 체크"></img></div>
                        <div onClick={this.props.submitreason("결제금액이 비쌈")} className={this.props.reason==="결제금액이 비쌈" ? `Refund_content_div_click`:`Refund_content_div `}><div>결제금액이 비쌈</div><img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="환불사유 체크"></img></div>
                        <div onClick={this.props.submitreason("디자이너 변경")} className={this.props.reason==="디자이너 변경" ? `Refund_content_div_click`:`Refund_content_div `}><div>디자이너 변경</div><img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="환불사유 체크"></img></div>
                        <div onClick={this.props.submitreason("결제방법 변경")} className={this.props.reason==="결제방법 변경" ? `Refund_content_div_click`:`Refund_content_div `}><div>결제방법 변경</div><img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="환불사유 체크"></img></div>
                        <div onClick={this.props.submitreason("혜택 적용 후 재구매 예정")} className={this.props.reason==="혜택 적용 후 재구매 예정" ? `Refund_content_div_click`:`Refund_content_div `}><div>혜택 적용 후 재구매 예정</div><img src={process.env.PUBLIC_URL + "/image/nav/coupon_check.svg"} alt="환불사유 체크"></img></div>

                        <div className={`Refund_content_div `} style={{paddingBottom: "12px",paddingTop: "8px"}}>기타</div>
                        <div className="refund_reason_text">
                                <textarea placeholder="기타사유를 말씀해주세요!" onChange={this.props.submitreason("reason")} />
                            </div>
                    <div className="Refund_caution">
                        <li>시술 <span>예약일 하루 전 오후 5시까지</span> 날짜 및 시간 변경 가능</li>
                        <li className="Receipt_Contact_li_margin">시술 예약일 하루 전까지 : <span><span style={{fontFamily: "Montserrat"}}>100%</span> 가능</span></li>
                        <li className="Receipt_Contact_li_margin">당일 취소, 예약시간 경과, 노쇼 : <span><span style={{fontFamily: "Montserrat"}}>90%</span> 취소/환불</span></li>
                    </div>
                    </div>
                    <div onClick={this.props.refund} className="Refund_close">취소/환불 요청</div>
                </div>
            </div>
        );
    }
}

export default RefundModal;

