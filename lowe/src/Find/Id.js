import React from "react";
import axios from "axios";
import ModalPhone from "../Sign/ModalPhone";

class Id extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            random: 0,
            randomcheck: 0,
            phonecheck: false,
            phone_error: "",
            phonecheck_error: "",
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
                this.openmodalPhone(`인증번호`)
            })
        }
    }

    handlefindId = () => {
        this.setState({ phonecheck_error: "" })
        if (this.state.phonecheck && this.state.random === Number(this.state.randomcheck)) {
            axios.post("https://server.lowehair.kr/findUserLoginId", {
                phone: this.state.phone,
            }).then((res) => {
                if (res.data.data) {
                    this.props.onchangeId(res.data.data)
                }
            }).catch((err) => {
                this.props.onchangeId("없음")
            })
        } else {
            this.setState({ phonecheck_error: "인증번호를 확인해주세요" })
        }
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    //숫자 이외 전부 제외
    handleOnInput3 = () => (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    render() {
        return (
            <>
                <div className="findid_section">
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
                        <input className="signUpinfo" type="number" placeholder="인증번호 숫자 입력" onChange={this.handleInputValue("randomcheck")} />
                        {
                            this.state.phonecheck_error ?
                                <div className="signup_error">{this.state.phonecheck_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" onClick={this.handlefindId}>아이디 찾기</div>
                    </div>
                </div>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default Id;