import { Component } from 'react';
import "./Mypage.css"
import axios from "axios";
import Footer from '../Nav/Footer';
import Edit from './Edit';
import SignoutModal from './SignoutModal';
import TagManager from "react-gtm-module";


class Mypage extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            open: false,
            date: [],
            pay: [],
            done: [],
            diff: false
        }
    }


    openmodal = () => {
        this.setState({ open: true });
    };
    closemodal = () => {
        this.setState({ open: false });
    };

    onClickonebyone = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_my_inquiry',
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }


    onClickRequest = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_my_designer_faq',
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    componentDidMount = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'view_my',
            },
        };
        TagManager.dataLayer(tagManagerArgs);

        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: id, isPayment: true
            })
                .then((res) => {
                    this.setState({ data: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })

            axios.post("https://server.lowehair.kr/getPayment", {
                UserId: Number(id),
            })
                .then((res) => {
                    let pay = [];
                    let date = [];
                    let done = [];
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].state === "결제완료") {
                                pay.push(res.data[i])
                            } else if (res.data[i].state === "예약확정" || res.data[i].state === "예약변경") {
                                date.push(res.data[i])
                            } else if (res.data[i].state === "시술완료") {
                                done.push(res.data[i])
                            }
                        }
                        this.setState({ pay: pay, date: date, done: done });
                        let pays = window.localStorage.getItem("payment_data");
                        if (JSON.stringify(res.data) !== pays) {
                            this.setState({ diff: true })
                        }
                    }
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            window.location.replace(`/signin${funnel}`)
        }
    }

    render() {
        let data = this.state.data;
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <>
                <section>
                    {data ?
                        <>
                            <div className="login_id">
                                <div className='login_id_div'>{data.login_id ? data.login_id : data.name}님</div>
                                <div className='login_point_circle'>
                                    <a href='/mypoint'>
                                        <span>
                                    <img style={{ marginRight: "2px",width: "16px", marginBottom: "-4px" }} src={process.env.PUBLIC_URL + "/image/nav/mypage_point.svg"} alt="로위 쿠폰" />
                                    </span>
                                    <span>보유 포인트 <strong>{data.point.comma()}</strong></span>
                                    </a>
                                </div>
                            </div>
                            <div className="mypage-filter">
                                <a href={`/mycoupons${funnel}`}>
                                    <img style={{ margin: "8px 0px" }} src={process.env.PUBLIC_URL + "/image/nav/mypage_coupon.svg"} alt="로위 쿠폰" />
                                    <div>쿠폰</div>
                                </a>
                                <a href={`/myreviews${funnel}`}>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/mypage_review.svg"} alt="로위 쿠폰" />
                                    <div>리뷰</div>
                                </a>
                                <a href={`/mypayments${funnel}`}>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/mypage_payment.svg"} alt="로위 쿠폰" />
                                    <div>예약{this.state.diff ? <span>˙</span> : null}</div>
                                </a>
                            </div>
                            {/* <div className="mypage-payment-check">
                                <div className="mypage-subtitle">진행중인 예약내역</div>
                                <a href={`/mypayments${funnel}`} className="mypage-payment-check-div">
                                    <div className="mypage-payment-check-content">
                                        <div  className="mypage-payment-check-content-number">
                                            {this.state.pay.length}
                                        </div>
                                        <div className="mypage-payment-check-content-content">
                                            결제완료
                                        </div>
                                    </div>
                                    <div className="mypage-payment-check-arrow">
                                    <img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" />
                                    </div>
                                    <div className="mypage-payment-check-content">
                                        <div  className="mypage-payment-check-content-number">
                                            {this.state.date.length}
                                        </div>
                                        <div className="mypage-payment-check-content-content">
                                            예약확정
                                        </div>
                                    </div>
                                    <div  className="mypage-payment-check-arrow">
                                    <img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" />
                                    </div>
                                    <div className="mypage-payment-check-content">
                                        <div  className="mypage-payment-check-content-number">
                                            {this.state.done.length}
                                        </div>
                                        <div className="mypage-payment-check-content-content">
                                            시술완료
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                            <Edit openmodal={this.openmodal} open={this.state.open} />
                            <div className="mypage-info">
                                <div className='mypage-info-title'>고객센터</div>
                                <div className='mypage-info-contact'>
                                    <div style={{ marginRight: "12px" }}><a href='http://pf.kakao.com/_xlzsPs/chat' onClick={this.onClickonebyone}>1:1 문의</a></div>
                                    <div><a href='https://lo-we.kr/request' onClick={this.onClickRequest}>디자이너 입점문의</a></div>
                                </div>
                                <div className='mypage-info-content'>
                                    운영시간 : 평일 10:00 ~ 18:00 (토,일/공휴일 휴무) <br />
                                    점심시간 : 평일 12:00 ~ 13:00
                                </div>
                            </div>
                            <div className="mypage-policy">
                                <div className='mypage-policy-name'>(주)벤틀스페이스 사업자 정보</div>
                                <div className='mypage-policy-content'>
                                    <span style={{ paddingRight: "8px", borderRight: "1px solid #DDDDDD" }}>대표자 : 양재원</span><span style={{ marginLeft: "8px" }}>사업자 등록번호 : 856-87-00762</span> <br />
                                    주소 : 서울특별시 마포구 동교로 25길10 3층 서일빌딩<br />
                                    통신판매업신고 : 2021-서울마포-2441<br />
                                    메일 주소 : info@bentlespace.com<br />
                                    대표번호 : 02-6953-2017
                                </div>
                            </div>
                        </> :
                        null
                    }
                </section>
                <SignoutModal open={this.state.open} closemodal={this.closemodal} />
                <Footer />
            </>
        );
    }
}
export default Mypage;