import { Component } from "react";
import axios from "axios";
import "./Secondsec.css"
import DesignerList from "../Designer/DesignerList";
import Fifthsec from "./Fifthsec";
import ModalPhone from "../Sign/ModalPhone";
import TagManager from "react-gtm-module";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            like: false,
            banner: '',
            designer: [],
            phonemodal: false,
            modalcomment: '',
            pointmore: false
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    openmodalPhone = (e) => () => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        let id = this.props.data.board.id;
        let user = Number(window.localStorage.getItem("id"));
        if (id && user) {
            axios.post("https://server.lowehair.kr/boardLikeChk", {
                user: user,
                id: id,
            })
                .then((res) => {
                    if (res.data && res.data.heart === 1) {
                        this.setState({ like: true })
                    } else {
                        this.setState({ like: false })
                    }
                });
        }

        axios.post("https://server.lowehair.kr/getAllBanner", {})
            .then((res) => {
                if (res.data.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 2 && this.props.data.board.eventType === 1) {
                            this.setState({ banner: res.data[i] })
                        } else if (res.data[i].type === 3 && this.props.data.board.eventType === 0) {
                            this.setState({ banner: res.data[i] })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })

        this.setState({ designer: this.props.designer[0] })
    }


    async onclickLike(e) {
        e.preventDefault();
        let id = this.props.data.board.id;
        let user = window.localStorage.getItem("id");
        let like = 0;
        if (this.state.like) {
            like = 1;
        } else {
            like = 0;
        }
        if (id && user) {
            await axios.post("https://server.lowehair.kr/boardLikeUpdate", {
                id: id,
                user: user,
                heart: like
            }).then((res) => {
                if(res.data){
                  window.naverInnerScript(2)
                }
                this.setState({ like: !this.state.like })
            });
        }

        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_price_wish'
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }

    handleShare = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_price_share',
            },
        };
        TagManager.dataLayer(tagManagerArgs);

        let url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: '?????? - ??????????????? ?????????',
                text: '????????? ??????????????? ?????????. ?????? ????????? ?????? ??????????????? ?????? ???????????? ??? ??????, ??????(LOWE)',
                url: url,
            });
        } else {
            navigator.clipboard.writeText(url)
                .then(() => {
                    alert("???????????? ?????? ????????? ???????????????!");
                })
        }
    }

    onClickReserve = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_naver_reservation',
            },
        };
        TagManager.dataLayer(tagManagerArgs);
        let id = window.location.pathname.split("/")[2];
        let userid = Number(window.localStorage.getItem("id"));
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = '/'
        }

        if (userid) {
            axios.post("https://server.lowehair.kr/click", {
                type: 7,
                BoardId: id,
                ManagerId: this.props.data.board.ManagerId,
                UserId: userid,
                funnel: funnel,
                tab_num: 3
            })
                .then((res) => {
                    window.location.href = this.props.designer.reserve_url
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 7,
                BoardId: id,
                ManagerId: this.props.data.board.ManagerId,
                funnel: funnel,
                tab_num: 3
            })
                .then((res) => {
                    window.location.href = this.props.designer.reserve_url
                }).catch((err) => {
                });
        }

    }

    onClickBanner = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_top_banner',
                title: this.state.banner.title
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    onClickPointmoreView = () => {
        this.setState({ pointmore: !this.state.pointmore })
    }



    render() {
        let user = window.localStorage.getItem("id");
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let hash = false
        if (this.props.data.board.Hashtags) {
            this.props.data.board.Hashtags.filter((v) => {
                return v.content.indexOf("????????????") !== -1 ?
                    hash = true : null
            })
        }
        return (
            <>
                <section className="Board_second">
                    <div className="Board_second_section">
                        {
                            hash ?
                                <div className="Board_second_signature_box">
                                    ????????????
                                </div> : null
                        }
                        <div className="Board_title">{this.props.data.board.name}</div>
                        <div className="Board_content">{this.props.data.board.content}</div>
                        {this.props.data.board.eventType ?
                            <div className="Board_real_price">{(Math.round(this.props.data.board.price / (100 - this.props.data.board.eventPrice) * 100 / 1000) * 1000).comma()}???</div> :
                            <div className="Board_real_price"> </div>
                        }
                        <div className="Board_second_price">
                            <div className="Board_price" >
                                {this.props.data.board.eventType ?
                                    <span className="Board_price_percent">{this.props.data.board.eventPrice}%</span> :
                                    <></>
                                }
                                <span className="Board_price_price">{this.props.data.board.price.comma()}???</span>
                            </div>
                            <div>
                                {user ?
                                    this.state.like === false ?
                                        <img src={process.env.PUBLIC_URL + "/image/nav/goods_dislike2.svg"} className="Board_like" alt="?????? ?????? ???" onClick={this.onclickLike} /> :
                                        <img src={process.env.PUBLIC_URL + "/image/nav/goods_like2.svg"} className="Board_like" alt="?????? ?????? ???" onClick={this.onclickLike} /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/goods_dislike2.svg"} className="Board_like" alt="?????? ?????? ???" onClick={this.openmodalPhone("???????????? ????????? ????????? ?????????")} />
                                }
                                <img onClick={this.handleShare} src={process.env.PUBLIC_URL + "/image/nav/board_share.svg"} className="Board_share" alt="?????? ?????? ???" />
                            </div>
                        </div>
                        <div onClick={this.onClickPointmoreView} className="Board_second_addpoint" style={{ height: "28px", paddingTop: "20px" }}>
                            <div style={{ width: "80px", fontWeight: "700" }}>????????????</div>
                            <div style={{ width: "calc(100% - 100px)" }}>?????? <strong>+{(this.props.data.board.price * 0.05 + 1000).toFixed().comma()}P</strong> ??????</div>
                            <img className={(this.state.pointmore === false ? "rev" : '')} src={process.env.PUBLIC_URL + "/image/nav/board_point_moreview.svg"} alt="????????? ?????????"></img>
                        </div>
                        {this.state.pointmore ?
                            <div className="Board_second_addpoint" style={{ borderBottom: "1px solid #DDDDDD", height: "42px", paddingBottom: "20px" }} >
                                <div style={{ width: "80px", fontWeight: "700" }}></div>
                                <div style={{ width: "calc(100% - 80px)", whiteSpace: "pre-line", marginBottom: "20px" }}>{`?????? ?????? ??? ?????? +${(this.props.data.board.price * 0.05).toFixed().comma()}P ??????\n?????? ?????? ??? ?????? +1,000P ??????`}</div>
                            </div> :
                            <div className="Board_second_addpoint" style={{ borderBottom: "1px solid #DDDDDD", paddingBottom: "10px" }}></div>
                        }
                        <div className="Board_second_addprice">
                            <div style={{ width: "80px", fontWeight: "700" }}>????????????</div>
                            <div style={{ width: "calc(100% - 180px)", maxWidth: "270px", whiteSpace: "pre-line" }}>??? {Math.floor(this.props.data.board.taken / 60)}?????? {this.props.data.board.taken % 60 !== 0 ? this.props.data.board.taken % 60 + "???" : null}</div>
                            <div className="Board_second_naver">
                                <div>
                                    <img onClick={this.onClickReserve} src={process.env.PUBLIC_URL + "/image/nav/boarddetail_naver.svg"} alt="?????????" />
                                </div>
                            </div>
                        </div>
                        <div className="Board_second_addprice">
                            <div style={{ width: "80px", fontWeight: "700" }}>????????????</div>
                            <div style={{ width: "calc(100% - 80px)", whiteSpace: "pre-line", marginBottom: "20px" }}>{this.props.data.board.addPrice}</div>
                        </div>
                        <div>
                            {this.props.designer ?
                                <DesignerList data={this.props.designer} board={true} event="click_item_designer" wish="click_item_designer_wish" />
                                : null
                            }
                        </div>
                    </div>
                    <Fifthsec data={this.props.data} top={true} />
                    <a href={this.state.banner.url + funnel} className="Board_banner" onClick={this.onClickBanner}>
                        <img src={this.state.banner.img} alt="????????? ??????" />
                    </a>
                    <div id="filter_trigger" />
                </section>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}
   
export default Secondsec;