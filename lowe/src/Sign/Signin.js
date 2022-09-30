import React from "react";
import axios from "axios";
import "./Signin.css";
import SignHeader from "./SignHeader";
import TagManager from "react-gtm-module";

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


    componentDidMount = () =>{
        const tagManagerArgs = {
            dataLayer: {
                event: 'login_view',
            },
        };
        TagManager.dataLayer(tagManagerArgs);
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
                    let price = 0
                    for(let i=0; i < res.data.Payments.length; i++){
                        price = price + Number(res.data.Payments[i].pay_total)
                    }
                    const tagManagerArgs = {
                        dataLayer: {
                            event: 'login',
                            user_id: res.data.id,
                            purchase_count: res.data.Payments.length,
                            purchase_price: price,
                            review_count: res.data.Reviews.length,
                            remain_review_count: res.data.Payments.length - res.data.Reviews.length,
                            method: 'general'
                        },
                    };
                    TagManager.dataLayer(tagManagerArgs);
                    window.localStorage.setItem("id", res.data.id);
                    window.history.go(-1)
                } else {
                    this.setState({ error: "비밀번호를 확인해주세요" })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onClickNaver = () => {
        let host = "https://server.lowehair.kr/"
            // let type = '/test';
            // let client_id = 'L1LG3ZXKVBWzG4K_xg96';
            // const redirect_uri = host + 'oauth/naver' + type;;
            // if (type === '/local') client_id = 'VDCjWganBityopCwtNRR';
            // if (type === '/test') client_id = '6qt2bUAEaty7WfFiqDPW';
            // const state = 'lowehair_naver_state';
            // window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
        const redirect_uri = host + '/oauth/naver';
        const client_id = 'L1LG3ZXKVBWzG4K_xg96';
        const state = 'lowehair_naver_state';
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
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
                            <img src={process.env.PUBLIC_URL + "/image/nav/signin_logo.svg"} alt="로위 로고" />
                        </a>
                    </div>
                    <div>
                        <div className="signIntitle">아이디</div>
                        <input className="signUpinfo" onKeyPress={this.onclickEnter} type="text" placeholder="아이디를 입력해주세요" onChange={this.handleInputValue("login_id")} />
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
                                <div className="signin_error" style={{paddingBottom: "20px"}}>{this.state.error}</div> :
                                <div className="signin_error" style={{paddingBottom: "20px"}}></div>
                        }
                    </div>
                    <div className="signin_buttonbox">
                        <div className={this.state.login_id && this.state.password ?"signin_button" : "signin_button_signin"} onClick={this.state.login_id && this.state.password ?this.handleSignIn : null}>로그인</div>
                    </div>
                    <div className="signin_buttonbox">
                        <div className="signup_button" onClick={this.onClickNaver}><span><img style={{position: "absolute"}} src={process.env.PUBLIC_URL + "/image/nav/sign_up.svg"} alt="네이버 소셜로그인" /></span><span style={{float: "none", margin: "0"}}>네이버로 로그인</span></div>
                    </div>
                    <div className="signin_find">
                        <div>
                            <a href={`/findmyid${funnel}`}>아이디 찾기 </a>
                        </div>
                        <div className="signin_find_second">
                            <a href={`/findmyid#pw${funnel}`}>비밀번호 찾기 </a>
                        </div>
                        <div >
                            <a href={`/signup${funnel}`}>회원가입</a>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Signin;