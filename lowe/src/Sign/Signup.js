import React from "react";
import axios from "axios";
import "./Signup.css";
import SignHeader from "./SignHeader";
import SignupModal from "./SignupModal";
import ModalPhone from "./ModalPhone";
import moment from 'moment';
import TagManager from "react-gtm-module";
import { v4 as uuid } from 'uuid';

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
            agree: false,
            agree1: false,
            agree2: false,
            modalOpen: '',
            agree3: false,
            agree4: false,
            agree5: false,
            phonemodal: false,
            modalcomment: '',
        };
    }

    componentDidMount = () => {
        const tagManagerArgs = {
            dataLayer: {
            event: "view_sign_up_page",
            },
        };
        TagManager.dataLayer(tagManagerArgs);
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
            axios.post("https://server.lowehair.kr/loginIdCheck", {
                login_id: this.state.login_id,
            }).then((res) => {
                if (res.data.status === "false") {
                    this.setState({
                        login_id_error: "????????? ???????????? ?????? ???????????? ????????????",
                        status: false
                    })
                } else if (res.data.status === "true") {
                    this.setState({
                        login_id_error: "?????? ????????? ????????? ?????????",
                        idcheck: true
                    })

                }
            })
        } else {
            this.setState({
                login_id_error: "???????????? ????????? ?????????",
                status: false
            })
        }
    }

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

        if (!this.state.name) {
            this.setState({
                name_error: "????????? ??????????????????",
                status: false
            })
        } else {
            this.setState({
                name_error: "",
            })
        }

        if (!this.state.idcheck) {
            this.setState({
                login_id_error: "????????? ?????? ?????? ????????????",
                status: false
            })
        }

        if (this.state.birthday.length !== 8) {
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

        if (this.state.email.length < 3 || this.state.email.indexOf("@") < 1) {
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

        if (this.state.password.length < 8) {
            this.setState({
                password_error: "8??? ?????? ??????",
                status: false
            })
        } else {
            this.setState({
                password_error: "",
            })

        }

        if (this.state.password !== this.state.confirm) {
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


    onClickAgree = (key) => () => {
        if (key === "agree1") {
            this.setState({ agree1: !this.state.agree1 });
        } else if (key === "agree2") {
            this.setState({ agree2: !this.state.agree2 });
        } else if (key === "agree3") {
            this.setState({ agree3: !this.state.agree3 });
        } else if (key === "agree4") {
            this.setState({ agree4: !this.state.agree4 });
        } else if (key === "agree5") {
            this.setState({ agree5: !this.state.agree5 });
        } else if (key === "agree") {
            if (this.state.agree1 && this.state.agree2 && this.state.agree3 && this.state.agree4 && this.state.agree5) {
                this.setState({ agree1: false, agree2: false, agree3: false, agree4: false, agree5: false });
            } else {
                this.setState({ agree1: true, agree2: true, agree3: true, agree4: true, agree5: true });
            }
        }
    }

    sendSignup = () => {
        const clickgender = 'input[name="gender"]:checked';
        const genderlist = document.querySelectorAll(clickgender);
        let gender = '';

        genderlist.forEach((e) => {
            gender = gender + e.value;
        });

        if (this.state.status && this.state.idcheck && this.state.phonecheck && this.state.agree1 && this.state.agree2 && this.state.agree3 && this.state.agree4) {
            axios.post("https://server.lowehair.kr/joinUser", {
                name: this.state.name,
                login_id: this.state.login_id,
                password: this.state.password,
                phone: this.state.phone,
                birthday: this.state.birthday.slice(0, 4) + '-' + this.state.birthday.slice(4, 6) + '-' + this.state.birthday.slice(6, 8),
                gender: gender,
                agree: this.state.agree5,
                email: this.state.email,
                uuid: uuid()
            }).then((res) => {
                if (res.data.status === "false") {
                    this.setState({
                        phone_error: "?????? ??????????????? ???????????????. ????????? ????????? ????????? ?????????",
                        status: false
                    })
                } else {
                    let rou = window.location.pathname + "#signupsuccess";
                    window.location.replace(rou)
                    let date = new Date();
                    let expired = moment(date).add(3, "months")
                    axios.post("https://server.lowehair.kr/createCoupon", {
                        UserId: res.data.id,
                        price: 10000,
                        content: "[WELCOME] ???????????? ?????? ??????",
                        used: "1",
                        expired: expired,
                        minimum: 30000
                    })
                    axios.post("https://server.lowehair.kr/createCoupon", {
                        UserId: res.data.id,
                        price: 10000,
                        content: "[WELCOME] ??? ?????? ?????? ??????",
                        used: "1",
                        expired: expired,
                        minimum: 100000
                    })
                    setTimeout(() => {
                        let ndate = new Date().toISOString().slice(0,10)
                        const tagManagerArgs = {
                            dataLayer: {
                                event: 'sign_up',
                                user_id: res.data.uuid,
                                event_receive_agreement: this.state.agree5,
                                date: ndate,
                                method: 'general'
                            },
                        };
                        TagManager.dataLayer(tagManagerArgs);
                        this.openmodalPhone(`???????????? ?????? :)\n${this.state.login_id}??? ?????? ?????? ????????? ??????????????????!`)
                    })
                }
            }).catch(err => {
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
                <SignHeader header="????????????" />
                <section className="SignUp_section">
                    <div>
                        <div className="signUptitle">??????</div>
                        <input className="signUpinfo" type="text" placeholder="????????? ??????????????????" onChange={this.handleInputValue("name")} />
                        {
                            this.state.name_error ?
                                <div className="signup_error">{this.state.name_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">?????????</div>
                        <input className="signUpinfo" style={{ maxWidth: "223px", width: "70%" }} type="text" placeholder="??? : lowe1234" onChange={this.handleInputValue("login_id")} onInput={this.handleOnInput()} />
                        <div className="signUpcheckid" onClick={this.checksignupID}>????????????</div>
                        {
                            this.state.login_id_error ?
                                <div className={this.state.idcheck ? "signup_true" : "signup_error"}>{this.state.login_id_error}</div> :
                                <div className="signup_error"></div>
                        }
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
                        <div className="signUptitle">???????????? ??????</div>
                        <input className="signUpinfo" type="password" placeholder="??????????????? ?????? ??? ??????????????????" onChange={this.handleInputValue("confirm")} />
                        {
                            this.state.confirm_error ?
                                <div className="signup_error">{this.state.confirm_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">?????????</div>
                        <input className="signUpinfo" type="text" placeholder="??? : lowe@lowe.com" onChange={this.handleInputValue("email")} onInput={this.handleOnInput4()} />
                        {
                            this.state.email_error ?
                                <div className="signup_error">{this.state.email_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">????????? ??????</div>
                        <input className="signUpinfo" type="text" style={{ maxWidth: "197px", width: "65%" }} placeholder="????????? ??????????????????" onChange={this.handleInputValue("phone")} onInput={this.handleOnInput3()} />
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
                        <input className="signUpinfo" type="number" placeholder="???????????? 8????????? ??????????????????. (ex. 19990226)" onChange={this.handleInputValue("birthday")} />
                        {
                            this.state.birth_error ?
                                <div className="signup_error">{this.state.birth_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signUptitle">??????</div>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender2" value="2" />
                            <label htmlFor="gender2" className="signUp_radio">??????</label>
                        </span>
                        <span className="signUpinfo_radio">
                            <input name="gender" type="radio" id="gender1" value="1" />
                            <label htmlFor="gender1" className="signUp_radio">??????</label>
                        </span>
                        {
                            this.state.gender_error ?
                                <div className="signup_error">{this.state.gender_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div className="Social_First_section">
                        <div onClick={this.onClickAgree("agree")} >
                            <span className="Social_First_span Pagreeall">
                                {this.state.agree1 && this.state.agree2 && this.state.agree3 && this.state.agree4 && this.state.agree5 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/agree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/agree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_title">????????????</span>
                        </div>
                        <div onClick={this.onClickAgree("agree1")} style={{ marginBottom: "6px" }}>
                            <span className="Social_First_span Pagree">
                                {this.state.agree1 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_span"  >(??????) <span onClick={this.openmodal(1)} style={{ textDecorationLine: "underline" }}>????????? ??????????????? ???????????????</span></span>
                        </div>
                        <div onClick={this.onClickAgree("agree2")} style={{ margin: "6px 0px" }}>
                            <span className="Social_First_span Pagree">
                                {this.state.agree2 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_span"  >(??????) <span onClick={this.openmodal(4)} style={{ textDecorationLine: "underline" }}>??? 3??? ?????? ????????? ???????????????</span></span>
                        </div>
                        <div onClick={this.onClickAgree("agree3")} style={{ margin: "6px 0px" }}>
                            <span className="Social_First_span Pagree">
                                {this.state.agree3 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_span"  >(??????) <span onClick={this.openmodal(3)} style={{ textDecorationLine: "underline" }}>???????????? ?????? ????????? ???????????????</span></span>
                        </div>
                        <div onClick={this.onClickAgree("agree4")} style={{ margin: "6px 0px" }}>
                            <span className="Social_First_span Pagree">
                                {this.state.agree4 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_span" >(??????) ????????? ??? 14??? ???????????????</span>
                        </div>
                        <div onClick={this.onClickAgree("agree5")} style={{ margin: "6px 0 40px" }}>
                            <span className="Social_First_span Pagree">
                                {this.state.agree5 ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_check.svg"} alt="??????" /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/allagree_uncheck.svg"} alt="?????????" />
                                }
                            </span>
                            <span className="Social_First_span"  >(??????) <span onClick={this.openmodal(2)} style={{ textDecorationLine: "underline" }}>????????? ?????? ???????????? ???????????????</span></span>
                        </div>
                        <div className="signin_buttonbox">
                            <div className="signin_button" style={{ height: "60px", lineHeight: "60px" }} onClick={this.handleSignUp}> ???????????? </div>
                        </div>
                    </div>
                </section>
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        );
    }
}

export default Signup;