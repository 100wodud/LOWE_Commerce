import { Component } from "react";
import Header from "../Nav/Header";
import axios from "axios";
import Firstsec from "./Firstsec";
import "./Sdetail.css"
import Secondsec from "./Secondsec";
import ModalPhone from "../Sign/ModalPhone";
import data from "../data/Store"

class Sdetail extends Component {
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


        let id = decodeURI(window.location.pathname.split("/")[2]);
        let datas = {}
        for (let i = 0; i < data.length; i++) {
            if (data[i].store.indexOf(id) !== -1) {
                datas = data[i]
            }
        }

        axios.post("https://server.lowehair.kr/getBoard", {
            open: "1", isReview: true, store: id + "점"
        })
            .then((res) => {
                datas.Boards = res.data;
                axios.post("https://server.lowehair.kr/getDesigner", {
                    isRank: true, isFavorite: true, isReview: true, isPayment: true, isPortfolio: true, isHashtag: true, store: id
                }).then((res) => {
                    let arr = []
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].user_state === 1) {
                            arr.push(res.data[i])
                        }
                    }
                    datas.Designers = arr;

        axios.post("https://server.lowehair.kr/getPortfolio", {
            store:id, isDesigner: true
        }).then((res)=>{
            datas.Portfolios = res.data.portfolio
            this.setState({ data: datas })
        })
                })
            })

        axios.post(`https://server.lowehair.kr/getReview`, {
            store: id
        }).then((res) => {
            let arr = []
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
        if (tab === "Sdetailmenu" || tab === "Sdetailmenus") {
            this.setState({ list: 2 })
        } else if (tab === "Sdetailreview" || tab === "Sdetailreviews") {
            this.setState({ list: 3 })
        } else if (tab === "Sdetailinfo" || tab === "Sdetailinfoes") {
            this.setState({ list: 4 })
        } else if (tab === "Sdetailstyle" || tab === "Sdetailstyles") {
            this.setState({ list: 5 })
        } else if (tab === "Sdetailhome" || tab === "Sdetailhomes") {
            this.setState({ list: 1 })
        } else {
            this.setState({ list: 1 })
        }

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
            window.location.href = window.location.pathname + "#Sdetailmenus"
        } else if (e === 3) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Sdetailreviews"
        } else if (e === 4) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Sdetailinfoes"
        } else if (e === 5) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Sdetailstyles"
        } else if (e === 1) {
            window.location.replace(rou)
            window.location.href = window.location.pathname + "#Sdetailhomes"
        }

    }

    onClickReserve = () => {
        this.setState({ list: 2 })
        window.location.href = window.location.pathname + "#Sdetailmenus"

    }

    render() {
        return (
            <>
                <Header header="clear" scroll={true} />
                {this.state.data ?
                    <>
                        <Firstsec data={this.state.data} />
                        <div className="StoreDetail_div">
                            <div>
                                <div className="StoreDetail_profileimg">
                                    <img src={this.state.data.profile} alt={this.state.data.store} />
                                </div>
                            </div>
                            <a href={"/"} className="StoreDetail_content_div">
                                <div className="StoreDetail_content">
                                    {this.state.data.store}
                                </div>
                                <div className="StoreDetail_content_operating_time">
                                    {this.state.data.operating_date} <span style={{ marginLeft: "8px" }}>{this.state.data.operating_time}</span>
                                </div>
                            </a>
                            <div className="StoreDetail_map_div">
                                <a href={this.state.data.mapurl}>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Store_map.svg"} alt="좋아요 버튼" />
                                </a>
                                <div>
                                    지도
                                </div>
                            </div>
                            <div className="StoreDetail_map_div">
                                <a href={`tel:${this.state.data.phone}`}>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/Store_phone.svg"} alt="좋아요 버튼" />
                                </a>
                                <div>
                                    전화
                                </div>
                            </div>
                        </div>
                        <div className="Sdetail_reserve_div">
                            <div onClick={this.onClickReserve}>
                                <div>예약하기</div>
                            </div>
                        </div>
                        <div id="filter_trigger2" />
                        <div className="Ddetail-filter" id="scroll2">
                            <p id="Sdetailhome" className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>홈</p>
                            <p id="Sdetailmenu" className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>시술</p>
                            <p id="Sdetailstyle" className={(this.state.list === 5 ? "push_button" : 'pull_button')} onClick={this.onclickList(5)}>스타일</p>
                            <p id="Sdetailreview" className={(this.state.list === 3 ? "push_button" : 'pull_button')} onClick={this.onclickList(3)}>리뷰</p>
                            <p id="Sdetailinfo" className={(this.state.list === 4 ? "push_button" : 'pull_button')} onClick={this.onclickList(4)}>정보</p>
                        </div>
                        <Secondsec list={this.state.list} data={this.state.data} review={this.state.review} imgreview={this.state.imgreview} openmodalPhone={this.openmodalPhone} onclickList={this.onclickList} />
                    </>
                    : <div style={{ height: "100vh", textAlign: "center", lineHeight: "100vh" }}>
                        잠시만 기다려 주세요 :)
                    </div>
                }
                <ModalPhone open={this.state.modal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Sdetail;
