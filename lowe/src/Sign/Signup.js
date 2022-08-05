import React from "react";
import axios from "axios";
import "./Signup.css";
import SignHeader from "./SignHeader";
import SignupModal from "./SignupModal";
import ModalPhone from "./ModalPhone";
import moment from 'moment';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            login_id: "",
            password: "",
            confirm: "",
            phone: "",
            birthday: "",
            gender: "",
            email: "",
            name_error: "",
            login_id_error: "",
            password_error: "",
            confirm_error: "",
            phone_error: "",
            phonecheck_error: "",
            gender_error: "",
            birth_error: "",
            email_error: "",
            status: false,
            idcheck: false,
            random: 0,
            randomcheck: 0,
            phonecheck: false,
            agree1: false,
            agree2: false,
            modalOpen: '',
            agree3: false,
            phonemodal: false,
            modalcomment: '',
        };
    }

    openmodal = (e) => () => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };


    openmodalPhone = (e) => {
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

    checksignupID = () => {
        if (this.state.login_id.length > 1) {
            axios.post("http://54.180.117.244:5000/loginIdCheck", {
                login_id: this.state.login_id,
            }).then((res) => {
                if (res.data.status === "false") {
                    this.setState({
                        login_id_error: "동일한 아이디가 이미 등록되어 있습니다",
                        status: false
                    })
                } else if (res.data.status === "true") {
                    this.setState({
                        login_id_error: "사용 가능한 아이디 입니다",
                        idcheck: true
                    })

                }
            })
        } else {
            this.setState({
                login_id_error: "아이디를 입력해 주세요",
                status: false
            })
        }
    }

    checksignupPhone = () => {
        if (this.state.phone.length < 10) {
            this.setState({
                phone_error: "전화번호를 확인해 주세요",
                status: false
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
            axios.post("http://54.180.117.244:5000/checkPhoneNumber", {
                phone: this.state.phone,
                number: number
            }).then((res) => {
            })
            setTimeout(() => {
                this.openmodalPhone("인증번호")
            })
        }
    }

    handleSignUp = () => {
        this.setState({
            status: true,
        })

        if (!this.state.name) {
            this.setState({
                name_error: "이름을 임력해주세요",
                status: false
            })
        } else {
            this.setState({
                name_error: "",
            })
        }

        if (!this.state.idcheck) {
            this.setState({
                login_id_error: "아아디 중복 확인 해주세요",
                status: false
            })
        }

        if (this.state.birthday.length !== 8) {
            this.setState({
                birth_error: "생년월일을 확인해 주세요",
                status: false
            })
        } else {
            this.setState({
                birth_error: "",
            })

        }

        if (this.state.phone.length < 10) {
            this.setState({
                phone_error: "전화번호를 확인해 주세요",
                status: false
            })
        } else {
            this.setState({
                phone_error: "",
            })

        }

        if (this.state.email.length < 3 || this.state.email.indexOf("@") < 1) {
            this.setState({
                email_error: "올바른 이메일 형식이 아닙니다. 입력한 메일을 확인해 주세요",
                status: false
            })
        } else {
            this.setState({
                email_error: "",
            })

        }

        if (this.state.random !== Number(this.state.randomcheck)) {
            this.setState({
                phonecheck_error: "인증번호를 확인해주세요.",
                status: false
            })
        } else {
            this.setState({
                phonecheck_error: "",
            })
        }

        if (this.state.password.length < 8) {
            this.setState({
                password_error: "8자 이상 입력",
                status: false
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if (this.state.password !== this.state.confirm) {
            this.setState({
                confirm_error: "동일한 비밀번호를 입력해주세요",
                status: false
            })
        } else {
            this.setState({
                confirm_error: "",
            })
        }

        setTimeout(() => {
            this.sendSignup();
        }, 0);

    }

    sendSignup = () => {
        const clickgender = 'input[name="gender"]:checked';
        const genderlist = document.querySelectorAll(clickgender);
        let gender = '';

        genderlist.forEach((e) => {
            gender = gender + e.value;
        });

        if (this.state.status && this.state.idcheck && this.state.phonecheck && this.state.agree1 && this.state.agree2) {
            axios.post("http://54.180.117.244:5000/joinUser", {
                name: this.state.name,
                login_id: this.state.login_id,
                password: this.state.password,
                phone: this.state.phone,
                birthday: this.state.birthday.slice(0, 4) + '-' + this.state.birthday.slice(4, 6) + '-' + this.state.birthday.slice(6, 8),
                gender: gender,
                agree: this.state.agree3,
                email: this.state.email
            }).then((res) => {
                if (res.data.status === "false") {
                    this.setState({
                        phone_error: "이미 회원가입된 번호입니다. 입력한 번호를 확인해 주세요",
                        status: false
                    })
                } else {
                    let rou = window.location.pathname + "#signupsuccess";
                    window.location.replace(rou)
                    let date = new Date();
                    let expired = moment(date).add(3, "months")
                    axios.post("http://54.180.117.244:5000/createCoupon", {
                        UserId: res.data.id,
                        price: 10000,
                        content: "[WELCOME] 회원가입 축하 쿠폰",
                        used: "1",
                        expired: expired,
                        minimum: 30000
                    })
                    axios.post("http://54.180.117.244:5000/createCoupon", {
                        UserId: res.data.id,
                        price: 10000,
                        content: "[WELCOME] 첫 예약 축하 쿠폰",
                        used: "1",
                        expired: expired,
                        minimum: 100000
                    })
                    setTimeout(() => {
                        this.openmodalPhone(`회원가입 완료 :)\n${this.state.login_id}님 만을 위한 쿠폰을 보내드렸어요!`)
                    })
                }
            }).catch(err => {
            })
        } else {
            setTimeout(() => {
                this.openmodalPhone(`잘못 입력한 항목이 있습니다.\n다시 입력해 주세요`)
            })
        }

    }

    //영문,숫자 이외 전부 제외
    handleOnInput = () => (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    }


    handleOnInput2 = () => (e) => {
        e.target.value = e.target.value.replace(/[a-zA-Z0-9]|[ [\]{}()<>?|`~!@#$%^&*-_+=,.;:"'\\]/g, '')
    }


    //숫자 이외 전부 제외
    handleOnInput3 = () => (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    handleOnInput4 = () => (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '')
    }

    render() {
        return (
            <>
                <SignHeader header="회원가입" />
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
                        <div className="signUptitle">아이디</div>
                        <input className="signUpinfo" style={{ maxWidth: "223px", width: "70%" }} type="text" placeholder="예 : lowe1234" onChange={this.handleInputValue("login_id")} onInput={this.handleOnInput()} />
                        <div className="signUpcheckid" onClick={this.checksignupID}>중복확인</div>
                        {
                            this.state.login_id_error ?
                                <div className={this.state.idcheck ? "signup_true" : "signup_error"}>{this.state.login_id_error}</div> :
                                <div className="signup_error"></div>
                        }
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
                    <div>
                        <div className="signUptitle">이메일</div>
                        <input className="signUpinfo" type="text" placeholder="예 : lowe@lowe.com" onChange={this.handleInputValue("email")} onInput={this.handleOnInput4()} />
                        {
                            this.state.email_error ?
                                <div className="signup_error">{this.state.email_error}</div> :
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
                            <div className="signUptitle">인증번호</div>
                            <input className="signUpinfo" type="number" placeholder="숫자만 입력해주세요" onChange={this.handleInputValue("randomcheck")} />
                            {
                                this.state.phonecheck_error ?
                                    <div className="signup_error">{this.state.phonecheck_error}</div> :
                                    <div className="signup_error"></div>
                            }
                        </div> : null
                    }
                    <div>
                        <div className="signUptitle">생년월일</div>
                        <input className="signUpinfo" type="number" placeholder="생년월일 8자리를 입력해주세요. (ex. 19990226)" onChange={this.handleInputValue("birthday")} />
                        {
                            this.state.birth_error ?
                                <div className="signup_error">{this.state.birth_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">성별</div>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender2" value="2" />
                            <label htmlFor="gender2" className="signUp_radio">여자</label>
                        </span>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender1" value="1" />
                            <label htmlFor="gender1" className="signUp_radio">남자</label>
                        </span>
                        {
                            this.state.gender_error ?
                                <div className="signup_error">{this.state.gender_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div >
                            <input className="signup_agree" name="agree" id="agree1" type="checkbox" value="1" onClick={() => { this.setState({ agree1: !this.state.agree1 }) }} />
                            <label className="signup_agree_text" htmlFor="agree1"><span className="signup_agree_text" onClick={this.openmodal(1)} style={{ fontWeight: "700" }}>개인정보 수집</span> 이용약관 동의(필수)</label>
                        </div>
                        <div style={{ marginTop: "18px" }}>
                            <input className="signup_agree" name="agree" id="agree2" type="checkbox" value="2" onClick={() => { this.setState({ agree2: !this.state.agree2 }) }} />
                            <label className="signup_agree_text" htmlFor="agree2">본인은 만 14세 이상입니다(필수)</label>
                        </div>
                        <div style={{ marginTop: "18px", marginBottom: "20px" }}>
                            <input className="signup_agree" name="agree" id="agree3" type="checkbox" value="3" onClick={() => { this.setState({ agree3: !this.state.agree3 }) }} />
                            <label htmlFor="agree3" className="signup_agree_text"><span onClick={this.openmodal(2)} className="signup_agree_text" style={{ fontWeight: "700" }}>마케팅 활용</span>에 동의합니다(선택)</label>
                        </div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" style={{ height: "60px", lineHeight: "60px" }} onClick={this.handleSignUp}> 회원가입 </div>
                    </div>
                </section>
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default Signup;