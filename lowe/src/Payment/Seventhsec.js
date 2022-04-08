import { Component } from "react";
import "./Seventhsec.css";

class Seventhsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_seventh_section">
                <div onClick={this.props.onClickAgree("agree")} >
                    <span className="Payment_seventh_span Pagreeall">
                        {this.props.agree1 && this.props.agree2 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/agree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/agree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                    <span className="Payment_seventh_title">결제진행 필수 동의</span>
                </div>
                <div onClick={this.props.onClickAgree("agree1")} >
                    <span className="Payment_seventh_span Pagree">
                        {this.props.agree1 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                    <span className="Payment_seventh_span">개인정보 수집 이용약관 동의(필수)</span>
                </div>
                <div onClick={this.props.onClickAgree("agree2")} style={{ margin: "20px 0px" }}>
                    <span className="Payment_seventh_span Pagree">
                        {this.props.agree2 ?
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                            <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                        }
                    </span>
                    <span className="Payment_seventh_span">예약/환불/취소 및 기타유의사항 동의(필수)</span>
                </div>
                <div className="Payment_seventh_caution">
                    <li><span>시술 예약일 하루 전까지 날짜 및 시간 변경 가능</span></li>
                    <li>시술 예약일 하루 전까지 : <span>100% 취소/환불</span></li>
                    <li>당일 취소, 예약시간 경과, 노쇼 : <span>90% 취소/환불</span></li>
                </div>
            </section>
        )
    }
}

export default Seventhsec;