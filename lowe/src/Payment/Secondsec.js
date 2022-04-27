import { Component } from "react";
import "./Secondsec.css";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_second_section">
                {
                    this.props.user ? 
                    <div>
                        <div className="Payment_second_title">예약자 정보</div>
                        <div className="Payment_second_content">
                            <div>
                                <div><span className="Payment_second_content_title" style={{marginBottom: "12px"}}>이름</span><span className="Payment_second_content_content" >{this.props.user.name}</span></div>
                                <div><span className="Payment_second_content_title">휴대폰번호</span><span className="Payment_second_content_content">{this.props.user.phone.slice(0,3)+"-"+this.props.user.phone.slice(3,7)+"-"+this.props.user.phone.slice(7,this.props.user.phone.length)}</span></div>
                            </div>
                        </div>
                    </div> :
                    <div>시술 정보가 없습니다</div>
                }
            </section>
        )
    }
}

export default Secondsec;