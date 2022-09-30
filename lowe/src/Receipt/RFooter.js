import { Component } from "react";
import "./RFooter.css"

class RFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount =()=>{
        window.naverInnerScript(this.props.payment.pay_total)
    }


    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }

        return (
            <>
                <section className="Receipt_footer_section">
                    <div className="Receipt_modal_modalInner">
                        <div className="Receipt_modal_content">
                            <div style={{textAlign: "center"}}>
                                <img style={{marginBottom: "12px"}}src={process.env.PUBLIC_URL + "/image/nav/reservation_check.svg"} alt="예약 확정" />
                                <div style={{ color: "#FF3D12", font: '700 18px "Noto Sans"', textAlign: "center", marginBottom: "40px" }}>예약 확정</div>
                            </div>
                            <div>
                                <div className="Receipt_modal_content_title">시술명</div>
                                <div className="Receipt_modal_content_content">{this.props.payment.pay_goods}</div>
                                <div className="Receipt_modal_content_title">담당 / 지점</div>
                                <div className="Receipt_modal_content_content">{this.props.payment.Manager.name} {this.props.payment.Manager.rank} / {this.props.payment.Manager.store}</div>
                                <div className="Receipt_modal_content_title">예약일자</div>
                                <div className="Receipt_modal_content_content">
                                    {new Date(this.props.payment.surgery_date.replaceAll("-","/")).toLocaleString("US", { dateStyle: "full", timeStyle: "short" }).replace("일 ", "일(").replace("요일", ")").replace("년 ", ".").replace("월 ", ".").replace("일", "")}   
                                </div>
                            </div>
                        </div>
                        <div className="Receipt_modal_button">
                            <a href={`/${funnel}`}><div style={{ font: '400 14px "Montserrat"', lineHeight: "50px", borderRight: "1px solid #DDDDDD" }}>홈</div></a>
                            <a href={`/mypayments${funnel}`}><div style={{ color: "#FF3D12", font: '700 14px "Montserrat"', lineHeight: "50px" }}>예약내역</div></a>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default RFooter;