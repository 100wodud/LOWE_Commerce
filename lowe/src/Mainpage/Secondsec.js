import { Component } from "react";
import Goodslist from "../Home/Goodslist";
import "./Secondsec.css";
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll';
import TagManager from "react-gtm-module";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: [],
        };
    }

    componentDidMount = () => {
        axios.post("https://server.lowehair.kr/getBoard", {
            order: "click", isClick: true, open: "1", isHashtag: true
        }).then((res) => {
            this.setState({ favorite: res.data.slice(0, 8) })
        })

        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: id,
            })
                .then((res) => {
                    this.setState({ user: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })
        }
    }
    onClickStore = (e) => async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_main_branch_procedure',
                branch: e
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }
    onClickStoreAll = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_main_branch_procedure_view_all'
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }

    onClickCategory = (e)=> async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_main_top_category',
                branch: e
            },
        };
        await TagManager.dataLayer(tagManagerArgs);

    }

    render() {
        return (
            <section className="Mainpage_second_section">
                <div className="Mainpage_second_search">
                    <div>
                        <a href="/category/tag/event" onClick={this.onClickCategory("이벤트")}>
                            <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_icon1.png"} alt="메인페이지 아이콘" />
                            <div>이벤트</div>
                        </a>
                    </div>
                    <div>
                        <a href="/category/tag/1" onClick={this.onClickCategory("컷")}>
                            <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_icon2.svg"} alt="메인페이지 아이콘" />
                            <div>컷</div>
                        </a>
                    </div>
                    <div>
                        <a href="/category/tag/2" onClick={this.onClickCategory("펌")}>
                            <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_icon3.svg"} alt="메인페이지 아이콘" />
                            <div>펌</div>
                        </a>
                    </div>
                    <div>
                        <a href="/category/tag/3" onClick={this.onClickCategory("염색")}>
                            <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_icon4.svg"} alt="메인페이지 아이콘" />
                            <div>염색</div>
                        </a>
                    </div>
                    <div>
                        <a href="/category/tag/5" onClick={this.onClickCategory("클리닉")}>
                            <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_icon5.svg"} alt="메인페이지 아이콘" />
                            <div>클리닉</div>
                        </a>
                    </div>
                </div>
                <div className="Mainpage_second_recommand">
                    <div style={{ paddingLeft: "12px" }}>{this.state.user ? this.state.user.login_id ? this.state.user.login_id + "님," : this.state.user.name + "님," : null} 이 시술 어때요? 😉</div>
                    <div className="Recent_total_list" id="special_recent_list" style={{ paddingLeft: "0" }}>
                        <ScrollContainer className="Recent_total_slide" style={{ marginTop: "20px", height: "280px" }} >
                            {
                                this.state.favorite.map((e,i) => (
                                    <Goodslist e={e} key={e.id} i={i} event="click_main_top_product" wish="click_main_top_product_wish" />
                                ))
                            }
                        </ScrollContainer>
                    </div>
                </div>
                <div className="Mainpage_second_store">
                    <div><strong>매장별 시술보기</strong></div>
                    <div>
                        <a href="/category/store/all" onClick={this.onClickStoreAll}>
                            <span>
                                <span>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </a>
                    </div>
                </div>

                <div style={{ marginBottom: "44px" }}>
                    <div className="Mainpage_second_store_slide">
                        <ScrollContainer className="Mainpage_second_store_slides" >
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/신촌" onClick={this.onClickStore("신촌")}>
                                    <div>신촌</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_01.svg"} alt="메인 지점" />
                                </a>
                            </div>
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/홍대입구역"  onClick={this.onClickStore("홍대입구역")}>
                                    <div>홍대입구역</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_02.svg"} alt="메인 지점" />
                                </a>
                            </div>
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/L7홍대" onClick={this.onClickStore("L7홍대")} >
                                    <div>L7홍대</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_03.svg"} alt="메인 지점" />
                                </a>
                            </div>
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/합정" onClick={this.onClickStore("합정")} >
                                    <div>합정</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_04.svg"} alt="메인 지점" />
                                </a>
                            </div>
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/강남" onClick={this.onClickStore("강남")} >
                                    <div>강남</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_05.svg"} alt="메인 지점" />
                                </a>
                            </div>
                            <div className="Mainpage_second_store_slide_list">
                                <a href="/stores/이수역" onClick={this.onClickStore("이수역")} >
                                    <div>이수역</div>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Mainpage_store_06.svg"} alt="메인 지점" />
                                </a>
                            </div>
                        </ScrollContainer>
                    </div>
                </div>
            </section>
        )
    }
}

export default Secondsec;
