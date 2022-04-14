import { Component } from 'react';
import "./Footer.css"


class Footer extends Component {
    constructor() {
        super();
        this.state = {
            accordion: true
        }
    }
    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <footer id='footer'>
                { window.localStorage.getItem("id") ?
                <>
                <a href={`/${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home.svg"} alt="로위 홈 아이콘" />
                </a>
                <a href={`/designers${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent.svg"} alt="로위 최신 아이콘" />
                </a>
                <a href={`/like${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like.svg"} alt="로위 찜 아이콘" />
                </a>
                <a href={`/mypage${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage.svg"} alt="로위 마이페이지 아이콘" />
                </a>
                </> :
                <>
                <a href={`/${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home.svg"} alt="로위 홈 아이콘" />
                </a>
                <a href={`/designers${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent.svg"} alt="로위 최신 아이콘" />
                </a>
                <a href={`/signin${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like.svg"} alt="로위 찜 아이콘" />
                </a>
                <a href={`/signin${funnel}`}>
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage.svg"} alt="로위 마이페이지 아이콘" />
                </a>
                </>
                }
            </footer >
        );
    }
}
export default Footer;