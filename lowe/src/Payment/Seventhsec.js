import { Component } from "react";
import PaymentModal from "./PaymentModal";
import "./Seventhsec.css";

class Seventhsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: '',
        };
    }

    openmodal = (e) => () => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };

    render() {
        return ( 
        <>
            <section className="Payment_seventh_section">
                <div onClick={this.props.onClickAgree("agree")} >
                    <span className="Payment_seventh_span Pagreeall">
                        {this.props.agree1 && this.props.agree2 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/agree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/agree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                    <span className="Payment_seventh_title">결제 진행 필수 동의</span>
                </div>
                <div onClick={this.props.onClickAgree("agree1")} >
                    <span className="Payment_seventh_span Pagree">
                        {this.props.agree1 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                            <span className="Payment_seventh_span"  >(필수) <span onClick={this.openmodal(4)} style={{ textDecorationLine: "underline" }}>개인정보 제 3자 제공 동의</span></span>
                </div>
                <div onClick={this.props.onClickAgree("agree2")} style={{ margin: "10px 0px" }}>
                    <span className="Payment_seventh_span Pagree">
                        {this.props.agree2 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                    <span className="Payment_seventh_span">(필수) 예약/환불/취소 및 기타유의사항 동의</span>
                </div>
                <div className="Payment_seventh_caution">
                    <li className="Payment_seventh_li">시술 <span>예약일 하루 전 오후 5시까지</span> 변경 가능 사항</li>
                    <li className="Payment_seventh_li_margin">날짜 및 시간 변경 / 취소 및 환불 : <span>100% 가능</span></li>
                    <li className="Payment_seventh_li_margin">당일 취소, 예약시간 경과, 노쇼 : <span>90% 취소/환불</span></li>
                    <li className="Payment_seventh_li_margin">환불 수수료 : 실 결제금 + 적립금의(쿠폰금액제외) <span>10%</span></li>
                    <li className="Payment_seventh_li">모발 상태에 따라 <span>추가금액이 발생</span> 할 수 있습니다</li>
                </div>
            </section>
                <PaymentModal open={this.state.modalOpen} close={this.closemodal} />
           </>
        )
    }
}

export default Seventhsec;