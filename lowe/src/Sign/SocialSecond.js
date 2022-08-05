import React from "react";

class SocialSecond extends React.Component {
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
            birth_error: "",
            gender: "",
            birth: ""
        };
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    gotoSubmit = () =>{

        if (this.state.birth.length !== 8) {
            this.setState({
                birth_error: "생년월일을 확인해 주세요",
            })
        } else {
            this.setState({
                birth_error: "",
            })

            const clickgender = 'input[name="gender"]:checked';
            const genderlist = document.querySelectorAll(clickgender);
            let gender = '';

            genderlist.forEach((e) => {
                gender = gender + e.value;
            });
            let data = this.props.state.data;
            data.gender = gender;
            data.birth = this.state.birth;
            this.props.onClickSubmit(data)()
        }
    }



    render() {
        const clickgender = 'input[name="gender"]:checked';
        const genderlist = document.querySelectorAll(clickgender);
        let gender = '';

        genderlist.forEach((e) => {
            gender = gender + e.value;
        });
        return (
            <>
                <section className="SignUp_section">
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
                        <div className="signUptitle">생년월일</div>
                        <input className="signUpinfo" type="number" placeholder="생년월일 8자리를 입력해주세요. (ex. 19990226)" onChange={this.handleInputValue("birth")} />
                        {
                            this.state.birth_error ?
                                <div className="signup_error">{this.state.birth_error}</div> :
                                <div className="signup_error"></div>
                        }
                    </div>
                    <div style={{font: '400 14px "Montserrat"', marginBottom: "20px"}}>
                        *개인 정보는 맞춤 <strong>이벤트에 활용됩니다</strong>
                    </div>
                    <div className="signin_buttonbox">
                            <div className={ this.state.birth && gender  ? "signin_button":"signin_button_signin"} 
                            onClick={ this.state.birth && gender  ? this.gotoSubmit: null}> 시작하기 </div>
                        </div>
                </section>
            </>
        );
    }
}

export default SocialSecond;