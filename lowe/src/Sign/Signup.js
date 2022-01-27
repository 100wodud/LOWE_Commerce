import React from "react";
import axios from "axios";
import "./Signup.css";
import SignHeader from "./SignHeader";
import SignupModal from "./SignupModal";

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
            login_id_error: "",
            password_error: "",
            confirm_error: "",
            phone_error: "",
            phonecheck_error: "",
            gender_error: "",
            status: false,
            idcheck: false,
            random: 0,
            randomcheck: 0,
            phonecheck: false,
            agree1: false,
            agree2: false,
            modalOpen: '',
        };
    }

    openmodal = (e) =>() => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    checksignupID = () => {
        axios.post("http://3.36.218.192:5000/loginIdCheck", {
            login_id: this.state.login_id,
        }).then((res) => {
            console.log(res.data)
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
    }

    checksignupPhone = () => {
        let number = Math.floor(Math.random() * 1000000) + 100000;
        if (number > 1000000) {
            number = number - 100000;
        }
        this.setState({random: number, phonecheck: true})
        console.log(number); 
        axios.post("http://3.36.218.192:5000/checkPhoneNumber", {
            phone: this.state.phone,
            number: number
        }).then((res) => {
            console.log(res.data)
        })
    }

    handleSignUp = () => {
        this.setState({
            status: true,
        })

        console.log(this.state)

        if (!this.state.idcheck) {
            this.setState({
                login_id_error: "아아디 중복 확인 해주세요",
                status: false
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if(this.state.random !== Number(this.state.randomcheck)){
            this.setState({
                phonecheck_error: "x 인증번호를 확인해주세요.",
                status: false
            })
        } else {
            this.setState({
                phonecheck_error: "",
            })
        }

        if (this.state.password.length < 8) {
            this.setState({
                password_error: "x 8자 이상 입력",
                status: false
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if (this.state.password !== this.state.confirm) {
            this.setState({
                confirm_error: "x 동일한 비밀번호를 입력해주세요",
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
        axios.post("http://3.36.218.192:5000/joinUser", {
             name: this.state.name,
             login_id: this.state.login_id,
             password: this.state.password,
             phone: this.state.phone,
             birthday: this.state.birthday.replaceAll('/','-'),
             gender: gender
         }).then((res) => {
             axios.post("http://3.36.218.192:5000/createCoupon", {
                 UserId: res.data.id,
                 price: 10000,
                 content: "회원가입 쿠폰",
                 used: "1"
             })
             window.alert(`회원가입 완료 :)\n${this.state.login_id}님 만을 위한 쿠폰을 보내드렸어요!`)
             window.location.replace("/")
         }).catch(err => {
             this.setState({
                 phone_error: "이미 회원가입된 번호입니다. 입력한 번호를 확인해 주세요",
                 status: false
             })
         })
     }

}

    render() {
        console.log(this.state)
        return (
            <>
                <SignHeader header="회원가입" />
                <section className="SignUp_section">
                    <div>
                        <div className="signUptitle">이름</div>
                        <input className="signUpinfo" type="text" placeholder="이름을 입력해주세요" onChange={this.handleInputValue("name")} />
                        {
                            this.state.error ?
                                <div className="signup_error">{this.state.error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">아이디</div>
                        <input className="signUpinfo" style={{ maxWidth: "223px", width: "70%" }} type="text" placeholder="예 : lowe1234" onChange={this.handleInputValue("login_id")} />
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
                        <div className="signUptitle">휴대폰 번호</div>
                        <input className="signUpinfo" type="text" style={{ maxWidth: "197px", width: "65%" }}  placeholder="숫자만 입력해주세요" onChange={this.handleInputValue("phone")} />
                        <button className="signUpcheckid" style={{width: "113px"}} onClick={this.checksignupPhone}>인증번호 받기</button>
                        {
                            this.state.phone_error ?
                                <div className="signup_error">{this.state.phone_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    {this.state.random ?
                        <div>
                        <div style={{fontSize: "10px"}}>{this.state.random}</div>
                            <div className="signUptitle">휴대폰 번호 인증</div>
                            <input className="signUpinfo"  type="number" placeholder="숫자만 입력해주세요" onChange={this.handleInputValue("randomcheck")} />
                            {
                                this.state.phonecheck_error ?
                                    <div className="signup_error">{this.state.phonecheck_error}</div> :
                                    <div className="signup_error"></div>
                            }
                        </div> : null
                    }
                    <div>
                        <div className="signUptitle">생년월일</div>
                        <input className="signUpinfo" type="text" placeholder="YYYY / MM / DD" onChange={this.handleInputValue("birthday")} />
                        <div className="signup_error"></div>
                    </div>
                    <div>
                        <div className="signUptitle">성별</div>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender1" value="1" />
                            <label htmlFor="gender1" className="signUp_radio">남자</label>
                        </span>

                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender2" value="2" />
                            <label htmlFor="gender2" className="signUp_radio">여자</label>
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
                                <label className="signup_agree_text" onClick={this.openmodal(1)}>개인정보 수집 이용약관 동의(필수)</label>
                            </div>
                            <div style={{ marginTop: "12px"}}>
                                <input className="signup_agree" name="agree" id="agree2" type="checkbox" value="2" />
                                <label className="signup_agree_text" >본인은 만 14세 이상입니다(필수)</label>
                            </div>
                            <div style={{ marginTop: "12px", marginBottom: "20px" }}>
                                <input className="signup_agree" name="agree" id="agree2" type="checkbox" value="3" onClick={() => { this.setState({ agree2: !this.state.agree2 }) }} />
                                <label className="signup_agree_text" onClick={this.openmodal(2)}>마케팅 활용에 동의합니다(선택)</label>
                            </div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" style={{ height: "60px", lineHeight: "60px" }} onClick={this.handleSignUp}> 회원가입 </div>
                    </div>
                </section>
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
            </>
        );
    }
}

export default Signup;