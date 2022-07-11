import React from "react";
import axios from "axios";
import "./Signin.css";
import SignHeader from "./SignHeader";

class Signin extends React.Component {
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
            error: "",
            id_error: ""
        };
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };


    onclickEnter = (e) => {
        if(e.key === 'Enter') {
            this.handleSignIn();
        }
    }

    handleSignIn = () => {
        this.setState({ error: "" });
        if (this.state.login_id.length > 1) {
            axios.post("https://server.lowehair.kr/loginIdCheck", {
                login_id: this.state.login_id,
            }).then((res) => {
                if (res.data.status === "false") {
                    this.setState({
                        id_error: "",
                    })
                } else if (res.data.status === "true") {
                    this.setState({
                        id_error: "아이디를 확인해주세요",
                    })

                }
            })
        } else {
            this.setState({
                id_error: "아이디를 확인해주세요",
            })
        }

        axios.post("https://server.lowehair.kr/loginUser", {
            login_id: this.state.login_id,
            password: this.state.password,
        })
            .then((res) => {
                if (res.data.id) {
                    window.localStorage.setItem("id", res.data.id);
                    window.history.go(-1)
                } else {
                    this.setState({ error: "비밀번호를 확인해주세요" })
                }
            })
            .catch(err => {
                console.log("에러")
            })
    }

    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <>
                <SignHeader header=" " />
                <section className="SignIn_section">
                    <div className="signin_logo" >
                        <a href={`/${funnel}`} className="signin_logo" >
                            <img src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="로위 로고" />
                        </a>
                    </div>
                    <div>
                        <div className="signIntitle">아이디</div>
                        <input className="signUpinfo" onKeyPress={this.onclickEnter} type="text" placeholder="예 : lowe1234" onChange={this.handleInputValue("login_id")} />
                        {
                            this.state.id_error ?
                                <div className="signin_error">{this.state.id_error}</div> :
                                <div className="signin_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signIntitle">비밀번호</div>
                        <input className="signUpinfo" onKeyPress={this.onclickEnter} type="password" placeholder="비밀번호를 입력해주세요" onChange={this.handleInputValue("password")} />
                        {
                            this.state.error ?
                                <div className="signin_error">{this.state.error}</div> :
                                <div className="signin_error"></div>
                        }
                    </div>
                    <div>
                        <div className="signin_find"><a href={`/findmyid${funnel}`}>아이디 / 비밀번호 찾기 </a><span><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" /></span></div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" onClick={this.handleSignIn}>로그인</div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signup_button"><a href={`/signup${funnel}`}>회원가입</a></div>
                    </div>
                </section>
            </>
        );
    }
}

export default Signin;