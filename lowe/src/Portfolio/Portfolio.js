import { Component } from "react";
import Header from "./PortHeader";
import axios from "axios";
import "./Portfolio.css"
import DesignerList from "../Designer/DesignerList";

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


            axios.post("https://server.lowehair.kr/getDesignerDetail", {
                id: id,
            }).then((res) => {
                let coupon = ""
                if (res.data.coupons) {
                    coupon = JSON.parse(res.data.coupons)
                }
                this.setState({ designer: res.data, coupon: coupon })
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

    render() {
        let portfolio = decodeURI(window.location.pathname.split("/")[2]);
        let id = window.location.pathname.split("/")[3]
        return (
            <>
                <Header portfolio={true} />
                <div style={{ paddingTop: "61px" }}>
                    {
                        this.state.designer ?
                            <DesignerList data={this.state.designer} /> : null
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
                                    <a href={`/portfoliolist/${portfolio}${id ? "/" + id : ""}#${i}`}>

                                        {
                                            e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                                <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                                    <source src={e.img + "#t=0.5"} />
                                                </video> :
                                                <img src={e.img} alt="로위 포트폴리오 이미지" />
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
