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
                        <li><span>시술 예약일 하루 전까지 날짜 및 시간 변경 가능</span></li>
                        <li>시술 예약일 하루 전까지 : <span>100% 취소/환불</span></li>
                        <li>당일 취소, 예약시간 경과, 노쇼 : <span>90% 취소/환불</span></li>
                    </div>
            </section>
        )
    }
}

export default Contact;