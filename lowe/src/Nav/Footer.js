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
        let funnel = "";
        let path = window.location.pathname;
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <footer id='footer'>
                <a href={`/${funnel}`}>
                    {path === '/' ?
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home_act.svg"} alt="로위 홈 아이콘" />
                            <p><strong>홈</strong></p>
                        </> :
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_home.svg"} alt="로위 홈 아이콘" />
                            <p>홈</p>
                        </>
                    }
                </a>
                <a href={`/designers${funnel}`}>
                    {path === '/designers' || path.indexOf('/designer') !== -1 ?
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent_act.svg"} alt="로위 최신 아이콘" />
                            <p><strong>모아보기</strong></p>
                        </> :
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_recent.svg"} alt="로위 최신 아이콘" />
                            <p>모아보기</p>
                        </>
                    }
                </a>
                <a href={`/like${funnel}`}>
                    {path === '/like' ?
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like_act.svg"} alt="로위 찜 아이콘" />
                            <p><strong>찜</strong></p>
                        </> :
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_like.svg"} alt="로위 찜 아이콘" />
                            <p>찜</p>
                        </>
                    }
                </a>
                <a href={`/mypage${funnel}`}>
                    {path === '/mypage' || path === '/mycoupons' || path === '/mypayments' || path === '/myreviews' ?
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage_act.svg"} alt="로위 마이 아이콘" />
                            <p><strong>마이</strong></p>
                        </> :
                        <>
                            <img className="footer_icon" src={process.env.PUBLIC_URL + "/image/nav/footer_mypage.svg"} alt="로위 마이 아이콘" />
                            <p>마이</p>
                        </>
                    }
                </a>
            </footer >
        );
    }
}
export default Footer;