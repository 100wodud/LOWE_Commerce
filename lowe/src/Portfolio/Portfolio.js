import { Component } from "react";
import Header from "./PortHeader";
import axios from "axios";
import "./Portfolio.css"
import DesignerList from "../Designer/DesignerList";
import TagManager from "react-gtm-module";

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            designer: "",
            coupon: ""
        };
    }

    componentDidMount = () => {
        let portfolio = decodeURI(window.location.pathname.split("/")[2]);
        let id = Number(window.location.pathname.split("/")[3])
        if (id) {
            axios.post("https://server.lowehair.kr/getPortfolio", {
                ManagerId: id,
                hashtag: portfolio
            }).then((res) => {
                this.setState({ data: res.data.portfolio })
            })

            axios.post("https://server.lowehair.kr/getDesigner", {
                id: id, isHashtag: true, isFavorite: true
            }).then((res) => {
                let coupon = ""
                if (res.data[0].coupons) {
                    coupon = JSON.parse(res.data[0].coupons)
                }
                const tagManagerArgs = {
                    dataLayer: {
                        event: 'view_portfolios_page',
                        tag: portfolio,
                        branch: res.data[0].store,
                        designer: res.data[0].name
                    },
                };
                TagManager.dataLayer(tagManagerArgs);

                this.setState({ designer: res.data[0], coupon: coupon })
            }).catch((err) => {
                console.log(err)
            });
        } else {
            if (portfolio === "") {
                axios.post("https://server.lowehair.kr/getPortfolio", {
                }).then((res) => {
                    this.setState({ data: res.data.portfolio })
                })

            } else {
                axios.post("https://server.lowehair.kr/getPortfolio", {
                    hashtag: portfolio
                }).then((res) => {
                    this.setState({ data: res.data.portfolio })
                })
            }
        }
    }

    onClickImage = (e) => (i)=> async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_portfolios_image',
                portfolio_id: e.id,
                index: i
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        let portfolio = decodeURI(window.location.pathname.split("/")[2]);
        let id = window.location.pathname.split("/")[3]
        return (
            <>
                <Header portfolio={true} />
                <div style={{ paddingTop: "61px" }}>
                    {
                        this.state.designer ?
                            <DesignerList data={this.state.designer} wish="click_portfolios_designer_wish" /> : null
                    }
                </div>
                <div style={{ padding: "12px 12px 16px 12px" }}>
                    <div className="Portfoliolist_title">#Style Tag</div>
                    <div className="Portfoliolist_content">#{portfolio}</div>
                </div>
                <div className="Portfoliolist_images">
                    {
                        this.state.data.length ?
                            this.state.data.map((e, i) => (
                                <div key={e.id}>
                                    <a href={`/portfoliolist/${portfolio}${id ? "/" + id : ""}#${i}`} onClick={this.onClickImage(e)(i)}>

                                        {
                                            e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                                <video preload="metadata" className="Portf_image" alt="??????????????? ??????" >
                                                    <source src={e.img + "#t=0.5"} />
                                                </video> :
                                                <img src={e.img} alt="?????? ??????????????? ?????????" />
                                        }
                                    </a>
                                </div>
                            )) : null
                    }
                </div>
            </>
        )
    }
}

export default Portfolio;
