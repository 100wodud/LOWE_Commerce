import React from "react";
import axios from "axios";
import "./Signup.css";
import SignHeader from "./SignHeader";
import SignupModal from "./SignupModal";
import ModalPhone from "./ModalPhone";

class EditmyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            login_id: "",
            password: "",
            confirm: "",
            newpassword: "",
            phone: "",
            birthday: "",
            gender: "",
            email: "",
            login_id_error: "",
            password_error: "",
            newpassword_error: "",
            confirm_error: "",
            phone_error: "",
            phonecheck_error: "",
            gender_error: "",
            birth_error: "",
            email_error: "",
            status: false,
            idcheck: true,
            random: 0,
            randomcheck: 0,
            phonecheck: true,
            agree1: false,
            agree2: false,
            modalOpen: '',
            agree3: false,
            phonemodal: false,
            naver: false
        };
    }

    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: id,
            })
                .then((res) => {
                    let birth = ""
                    let gender = res.data[0].gender
                    if(res.data[0].birthday.slice(0, 4) !== "0000"){
                        birth =res.data[0].birthday.slice(0, 10).replaceAll("-", "")
                        document.getElementById("ebirthday").value = birth;
                    }
                    document.getElementById("ename").value = res.data[0].name;
                    document.getElementById("elogin_id").value = res.data[0].login_id;
                    document.getElementById("ephone").value = res.data[0].phone;
                    document.getElementById("eemail").value = res.data[0].email;
                    this.setState({
                        name: res.data[0].name,
                        login_id: res.data[0].login_id,
                        phone: res.data[0].phone,
                        birthday: birth,
                        gender: gender,
                        email: res.data[0].email,
                        agree3: res.data[0].agree,
                        naver: res.data[0].naver
                    })

                })
                .catch(err => {
                    console.log("??????")
                })
        } else {
            window.location.href = `/signin${funnel}`
        }
    }

    openmodal = (e) => () => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
        if (key === "phone") {
            this.setState({ phonecheck: false, phone_error: "" })
        }
    };

    checksignupPhone = () => {
        if (this.state.phone.length < 10) {
            this.setState({
                phone_error: "??????????????? ????????? ?????????",
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
            axios.post("https://server.lowehair.kr/checkPhoneNumber", {
                phone: this.state.phone,
                number: number
            }).then((res) => {
            })
            setTimeout(() => {
                this.openmodalPhone("????????????")
            })
        }
    }

    handleSignUp = () => {
        this.setState({
            status: true,
        })


        if (!this.state.idcheck) {
            this.setState({
                login_id_error: "????????? ?????? ?????? ????????????",
                status: false
            })
        }

        if (this.state.birthday.length !== 8 && !this.state.naver) {
            this.setState({
                birth_error: "??????????????? ????????? ?????????",
                status: false
            })
        } else {
            this.setState({
                birth_error: "",
            })

        }

        if (this.state.phone.length < 10) {
            this.setState({
                phone_error: "??????????????? ????????? ?????????",
                status: false
            })
        } else {
            this.setState({
                phone_error: "",
            })

        }

        if (!this.state.email || this.state.email.length < 3 || this.state.email.indexOf("@") < 1) {
            this.setState({
                email_error: "????????? ????????? ????????? ????????????. ????????? ????????? ????????? ?????????",
                status: false
            })
        } else {
            this.setState({
                email_error: "",
            })

        }

        if (this.state.random !== Number(this.state.randomcheck)) {
            this.setState({
                phonecheck_error: "??????????????? ??????????????????.",
                status: false
            })
        } else {
            this.setState({
                phonecheck_error: "",
            })
        }

        if (this.state.password.length < 8 && !this.state.naver) {
            this.setState({
                password_error: "8??? ?????? ??????",
                status: false
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if (this.state.newpassword.length < 8 && this.state.newpassword) {
            this.setState({
                newpassword_error: "8??? ?????? ??????",
                status: false
            })
        } else {
            this.setState({
                newpassword_error: "",
            })

        }

        if (this.state.newpassword !== this.state.confirm) {
            this.setState({
                confirm_error: "????????? ??????????????? ??????????????????",
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
        if (this.state.status && this.state.phonecheck && this.state.agree1 && this.state.agree2) {
            axios.patch(`https://server.lowehair.kr/user/${window.localStorage.getItem("id")}`, {
                name: this.state.name,
                login_id: this.state.login_id,
                password: this.state.password,
                new_password: this.state.newpassword,
                phone: this.state.phone,
                birthday: this.state.birthday.slice(0, 4) + '-' + this.state.birthday.slice(4, 6) + '-' + this.state.birthday.slice(6, 8),
                gender: this.state.gender,
                agree: this.state.agree3,
                email: this.state.email
            }).then((res) => {
                setTimeout(() => {
                    this.openmodalPhone(`??????????????? ?????????????????????`)
                })
            }).catch(err => {
                this.setState({
                    password_error: "??????????????? ????????? ?????????",
                })
                setTimeout(() => {
                    this.openmodalPhone(`?????? ????????? ????????? ????????????.\n?????? ????????? ?????????`)
                })
            })
        } else {
            setTimeout(() => {
                this.openmodalPhone(`?????? ????????? ????????? ????????????.\n?????? ????????? ?????????`)
            })
        }

    }

    //??????,?????? ?????? ?????? ??????
    handleOnInput = () => (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    }


    handleOnInput2 = () => (e) => {
        e.target.value = e.target.value.replace(/[a-zA-Z0-9]|[ [\]{}()<>?|`~!@#$%^&*-_+=,.;:"'\\]/g, '')
    }


    //?????? ?????? ?????? ??????
    handleOnInput3 = () => (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    handleOnInput4 = () => (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '')
    }

    render() {
        return (
            <>
                <SignHeader header="???????????? ??????" />
                <section className="SignUp_section">
                    <div>
                        <div className="signUptitle">??????</div>
                        <input id="ename" className="signUpinfo" type="text" placeholder="????????? ??????????????????" onChange={this.handleInputValue("name")} onInput={this.handleOnInput2()} />
                        {
                            this.state.error ?
                                <div className="signup_error">{this.state.error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    {this.state.naver ? null :
                        <>
                            <div>
                                <div className="signUptitle">?????????</div>
                                <input id="elogin_id" className="signUpinfo" type="text" placeholder="??? : lowe1234" onChange={this.handleInputValue("login_id")} onInput={this.handleOnInput()} disabled />
                                <div className="signup_error"></div>
                            </div>
                            <div>
                                <div className="signUptitle">????????????</div>
                                <input className="signUpinfo" type="password" placeholder="??????????????? ??????????????????" onChange={this.handleInputValue("password")} />
                                {
                                    this.state.password_error ?
                                        <div className="signup_error">{this.state.password_error}</div> :
                                        <div className="signup_error"></div>
                                }
                            </div>
                            <div>
                                <div className="signUptitle">??? ????????????</div>
                                <input className="signUpinfo" type="password" placeholder="??????????????? ?????? ??? ??????????????????" onChange={this.handleInputValue("newpassword")} />
                                {
                                    this.state.newpassword_error ?
                                        <div className="signup_error">{this.state.newpassword_error}</div> :
                                        <div className="signup_error"></div>
                                }
                            </div>
                            <div>
                                <div className="signUptitle">??? ???????????? ??????</div>
                                <input className="signUpinfo" type="password" placeholder="??????????????? ?????? ??? ??????????????????" onChange={this.handleInputValue("confirm")} />
                                {
                                    this.state.confirm_error ?
                                        <div className="signup_error">{this.state.confirm_error}</div> :
                                        <div className="signup_error"></div>
                                }
                            </div>
                        </>
                    }
                    <div>
                        <div className="signUptitle">?????????</div>
                        <input id="eemail" className="signUpinfo" type="text" placeholder="??? : lowe@lowe.com" onChange={this.handleInputValue("email")} onInput={this.handleOnInput4()} />
                        {
                            this.state.email_error ?
                                <div className="signup_error">{this.state.email_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">????????? ??????</div>
                        <input id="ephone" className="signUpinfo" type="text" style={{ maxWidth: "197px", width: "65%" }} placeholder="????????? ??????????????????" onChange={this.handleInputValue("phone")} onInput={this.handleOnInput3()} />
                        <button className="signUpcheckid" style={{ width: "113px" }} onClick={this.checksignupPhone}>???????????? ??????</button>
                        {
                            this.state.phone_error ?
                                <div className="signup_error">{this.state.phone_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    {this.state.random ?
                        <div>
                            <div className="signUptitle">????????????</div>
                            <input className="signUpinfo" type="number" placeholder="????????? ??????????????????" onChange={this.handleInputValue("randomcheck")} />
                            {
                                this.state.phonecheck_error ?
                                    <div className="signup_error">{this.state.phonecheck_error}</div> :
                                    <div className="signup_error"></div>
                            }
                        </div> : null
                    }
                    <div>
                        <div className="signUptitle">????????????</div>
                        <input id="ebirthday" className="signUpinfo" type="number" placeholder="???????????? 8????????? ??????????????????. (ex. 19990226)" onChange={this.handleInputValue("birthday")} />
                        {
                            this.state.birth_error ?
                                <div className="signup_error">{this.state.birth_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    {this.state.naver ? null :
                    <div>
                        <div className="signUptitle">??????</div>
                        <span className="signUpinfo_radio" style={{display: "none"}}>
                            <input name="gender" type="radio" id="gender0" value="0" checked={this.state.gender === 0 ? true : false} readOnly disabled />
                            <label htmlFor="gender0" className="signUp_radio">??????</label>
                        </span>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender2" value="2" checked={this.state.gender === 2 ? true : false} readOnly disabled />
                            <label htmlFor="gender2" className="signUp_radio">??????</label>
                        </span>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender1" value="1" checked={this.state.gender === 1 ? true : false} readOnly disabled />
                            <label htmlFor="gender1" className="signUp_radio">??????</label>
                        </span>
                        {
                            this.state.gender_error ?
                                <div className="signup_error">{this.state.gender_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    }
                    <div>
                        <div >
                            <input className="signup_agree" name="agree" id="agree1" type="checkbox" value="1" onClick={() => { this.setState({ agree1: !this.state.agree1 }) }} />
                            <label className="signup_agree_text" htmlFor="agree1"><span className="signup_agree_text" onClick={this.openmodal(1)} style={{ fontWeight: "700" }}>???????????? ??????</span> ???????????? ??????(??????)</label>
                        </div>
                        <div style={{ marginTop: "18px" }}>
                            <input className="signup_agree" name="agree" id="agree2" type="checkbox" value="2" onClick={() => { this.setState({ agree2: !this.state.agree2 }) }} />
                            <label className="signup_agree_text" htmlFor="agree2">????????? ??? 14??? ???????????????(??????)</label>
                        </div>
                        <div style={{ marginTop: "18px", marginBottom: "20px" }}>
                            <input className="signup_agree" checked={this.state.agree3 ? true : false} name="agree" id="agree3" type="checkbox" value="3" onClick={() => { this.setState({ agree3: !this.state.agree3 }) }} readOnly />
                            <label htmlFor="agree3" className="signup_agree_text"><span onClick={this.openmodal(2)} className="signup_agree_text" style={{ fontWeight: "700" }}>????????? ??????</span>??? ???????????????(??????)</label>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", marginBottom: "20px", marginTop: "40px" }}>
                        <span><a href="/withdrawal" style={{ font: "700 14px Noto Sans", marginRight: "2px" }}>????????????</a></span><span><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="??????" /></span>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" style={{ height: "60px", lineHeight: "60px" }} onClick={this.handleSignUp}> ???????????? ?????? </div>
                    </div>
                </section>
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default EditmyInfo;