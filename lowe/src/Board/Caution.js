import { Component } from "react";
import "./Caution.css"

class Caution extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // const category = [{ id: 0, category: "전체" }, { id: 1, category: "컷" }, { id: 2, category: "펌" }, { id: 3, category: "염색" }, { id: 4, category: "붙임머리" }, { id: 5, category: "클리닉" }];
        return (
            <>
            <div style={{ marginTop: "40px", marginBottom: "24px" }}>
                <span className="Mainimg_img_tips">WHY LOWE?</span>
                <span>
                    <img className="Mainimg_img_tips_line" style={{width: "calc(100% - 140px)"}} src={process.env.PUBLIC_URL + "/image/nav/board_line.svg"} alt="라인" />
                </span>
            </div>
            <div>
                <div>
                    <span><img src={process.env.PUBLIC_URL + "/image/nav/board_check.svg"} alt="상품 체크" /></span>
                    <span className="Mainimg_img_tips_recommand_title">1:1 프라이빗 시술</span>
                </div>
                <div className="Mainimg_img_tips_recommand">
                    로위는 처음부터 끝까지 디자이너의 1:1 시술이 이루어져요.<br />프라이빗한 공간에서 섬세한 손길을 느껴보세요. 
                </div>
                <div style={{marginTop: "20px"}}>
                    <span><img src={process.env.PUBLIC_URL + "/image/nav/board_check.svg"} alt="상품 체크" /></span>
                    <span className="Mainimg_img_tips_recommand_title">더 많은 혜택</span>
                </div>
                <div className="Mainimg_img_tips_recommand">
                    로위몰에서의 단독 프로모션, 할인쿠폰으로 더욱 합리적인<br />미용 서비스를 경험해 보세요.
                </div>
                <div style={{marginTop: "20px"}}>
                    <span>
                        <img src={process.env.PUBLIC_URL + "/image/nav/board_check.svg"} alt="상품 체크" />
                    </span>
                    <span className="Mainimg_img_tips_recommand_title">초역세권</span>
                </div>
                <div className="Mainimg_img_tips_recommand">
                    교통 걱정은 그만,<br />로위 매장은 지하철과 가까워 쉽고 빠르게 찾을 수  있어요.
                </div>
            </div>

            <div style={{ marginTop: "80px" }}>
                <span className="Mainimg_img_tips">미리 확인해주세요!</span>
                <span>
                    <img className="Mainimg_img_tips_line" style={{width: "calc(100% - 165px)"}} src={process.env.PUBLIC_URL + "/image/nav/board_line.svg"} alt="라인" />
                </span>
            </div>
                <div className="notice-text" style={{ fontSize: "16px", fontFamily: "Montserrat" }}></div>
                <ul className="notice-list">
                    <li><span className="num">1.</span>예약 시간 변경은 <strong>최소 전날 오후 5시 전</strong>까지 가능합니다.</li>
                    <li><span className="num">2.</span>시술에 따라 <strong>기장 추가 비용이 발생</strong>할 수 있습니다.</li>
                    <li><span className="num">3.</span>모든 시술은 <strong>1:1로 진행</strong>되며, 동시 시술이 어렵습니다.</li>
                    <li><span className="num">4.</span><strong>중복 예약이 발생할 경우 시간 변경 요청</strong>을 드릴 수 있습니다.</li>
                </ul>
                <div className="notice-text" >위와 관련한 궁금사항은 카카오톡 채널로 문의해주세요 🙂</div>
            </>
        )
    }
}

export default Caution;