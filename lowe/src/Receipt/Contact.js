import { Component } from "react";
import "./Contact.css";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Receipt_Contact_section">
                    <div>
                        <a href="http://pf.kakao.com/_xlzsPs/chat" className="Receipt_Contact_link">시술 예약일 문의</a>
                    </div>

                    <div className="Receipt_Contact_caution">
                        <li>시술 <span>예약일 하루 전 오후 5시까지</span> 날짜 및 시간 변경 가능</li>
                        <li className="Receipt_Contact_li_margin">시술 예약일 하루 전까지 : <span><span style={{fontFamily: "Montserrat"}}>100%</span> 가능</span></li>
                        <li className="Receipt_Contact_li_margin">당일 취소, 예약시간 경과, 노쇼 : <span><span style={{fontFamily: "Montserrat"}}>90%</span> 취소/환불</span></li>
                        <li>모발 상태에 따라 <span>추가금액이 발생</span> 할 수 있습니다</li>
                    </div>
            </section>
        )
    }
}

export default Contact;