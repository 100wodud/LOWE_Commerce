import React from "react";
import axios from "axios";
import ModalPhone from "../Sign/ModalPhone";

class Pw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_id: "",
            phone: "",
            random: 0,
            randomcheck: 0,
            phonecheck: false,
            phone_error: "",
            phonecheck_error: "",
            login_id_error: "",
            phonemodal: false,
            modalcomment: '',
        };
    }

    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        this.setState({ login_id: this.props.data })
        document.getElementById("editpw").value = this.props.data
    }

    checksignupPhone = () => {
        if (this.state.phone.length < 10) {
            this.setState({
                phone_error: "전화번호를 확인해 주세요",
            })
        } else {
            this.setState({
                phone_error: "",
            })

            let number = Math.floor(Math.random() * 1000000) + 100000;
            if (number > 1000000) {
                number = number - 100000;
            }
            this.setState({ random: number, phonecheck: true })
            axios.post("https://server.lowehair.kr/checkPhoneNumber", {
                phone: this.state.phone,
                number: number
            }).then((res) => {
            })
            
            setTimeout(() => {
                this.openmodalPhone(`인증번호가 발송되었습니다.\n카카오톡을 확인해주세요.`)
            })
        }
    }


    handlefindPw = () => {

        axios.post("https://server.lowehair.kr/loginIdCheck", {
            login_id: this.state.login_id,
        }).then((res) => {
            if (res.data.status === "false") {
                this.setState({
                    login_id_error: "",
                })
            } else if (res.data.status === "true") {
                this.setState({
                    login_id_error: "아이디를 확인해주세요",
                })

            }
        })
        this.setState({ phonecheck_error: "" })
        if (this.state.phonecheck && this.state.random === Number(this.state.randomcheck) && !this.state.login_id_error) {
            axios.post("https://server.lowehair.kr/checkUserIdAndPhone", {
                phone: this.state.phone,
                login_id: this.state.login_id
            }).then((res) => {
                if (res.data.data) {
                    this.props.onchangePw(res.data.data)
                }
            }).catch((err) => {
                this.setState({ phone_error: "아이디와 전화번호가 일치하지 않습니다", })
            })
        } else {
            this.setState({ phonecheck_error: "x 인증번호를 확인해주세요" })
        }
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    //영문,숫자 이외 전부 제외
    handleOnInput = () => (e) => {
        e.target.value = e.target.value.replace(/[^a-z0-9]/g, '')
    }

    //숫자 이외 전부 제외
    handleOnInput3 = () => (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    render() {
        return (
            <>
                <div className="findid_section">
                    <div>
                        <div className="signUptitle">아이디</div>
                        <input className="signUpinfo" type="text" placeholder="예 : lowe1234" onChange={this.handleInputValue("login_id")} onInput={this.handleOnInput()} id="editpw" />
                        {
                            this.state.login_id_error ?
                                <div className="signup_error">{this.state.login_id_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">휴대폰 번호</div>
                        <input className="signUpinfo" type="text" style={{ maxWidth: "197px", width: "65%" }} placeholder="숫자만 입력해주세요" onChange={this.handleInputValue("phone")} onInput={this.handleOnInput3()} />
                        <button className="signUpcheckid" style={{ width: "113px" }} onClick={this.checksignupPhone}>인증번호 받기</button>
                        {
                            this.state.phone_error ?
                                <div className="signup_error">{this.state.phone_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">휴대폰 번호 인증</div>
                        <input className="signUpinfo" type="number" placeholder="숫자만 입력해주세요" onChange={this.handleInputValue("randomcheck")} />
                        {
                            this.state.phonecheck_error ?
                                <div className="signup_error">{this.state.phonecheck_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" onClick={this.handlefindPw}>다음</div>
                    </div>
                </div>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default Pw;