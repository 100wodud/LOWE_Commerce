import './SignHeader.css';
import { Component } from 'react';


class SignHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: true,
        };
    }

    gotoBack = () => {
        window.history.go(-1)
    }


    gotohome = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        window.location.href = `/${funnel}`
    }

    render() {
        return (
            <header className="header2" style={ this.props.header &&(this.props.header === "회원정보 수정" || this.props.header === "회원가입" || this.props.header === " ") ? {borderBottom: "none" }:null}>
                {this.props.header ?
                    <div className="header_name" >{this.props.header}</div> :
                    <div></div>

                }
                {this.props.close ?
                    <div>
                        <img className="header_back" onClick={this.props.close} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                    </div> :
                    this.props.home ?
                        <div>
                            <img className="header_back" onClick={this.gotohome} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                        </div> :
                        this.props.header === "예약" || this.props.header === "리뷰" || this.props.header === "쿠폰" ?
                            <div>
                                <a href='/mypage'>
                                    <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                                </a>
                            </div> :
                            <div>
                                <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                            </div>
                }
                {
                    this.props.jump ? 
                    <div className='header_jump' onClick={this.props.gotoSubmit}>
                        건너뛰기
                    </div> : null
                }
            </header>
        );
    }
}
export default SignHeader;