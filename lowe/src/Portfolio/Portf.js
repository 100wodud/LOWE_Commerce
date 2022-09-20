import { Component } from "react";
import axios from "axios";
import "./Portf.css"
import DesignerList from "../Designer/DesignerList";
import Footer from "../Nav/Footer";
import TagManager from "react-gtm-module";

class Portf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            designer: "",
            coupon: "",
        };
    }

    componentDidMount = () => {
        let route = window.location.pathname.split("/")[1]
        let id = Number(window.location.pathname.split("/")[2])
        if (route === "portfoliolist") {
            this.setState({ data: this.props.data })
        } else {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                id: id, isDesigner: true
            }).then((res) => {

                axios.post("https://server.lowehair.kr/getDesigner", {
                    id: res.data.portfolio[0].manager_id, isHashtag: true, isFavorite: true
                }).then((res) => {
                    const tagManagerArgs = {
                        dataLayer: {
                            event: 'view_portfolio_page',
                            portfolio_id: id,
                            branch: res.data[0].store,
                            designer: res.data[0].name
                        },
                    };
                    TagManager.dataLayer(tagManagerArgs);
                    let coupon = ""
                    if (res.data[0].coupons) {
                        coupon = JSON.parse(res.data[0].coupons)
                    }
                    this.setState({ designer: res.data[0], coupon: coupon })
                }).catch((err) => {
                    console.log(err)
                });
                this.setState({ data: res.data.portfolio[0] })
            })
        }
    }

    handleShare = (e) => () => {
        let route = window.location.pathname.split("/")[1]
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let url = "https://lowehair.kr/portfolio/" + e + funnel;
        if (navigator.share) {
            navigator.share({
                title: '로위 - 헤어스타일 스토어',
                text: '온라인 헤어스타일 스토어. 내가 원하는 모든 헤어스타일 부터 예약까지 한 번에, 로위(LOWE)',
                url: url,
            });
        } else {
            navigator.clipboard.writeText(url)
                .then(() => {
                    alert("링크복사 완료 주변에 알려주세요!");
                })
        }
        if (route === "portfolio") {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_portfolio_share',
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        } else if (route === "portfoliolist") {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_portfoliolist_share',
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }

    onClickBoard = (e) => async () => {
        let route = window.location.pathname.split("/")[1]
        if (route === "portfolio") {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_portfolio_product',
                    item_id: e.id,
                    item_name: e.name,
                    price: e.price
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        } else if (route === "portfoliolist") {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_portfoliolist_product',
                    item_id: e.id,
                    item_name: e.name,
                    price: e.price
                },
            };
            TagManager.dataLayer(tagManagerArgs);
        }
    }

    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let route = window.location.pathname.split("/")[1]
        return (
            <>
                <section id={this.props.id} className="Portf_section" style={route === "portfolio" ? { paddingBottom: "80px" } : null}>
                    {
                        route === "portfolio" && this.state.designer ?
                            <DesignerList data={this.state.designer} wish="click_portfolio_designer_wish" /> : null
                    }
                    {
                        this.state.data ?
                            <div>
                                <div>
                                    {
                                        this.state.data.img.slice(this.state.data.img.lastIndexOf('.'), this.state.data.img.lastIndexOf('.') + 4) === ".avi" || this.state.data.img.slice(this.state.data.img.lastIndexOf('.'), this.state.data.img.lastIndexOf('.') + 4) === ".mp4" ?
                                            <video preload="metadata" controls className="Portf_image" alt="포트폴리오 사진" >
                                                <source src={this.state.data.img + "#t=0.5"} />
                                            </video> :
                                            <img className="Portf_image" src={this.state.data.img} alt="포트폴리오 사진" />
                                    }
                                </div>
                                {
                                    this.state.data.Boards ?
                                        this.state.data.Boards.map((e) => (
                                            <a href={`/board/${e.id}${funnel}`} key={e.id} onClick={this.onClickBoard(e)}>
                                                <div className="Porf_Board">
                                                    <div>
                                                        <img src={e.thumbnail} alt={e.content} />
                                                    </div>
                                                    <div style={{ marginLeft: "12px" }}>
                                                        <div className="Porf_Board_designer"><strong>{e.designer_name} {this.state.data.Manager.rank}</strong> {e.store}</div>
                                                        <div className="Porf_Board_name">{e.name}</div>
                                                        <div className="Porf_Board_price">{e.eventType ? <span>{e.eventPrice + "%"}</span> : null}{e.price.comma()}원</div>

                                                    </div>
                                                </div>
                                            </a>
                                        )) : null
                                }

                                <div className="Porf_hashtags">
                                    {

                                        this.state.data.Hashtags ?
                                            this.state.data.Hashtags.map((e) => (
                                                <div className="Porf_hashtag_div" key={e.id}>
                                                    <a href={`/portfolios/${e.content}/${this.state.data.ManagerId}${funnel}`}>#{e.content}</a>
                                                </div>
                                            )) : null
                                    }
                                </div>
                                <div className="Porf_share">
                                    <img onClick={this.handleShare(this.state.data.id)} src={process.env.PUBLIC_URL + "/image/nav/board_share.svg"} alt="로위 상품 찜" />
                                </div>
                            </div> : null
                    }

                    {
                        route === "portfolio" && this.state.designer ?
                            <Footer /> : null
                    }
                </section>
            </>
        )
    }
}

export default Portf;
