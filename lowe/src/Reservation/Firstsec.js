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
            <section className="Reservation_first_section">
                {
                    this.props.data ?
                        <div>
                            <div className="Reservation_first_title">시술정보</div>
                            <div className="Reservation_first_content">
                                <div>
                                    <div><span className="Reservation_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>시술명</span><span className="Reservation_first_content_content" >{this.props.data.board.name}</span></div>
                                    <div><span className="Reservation_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>담당 / 지점</span><span className="Reservation_first_content_content" >{this.props.data.board.designer_name} / {this.props.data.board.store}</span></div>
                                    <div><span className="Reservation_first_content_title" style={{ marginBottom: "12px", lineHeight: "100%" }}>시술금액</span><span className="Reservation_first_content_content" style={{ font: '700 14px "Montserrat' }}>{this.props.data.board.price.comma()}</span></div>
                                    {
                                        this.props.payment_date ?
                                            <div>
                                                <span className="Reservation_first_content_title" style={{ marginBottom: "12px" }}>예약일자</span><span className="Reservation_first_content_content" style={{ font: '700 14px "Montserrat', color: "#FF3D12" }}>
                                                    {new Date(this.props.payment_date.replaceAll("-","/")).toLocaleString("US", { dateStyle: "full", timeStyle: "short" }).replace("일 ", "일(").replace("요일", ")").replace("년 ", ".").replace("월 ", ".").replace("일", "")}   
                                                </span>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div> :
                        <div>시술 정보가 없습니다</div>
                }
            </section>
        )
    }
}

export default Firstsec;