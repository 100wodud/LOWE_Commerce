import { Component } from "react";
import "./Firstsec.css";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <section className="Promotion_spring">
                <div>
                    <img src={process.env.PUBLIC_URL + "/image/promotion/01.png"} alt="프로모션" />
                </div>
                <div className="Promotion_spring_text">
                    <div style={{fontSize: "28px", marginBottom: "32px"}}>
                        <strong>봄에는 더 예뻐져봄</strong>
                    </div>
                    <div style={{marginBottom: "32px"}}>
                        <strong>퍼스널 컬러에 맞춘 컬러 선택</strong>으로<br />가장 예쁜 봄을 맞이해보세요!
                    </div>
                    <div style={{fontSize: "14px"}}>
                        *프로모션 금액은 기간별로 달라질 수 있습니다
                    </div>
                </div>
            </section>
        )
    }
}

export default Firstsec;