import React from "react";
import "./Idresult.css"
import axios from "axios";
import ModalPhone from "../Sign/ModalPhone";


class Pwresult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirm: "",
            password_error: "",
            confirm_error: "",
            phonemodal: false,
            modalcomment: '',
        };
    }
    openmodalPhone =(e)  => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
        if (key === "login_id") {
            this.setState({ idcheck: false, login_id_error: "" })
        }
        if (key === "phone") {
            this.setState({ phonecheck: false, phone_error: "" })
        }
    };

    updatePw = () => {
        if (this.state.password.length < 8) {
            this.setState({
                password_error: "8자 이상 입력",
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if (this.state.password !== this.state.confirm) {
            this.setState({
                confirm_error: "동일한 비밀번호를 입력해주세요",
            })
        } else {
            this.setState({
                confirm_error: "",
            })
        }

        setTimeout(() => {
            this.sendPw();
        }, 0);
    }

    sendPw = () => {
        if(!this.state.confirm_error && !this.state.password_error){
            axios.post("http://54.180.117.244:5000/updateUserPassword", {
                id: this.props.data,
                password: this.state.password
            }).then((res) => {
                this.openmodalPhone(`비밀번호가 변경되었습니다.`)
            }).catch((err)=>{
            })
        } else {
            this.setState({phonecheck_error: "인증번호를 확인해주세요"})
        }
    }

    render() {
        return (
            <>
                <section className="idresult_section">
                    <div>
                        <div className="idresult_section_title">
                            새로운 비밀번호를<br />입력해 주세요
                        </div>
                        <div>
                            <div className="signUptitle">비밀번호</div>
                            <input className="signUpinfo" type="password" placeholder="비밀번호를 입력해주세요" onChange={this.handleInputValue("password")} />
                            {
                                this.state.password_error ?
                                    <div className="signup_error">{this.state.password_error}</div> :
                                    <div className="signup_error"></div>
                            }
                        </div>
                        <div>
                            <div className="signUptitle">비밀번호 확인</div>
                            <input className="signUpinfo" type="password" placeholder="비밀번호를 한번 더 입력해주세요" onChange={this.handleInputValue("confirm")} />
                            {
                                this.state.confirm_error ?
                                    <div className="signup_error">{this.state.confirm_error}</div> :
                                    <div className="signup_error"></div>
                            }
                        </div>
                            
                        <div className="signin_buttonbox" onClick={this.updatePw}>
                                <div className="signin_button">다음</div>
                            </div>
                    </div>
                </section>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default Pwresult;