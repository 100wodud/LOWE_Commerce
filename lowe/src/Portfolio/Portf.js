import { Component } from "react";
import axios from "axios";
import "./Portf.css"
import DesignerList from "../Designer/DesignerList";
import Footer from "../Nav/Footer";

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
                id: id,
            }).then((res) => {

                axios.post("https://server.lowehair.kr/getDesignerDetail", {
                    id: res.data.portfolio[0].manager_id,
                }).then((res) => {
                    let coupon = ""
                    if (res.data.coupons) {
                        coupon = JSON.parse(res.data.coupons)
                    }
                    this.setState({ designer: res.data, coupon: coupon })
                }).catch((err) => {
                    console.log(err)
                });
                this.setState({ data: res.data.portfolio[0] })
            })
        }
    }

    handleShare = (e) => () => {
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
                <section id={this.props.id} className="Portf_section">
                    {
                        route === "portfolio" && this.state.designer ?
                            <DesignerList data={this.state.designer} /> : null
                    }
                    {
                        this.state.data ?
                            <div>
                                <div>
                                    {
                                        this.state.data.img.slice(this.state.data.img.lastIndexOf('.'), this.state.data.img.lastIndexOf('.') + 4) === ".avi" || this.state.data.img.slice(this.state.data.img.lastIndexOf('.'), this.state.data.img.lastIndexOf('.') + 4) === ".mp4" ?
                                        <video preload="metadata" controls className="Portf_image"  alt="포트폴리오 사진" > 
                                            <source src={this.state.data.img+"#t=0.5"} />
                                        </video>:
                                        <img className="Portf_image" src={this.state.data.img} alt="포트폴리오 사진" />
                                    }
                                </div>
                                {
                                    this.state.data.Boards ?
                                        this.state.data.Boards.map((e) => (
                                            <a href={`/board/${e.id}${funnel}`} key={e.id}>
                                                <div className="Porf_Board">
                                                    <div>
                                                        <img src={e.thumbnail} alt={e.content} />
                                                    </div>
                                                    <div style={{ marginLeft: "12px" }}>
                                                        <div className="Porf_Board_designer"><strong>{e.designer_name} 원장</strong> {e.store}</div>
                                                        <div className="Porf_Board_name">{e.name}</div>
                                                        <div className="Porf_Board_price">{e.eventType ? <span>{e.eventPrice + "%"}</span>: null}{e.price.comma()}원</div>

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
