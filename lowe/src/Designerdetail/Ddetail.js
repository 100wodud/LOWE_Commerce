import { Component } from "react";
import Header from "../Nav/Header";
import axios from "axios";
import Firstsec from "./Firstsec";
import DesignerList from "../Designer/DesignerList";
import "./Ddetail.css"
import Secondsec from "./Secondsec";
import ModalPhone from "../Sign/ModalPhone";
import TagManager from "react-gtm-module";

class Ddetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            list: 1,
            coupon: "",
            modal: false,
            modalcomment: "",
            review: [],
            imgreview: [],
            click: false,
        };
    }

    openmodalPhone = (e) => () => {
        this.setState({ modal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ modal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        document.addEventListener('scroll', function () {
            var target = document.getElementById("filter_trigger2");
            var abBottom = window.pageYOffset + target.getBoundingClientRect().top + 50
            var currentScrollValue = document.documentElement.scrollTop;
            let header = document.getElementById("scroll2");
            if (currentScrollValue > abBottom) {
                header.classList.add("fixed");
            }
            if (currentScrollValue < abBottom) {
                header.classList.remove("fixed");
            }
        });


        let id = window.location.pathname.split("/")[2];
        let userid = Number(window.localStorage.getItem("id"));
        let arr = [];
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = '/'
        }
        axios.post("https://server.lowehair.kr/getDesigner", {
            id: id, isBoard: true, isCategory: true, isFavorite: true, isHashtag: true, isImage: true, isSurgery: true, isReview: true, isPortfolio: true, isPortfolioHashtag: true, surgeryOpen : false
        }).then((res) => {
            let coupon = ""
            if (res.data[0].coupons) {
                coupon = JSON.parse(res.data[0].coupons)
            }
            this.setState({ data: res.data[0], coupon: coupon })
            let arr = []
            arr.push(res.data[0].Hashtags[0].content);
            arr.push(res.data[0].Hashtags[1].content);
            const tagManagerArgs = {
                dataLayer: {
                    event: 'view_designer',
                    branch: res.data[0].store,
                    designer: res.data[0].name,
                    tags: arr
                },
            };
            TagManager.dataLayer(tagManagerArgs);

        }).catch((err) => {
            console.log(err)
        });


        axios.post(`https://server.lowehair.kr/getReview`, {
            ManagerId: id,
        }).then((res) => {
            if (res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].Images.length) {
                        arr.push(res.data[i])
                    }
                }
                this.setState({ review: res.data, imgreview: arr })
            }
        }).catch((err) => {
            console.log(err)
        });
        let tab = window.location.href.split("#")[1];
        if (tab === "Ddetailmenu" || tab === "Ddetailmenus") {
            this.setState({ list: 2 })
        } else if (tab === "Ddetailreview" || tab === "Ddetailreviews") {
            this.setState({ list: 3 })
        } else if (tab === "Ddetailinfo" || tab === "Ddetailinfoes") {
            this.setState({ list: 4 })
        } else if (tab === "Ddetailstyle" || tab === "Ddetailstyles") {
            this.setState({ list: 5 })
        } else if (tab === "Ddetailhome" || tab === "Ddetailhomes") {
            this.setState({ list: 1 })
        } else {
            this.setState({ list: 1 })
        }


        if (!this.state.click) {
            this.setState({ click: true })
            if (userid) {
                axios.post("https://server.lowehair.kr/click", {
                    type: 4,
                    ManagerId: id,
                    UserId: userid,
                    funnel: funnel
                })
                    .then((res) => {
                    }).catch((err) => {
                    });
            } else {
                axios.post("https://server.lowehair.kr/click", {
                    type: 4,
                    ManagerId: id,
                    funnel: funnel
                })
                    .then((res) => {
                    }).catch((err) => {
                    });
            }
        }
    }

    onClickCoupon = () => {
        let user_id = Number(window.localStorage.getItem("id"));
        axios.post("https://server.lowehair.kr/createCoupon", {
            UserId: user_id,
            price: Number(this.state.coupon.couponprice),
            content: this.state.coupon.coupontext,
            used: "1",
            expired: this.state.coupon.couponexpired,
            minimum: Number(this.state.coupon.couponlimit),
            ManagerId: this.state.data.id
        }).then((res) => {
            setTimeout(() => {
                this.openmodalPhone(`???????????? ?????? :)`)()
            })
        }).catch((err) => {
            setTimeout(() => {
                this.openmodalPhone(`?????? ????????? ?????? ?????????`)()
            })
        })
    }


    onclickList = (e) => () => {
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
                type: 5,
                ManagerId: id,
                UserId: userid,
                funnel: funnel,
                tab_num: Number(e)
            })
                .then((res) => {
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 5,
                ManagerId: id,
                funnel: funnel,
                tab_num: Number(e)
            })
                .then((res) => {
                }).catch((err) => {
                });
        }

        this.setState({ list: e })
        let rou = window.location.pathname + "#header_trigger2"
        if (e === 2) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailmenus"
        } else if (e === 2.5) {
            this.setState({ list: 2 })
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_designer_signature_view_all',
                },
            };
            TagManager.dataLayer(tagManagerArgs);
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailmenus"
        } else if (e === 3) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailreviews"
        } else if (e === 3.5) {
            this.setState({ list: 3 })
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_designer_review_view_all',
                },
            };
            TagManager.dataLayer(tagManagerArgs);
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailreviews"
        } else if (e === 4) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailinfoes"
        } else if (e === 5) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailstyles"
        } else if (e === 5.5) {
            this.setState({ list: 5 })
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_designer_style_view_all',
                },
            };
            TagManager.dataLayer(tagManagerArgs);
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailstyles"
        } else if (e === 1) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Ddetailhomes"
        }

    }

    onClickReserve = (e) => () => {
        let id = window.location.pathname.split("/")[2];
        let userid = Number(window.localStorage.getItem("id"));
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = '/'
        }
        if (1 === Number(e)) {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_desinger_naver_reservation',
                },
            };
            TagManager.dataLayer(tagManagerArgs);

            if (userid) {
                axios.post("https://server.lowehair.kr/click", {
                    type: 7,
                    ManagerId: id,
                    UserId: userid,
                    funnel: funnel,
                    tab_num: Number(e)
                })
                    .then((res) => {
                        window.location.href = this.state.data.reserve_url
                    }).catch((err) => {
                    });
            } else {
                axios.post("https://server.lowehair.kr/click", {
                    type: 7,
                    ManagerId: id,
                    funnel: funnel,
                    tab_num: Number(e)
                })
                    .then((res) => {
                        window.location.href = this.state.data.reserve_url
                    }).catch((err) => {
                    });
            }
            
        } else {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_desinger_lowe_reservation',
                },
            };
            TagManager.dataLayer(tagManagerArgs);

            if (userid) {
                axios.post("https://server.lowehair.kr/click", {
                    type: 7,
                    ManagerId: id,
                    UserId: userid,
                    funnel: funnel,
                    tab_num: Number(e)
                })
                    .then((res) => {
                        this.setState({ list: 2 })
                        window.location.href = window.location.pathname + "#Ddetailmenu"
                    }).catch((err) => {
                    });
            } else {
                axios.post("https://server.lowehair.kr/click", {
                    type: 7,
                    ManagerId: id,
                    funnel: funnel,
                    tab_num: Number(e)
                })
                    .then((res) => {
                        this.setState({ list: 2 })
                        window.location.href = window.location.pathname + "#Ddetailmenu"
                    }).catch((err) => {
                    });
            }

        }

    }

    render() {
        return (
            <>
                <Header header="clear" scroll={true} />
                {this.state.data && this.state.data.user_state === 1 ?
                    <>
                        <Firstsec data={this.state.data} />
                        <DesignerList data={this.state.data} detail={true} wish="click_designer_wish" />
                        {
                            this.state.coupon ?
                                <div className="Ddetail_coupon_div">
                                    <div className="Ddetail_coupon" onClick={this.onClickCoupon}>
                                        <span style={{ lineHeight: "48px", paddingLeft: "20px" }}>
                                            <span style={{ font: '700 13px "Montserrat"', color: "#FF6746" }}>{this.state.coupon.couponprice.comma()}???</span>
                                            <span style={{ font: '700 13px "Noto Sans' }}> ?????? ??????</span>
                                            <span style={{ marginLeft: "8px", font: '700 12px "Montserrat"', color: "#9C9C9C" }}>{this.state.coupon.couponexpired.slice(2, 8).replaceAll("-", ".")}01~{this.state.coupon.couponexpired.slice(2, 10).replaceAll("-", ".")}</span>
                                        </span>
                                        <span style={{ paddingLeft: "8px" }}><img src={process.env.PUBLIC_URL + "/image/nav/coupon_downlord.svg"} alt="?????? ?????? ????????????" /></span>
                                    </div>
                                </div> :
                                null
                        }

                        <div className="Ddetail_reserve_div">
                            <div onClick={this.onClickReserve(1)} style={{ border: "1px solid #3EC62A", color: "#3EC62A" }}>
                                <div>????????? ????????????</div>
                            </div>
                            <div onClick={this.onClickReserve(2)} style={{ border: "1px solid #FF5732", color: "#FF5732", zIndex: 5 }}>
                                <div className="Lowe_reservation"><img src={process.env.PUBLIC_URL + "/image/nav/lowe_reservation.svg"} alt="?????? ?????? ????????????" /></div>
                                <div style={{ zIndex: 1 }}>????????? ??????</div>
                            </div>
                        </div>
                        <div id="filter_trigger2" />
                        <div className="Ddetail-filter" id="scroll2">
                            <p id="Ddetailhome" className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>???</p>
                            <p id="Ddetailmenu" className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>??????</p>
                            <p id="Ddetailstyle" className={(this.state.list === 5 ? "push_button" : 'pull_button')} onClick={this.onclickList(5)}>?????????</p>
                            <p id="Ddetailreview" className={(this.state.list === 3 ? "push_button" : 'pull_button')} onClick={this.onclickList(3)}>??????</p>
                            <p id="Ddetailinfo" className={(this.state.list === 4 ? "push_button" : 'pull_button')} onClick={this.onclickList(4)}>??????</p>
                        </div>
                        <Secondsec list={this.state.list} data={this.state.data} review={this.state.review} imgreview={this.state.imgreview} openmodalPhone={this.openmodalPhone} onclickList={this.onclickList} />
                    </>
                    : <div style={{ height: "100vh", textAlign: "center", lineHeight: "100vh" }}>
                        ????????? ????????? ????????? :)
                    </div>
                }
                <ModalPhone open={this.state.modal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Ddetail;
