import React from "react";
import axios from "axios";
import "./SocialFirst.css";
import ModalPhone from "./ModalPhone";
import SignupModal from "./SignupModal";

if(window.location.pathname.split("/")[1] === "naverLogin"){
    window.history.back = () => {

        axios.post("http://54.180.117.244:5000/withdrawalUser", { 
            id: window.location.pathname.split("/")[2], 
            withdrawalReason: "" 
        }).then((res) => {
                setTimeout(() => {
                    window.history.go(-1)
                })
            })
    }
}

class SocialFirst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_error: "",
            random: "",
            phonecheck: "",
            phone: "",
            phonemodal: false,
            modalcomment: "",
            name: "",
            phonecheck_error: "",
            gender: "",
            birth: "",
            modalOpen: false
        };
    }


    openmodal = (e) => () => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    gotoNext = () =>{
            if(this.state.random === Number(this.state.randomcheck)){
                this.setState({ phonecheck_error: "" })
                this.props.onClickNext(this.state)()
            } else {
                this.setState({ phonecheck_error: "인증번호를 확인해주세요" })
            }
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
            axios.post("http://54.180.117.244:5000/phoneCheck", {
                phone: this.state.phone,
            }).then((res) => {
                if (res.data.status === false) {
                    this.openmodalPhone(`네이버가입된번호 ${this.state.phone}`)
                } else {
                    axios.post("http://54.180.117.244:5000/checkPhoneNumber", {
                        phone: this.state.phone,
                        number: number
                    }).then(() => {
                        this.openmodalPhone(`인증번호`)
                    })
                }
            })
        }
    }


    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };


    handleOnInput3 = () => (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    render() {
        return (
            <>
                <section className="SignUp_section">
                    <div>
                        <div className="signUptitle">이름</div>
                        <input className="signUpinfo" type="text" placeholder="이름을 입력해주세요" onChange={this.handleInputValue("name")} />
                        {
                            this.state.name_error ?
                                <div className="signup_error">{this.state.name_error}</div> :
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
                    {this.state.random ?
                        <div>
                        <div className="signUptitle">휴대폰 번호 인증</div>
                        <input className="signUpinfo" type="number" placeholder="인증번호 숫자 입력" onChange={this.handleInputValue("randomcheck")} />
                        {
                            this.state.phonecheck_error ?
                                <div className="signup_error">{this.state.phonecheck_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>: null
                }
                    <div className="Social_First_section">
                        <div onClick={this.props.onClickAgree("agree")} >
                            <span className="Social_First_span Pagreeall">
                                {this.props.state.agree1 && this.props.state.agree2 && this.props.state.agree3 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/agree_check.svg"} alt="체크" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/agree_uncheck.svg"} alt="언체크" />
                                }
                            </span>
                            <span className="Social_First_title">가입 진행 전체 동의</span>
                        </div>
                        <div onClick={this.props.onClickAgree("agree1")} >
                            <span className="Social_First_span Pagree">
                                {this.props.state.agree1 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                                }
                            </span>
                            <span className="Social_First_span" >본인은 만 14세 이상입니다(필수)</span>
                        </div>
                        <div onClick={this.props.onClickAgree("agree2")} style={{ margin: "10px 0px" }}>
                            <span className="Social_First_span Pagree">
                                {this.props.state.agree2 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                                }
                            </span>
                            <span className="Social_First_span"  onClick={this.openmodal(1)} style={{textDecorationLine: "underline"}}>개인정보 수집 및 이용 약관 동의(필수)</span>
                        </div>
                        <div onClick={this.props.onClickAgree("agree3")} style={{ marginBottom: "40px" }}>
                            <span className="Social_First_span Pagree">
                                {this.props.state.agree3 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="체크" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="언체크" />
                                }
                            </span>
                            <span className="Social_First_span" >이벤트 및 할인 혜택 안내 동의(선택)</span>
                        </div>

                        <div className="signin_buttonbox" style={{marginBottom: "56px"}}>
                            <div className={this.state.name && this.state.phone && this.state.randomcheck && this.props.state.agree1 && this.props.state.agree2 ? "signin_button":"signin_button_signin"}  
                            onClick={this.state.name && this.state.phone && this.state.randomcheck && this.props.state.agree1 && this.props.state.agree2 ? this.gotoNext: null}> 다음 </div>
                        </div>
                    </div>

                </section>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
            </>
        );
    }
}

export default SocialFirst;