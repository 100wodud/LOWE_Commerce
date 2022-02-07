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
        return (
            <footer>
                { window.localStorage.getItem("id") ?
                <>
                <a href="/">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home.svg"} alt="로위 홈 아이콘" />
                </a>
                <a href="/like">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like.svg"} alt="로위 찜 아이콘" />
                </a>
                <a href="/recently">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent.svg"} alt="로위 최신 아이콘" />
                </a>
                <a href="/mypage">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage.svg"} alt="로위 마이페이지 아이콘" />
                </a>
                </> :
                <>
                <a href="/">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home.svg"} alt="로위 홈 아이콘" />
                </a>
                <a href="/signin">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like.svg"} alt="로위 찜 아이콘" />
                </a>
                <a href="/recently">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent.svg"} alt="로위 최신 아이콘" />
                </a>
                <a href="/signin">
                    <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage.svg"} alt="로위 마이페이지 아이콘" />
                </a>
                </>
                }
            </footer >
        );
    }
}
export default Footer;