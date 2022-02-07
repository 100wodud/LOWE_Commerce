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
            gender: ""

        };
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    handleSignIn = () => {
        this.setState({ error: "" });
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/loginUser", {
            login_id: this.state.login_id,
            password: this.state.password,
        })
            .then((res) => {
                if (res.data.id) {
                    window.localStorage.setItem("id", res.data.id);
                    window.location.replace("/")
                } else {
                    this.setState({ error: "아이디/비밀번호를 확인해주세요" })
                }
            })
            .catch(err => {
                console.log("에러")
                this.setState({
                    error: "존재하는 이메일 입니다"
                })
            })
    }

    render() {
        return (
            <>
                <SignHeader header=" " />
                <section className="SignIn_section">
                    <div className="signin_logo" >
                        <img src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="로위 로고" />
                    </div>
                    <div>
                        <div className="signIntitle">아이디</div>
                        <input className="signUpinfo" type="text" placeholder="예 : lowe1234" onChange={this.handleInputValue("login_id")} />
                        <div className="signin_error"></div>
                    </div>
                    <div>
                        <div className="signIntitle">비밀번호</div>
                        <input className="signUpinfo" type="password" placeholder="비밀번호를 입력해주세요" onChange={this.handleInputValue("password")} />
                        {
                            this.state.error ?
                                <div className="signin_error">{this.state.error}</div> :
                                <div className="signin_error"></div>
                        }
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signin_button" onClick={this.handleSignIn}>로그인</div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signup_button"><a href="/signup">회원가입</a></div>
                    </div>
                </section>
            </>
        );
    }
}

export default Signin;