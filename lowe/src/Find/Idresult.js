import React from "react";
import "./Idresult.css"


class Idresult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            result: false,
        };
    }


    render() {
        console.log(this.props)
        return (
            <>
                <section className="idresult_section">
                    {this.props.data === "없음" ?
                        <div>
                            <div className="idresult_section_title">
                                입력하신 번호와<br />일치하는 아이디가 없습니다.
                            </div>
                            <a href="/signup" className="signin_buttonbox">
                                <div className="signin_button">회원가입 하기</div>
                            </a>
                        </div>
                        :
                        <div>
                            <div className="idresult_section_title">
                                입력하신 번호로<br />가입된 아이디가 있습니다.
                            </div>
                            <div>
                                <div className="signUptitle">아이디</div>
                                <input className="signUpinfo" type="text" value={this.props.data} readOnly />
                                <div className="signup_error"></div>
                            </div>
                            <div style={{justifyContent: "space-between",  display: "flex"}}>
                                <div onClick={this.props.onclickListPw} className="signin_buttonbox">
                                    <div style={{ width: "42.4vw", maxWidth: "157px", color: "#333333", backgroundColor: "#ffffff", borderColor: "#cfcfcf", borderWidth: "1px", fontWeight: "400"}} className="signin_button">비밀번호 찾기</div>
                                </div>
                                <a href="/signin"  className="signin_buttonbox">
                                    <div style={{ width: "42.4vw", maxWidth: "157px", borderWidth: "1px",  }} className="signin_button">로그인</div>
                                </a>
                            </div>
                        </div>
                    }
                </section>
            </>
        );
    }
}

export default Idresult;