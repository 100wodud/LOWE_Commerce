import { Component } from "react";
import "./RModal.css"
	

    let path = window.location.pathname.split("/")[1];
    if(path ==='receipt' || path === "reservation_change"){
        
            window.onpopstate = function(event) {
        window.history.go(1);
            }
    }

class RModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                <section className="Reservation_change_footer_section">
                    <div className="Reservation_change_modal_modalInner">
                        <div className="Reservation_change_modal_content">
                            <div style={{textAlign: "center"}}>
                                <img style={{marginBottom: "12px"}}src={process.env.PUBLIC_URL + "/image/nav/reservation_check.svg"} alt="예약 확정" />
                                <div style={{ color: "#FF3D12", font: '700 18px "Noto Sans"', textAlign: "center", marginBottom: "40px" }}>예약 확정</div>
                            </div>
                            <div>
                                <div className="Reservation_change_modal_content_title">시술명</div>
                                <div className="Reservation_change_modal_content_content">{this.props.data.board.name}</div>
                                <div className="Reservation_change_modal_content_title">담당 / 지점</div>
                                <div className="Reservation_change_modal_content_content">{this.props.data.board.designer_name} / {this.props.data.board.store}</div>
                                <div className="Reservation_change_modal_content_title">예약일자</div>
                                <div className="Reservation_change_modal_content_content">
                                    {new Date(this.props.payment_date.replaceAll("-","/")).toLocaleString("US", { dateStyle: "full", timeStyle: "short" }).replace("일 ", "일(").replace("요일", ")").replace("년 ", ".").replace("월 ", ".").replace("일", "")}   
                                </div>
                            </div>
                        </div>
                        <div className="Reservation_change_modal_button">
                            <a href={`/${funnel}`}><div style={{ font: '400 14px "Montserrat"', lineHeight: "50px", borderRight: "1px solid #DDDDDD" }}>홈</div></a>
                            <a href={`/mypayments${funnel}`}><div style={{ color: "#FF3D12", font: '700 14px "Montserrat"', lineHeight: "50px" }}>예약내역</div></a>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default RModal;