import { Component } from "react";
import ReviewList from "../Board/ReviewList";
import "./Secondsec.css"
import axios from "axios";
import Portfolios from "./Portfolios";
import ScrollContainer from 'react-indiana-drag-scroll'
import SMain from "./SMain";
import ModalPhone from "../Sign/ModalPhone";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainimg: [],
            review: [],
            imgreview: [],
            store: null,
            category: "전체",
            naver: [],
            filter: true
        };
    }
    componentDidMount = () => {
        document.addEventListener('scroll', function () {
            var target = document.getElementById("filter_trigger2");
            var abBottom = window.pageYOffset + target.getBoundingClientRect().top + 45
            var currentScrollValue = document.documentElement.scrollTop;
            let header = document.getElementById("filter_category2");
            let header2 = document.getElementById("block_filter");
            if (currentScrollValue > abBottom) {
                header2.classList.add("change_height");
                header.classList.add("fixed");
                header.classList.add("Ddetail_marginbottom");
            }
            if (currentScrollValue < abBottom) {
                header2.classList.remove("change_height");
                header.classList.remove("fixed");
                header.classList.remove("Ddetail_marginbottom");
            }
        });

        let data = this.props.data;
        let bookingid = this.props.data.reserve_url
        let url = "https://api.place.naver.com/graphql";
        let formData = [
            {
                "operationName": "getVisitorReviews",
                "variables": {
                    "input": {
                        "businessId": `${data.number}`,
                        "businessType": "hairshop",
                        "bookingBusinessId": `${bookingid}`,
                        "page": 1,
                        "display": 50,
                        "isPhotoUsed": false,
                        "includeContent": true,
                        "getAuthorInfo": true,
                        "includeReceiptPhotos": true,
                        "cidList": [
                            "223267",
                            "223268",
                            "223288",
                            "223445",
                            "1004760",
                            "1004380",
                            "1002043"
                        ]
                    },
                    "id": `${data.number}`
                },
                "query": "query getVisitorReviews($input: VisitorReviewsInput) {\n  visitorReviews(input: $input) {\n    items {\n      id\n      rating\n      author {\n        id\n        nickname\n        from\n        imageUrl\n        objectId\n        url\n        review {\n          totalCount\n          imageCount\n          avgRating\n          __typename\n        }\n        theme {\n          totalCount\n          __typename\n        }\n        __typename\n      }\n      body\n      thumbnail\n      media {\n        type\n        thumbnail\n        class\n        __typename\n      }\n      tags\n      status\n      visitCount\n      viewCount\n      visited\n      created\n      reply {\n        editUrl\n        body\n        editedBy\n        created\n        replyTitle\n        __typename\n      }\n      originType\n      item {\n        name\n        code\n        options\n        __typename\n      }\n      language\n      highlightOffsets\n      apolloCacheId\n      translatedText\n      businessName\n      showBookingItemName\n      showBookingItemOptions\n      bookingItemName\n      bookingItemOptions\n      votedKeywords {\n        code\n        iconUrl\n        iconCode\n        displayName\n        __typename\n      }\n      userIdno\n      isFollowing\n      followerCount\n      followRequested\n      loginIdno\n      __typename\n    }\n    starDistribution {\n      score\n      count\n      __typename\n    }\n    hideProductSelectBox\n    total\n    showRecommendationSort\n    __typename\n  }\n}\n"
            }
        ]
        axios.post(url, formData, {
            headers: { "Content-Type": `application/json` }
        }
        ).then((res) => {
            let item = res.data[0].data.visitorReviews.items;
            let arr = [...this.props.review];
            let arr2 = [...this.props.imgreview];
            let obj = {};
            if (item.length) {
                for (let i = 0; i < item.length; i++) {
                    let img = [];
                    for (let j = 0; j < item[i].media.length; j++) {
                        img.push({ url: item[i].media[j].thumbnail })
                    }
                    obj = {
                        id: item[i].id,
                        BoardId: item[i].bookingItemName,
                        Images: img,
                        UserId: item[i].author.nickname,
                        content: item[i].body,
                        hair_amout: "0",
                        hair_color: "0",
                        hair_thick: "0",
                        createdAt: item[i].created
                    }
                    arr.push(obj)
                    if (img.length) {
                        arr2.push(obj)
                    }
                }
            }
            this.setState({ review: arr, imgreview: arr2 })
        });
    }


    onClickcategory = (e) => () => {
        this.setState({ category: e })
        window.location.replace(window.location.pathname + "#" + e);
    }

    surgeryBoard = (e) => () => {
        let id = window.location.pathname.split("/")[2];
        let userid = Number(window.localStorage.getItem("id"));
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = '/'
        }
        let tab_num = '';
        if (window.location.href.split("#")[1]) {
            tab_num = "#" + window.location.href.split("#")[1];
        } else {
            tab_num = ''
        }

        if (userid) {
            axios.post("https://server.lowehair.kr/click", {
                type: 6,
                ManagerId: id,
                UserId: userid,
                BoardId: Number(e),
                funnel: funnel,
                tab_num: tab_num
            })
                .then((res) => {
                    window.location.href = `/board/${e}${funnel}`
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 6,
                ManagerId: id,
                BoardId: Number(e),
                funnel: funnel,
                tab_num: tab_num
            })
                .then((res) => {
                    window.location.href = `/board/${e}${funnel}`
                }).catch((err) => {
                });
        }
    }



    openmodalPhone = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    clickcopyAddress = () => {
        navigator.clipboard.writeText(this.props.data.address)
            .then(() => {
                this.openmodalPhone(`로위 ${this.props.data.store} 주소가 복사되었습니다`)
            })
    }

    render() {
        return (
            <>
                <section className="Sdetail" id="시그니처">
                    {
                        this.props.list === 1 ?
                            <div>
                                <SMain data={this.props.data} onclickList={this.props.onclickList} review={this.props.review} imgreview={this.props.imgreview} designer={true} />
                            </div> :
                            this.props.list === 2 ?
                                this.props.data.Boards ?
                                    <div className="Sdetail_surgery">
                                        <div id="block_filter"></div>
                                        <div id="filter_category2" style={{marginBottom: "-32px"}}>
                                            <ScrollContainer className="Sdetail_filter_category">
                                                {this.props.data.Category.map((e, i) => (
                                                    <span key={e.content} onClick={this.onClickcategory(e.content)} className={(this.state.category === e.content ? "Sdetail_category_select" : "Sdetail_category_nonselect")}>{e.content}</span>
                                                ))
                                                }
                                            </ScrollContainer>
                                        </div>
                                        {this.props.data.Boards.length ?
                                            this.props.data.Category.map((v, i) => (
                                                <table id={v.content} className="Sdetail_surgery_surgery">
                                                    <thead>
                                                        <tr>
                                                            <th className="Sdetail_surgery_title_first">{v.content}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.data.Boards.map((e, i) => (
                                                            (e.category && e.category === v.id) ?
                                                                <div className="Sdetail_surgery_boards" key={e.id}>
                                                                    <div onClick={this.surgeryBoard(e.id)}>
                                                                        <div><img className="Sdetail_surgery_thunmbnail" src={e.thumbnail} alt={e.name} /></div>
                                                                        <div>
                                                                            <div className="Sdetail_surgery_boards_name" style={{ marginTop: "4px", marginBottom: "8px" }}>{`[${e.designer_name}] ${e.name}`}</div>
                                                                            <div className="Sdetail_surgery_boards_name" style={{ marginBottom: "12px", lineHeight: "15px" }}>{e.price.comma()}원 <span>{e.eventPrice ? e.eventPrice + "%" : null}</span></div>
                                                                            <div className="Sdetail_surgery_boards_content">{e.content}</div>
                                                                        </div>
                                                                    </div>
                                                                </div> : null
                                                        ))
                                                        }
                                                    </tbody>
                                                </table>)) : null
                                        }
                                    </div> :
                                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                                        상품이 없습니다
                                    </div> :
                                this.props.list === 3 ?
                                    <div style={{ marginTop: "24px", padding: "0 12px" }}>
                                        <ReviewList onclickList={this.props.onclickList} data={this.state.review} imgdata={this.state.imgreview} designer={true} />

                                    </div> :
                                    this.props.list === 4 ?
                                        <div style={{ marginTop: "20px" }}>
                                            <div style={{ padding: "12px 0", paddingBottom: "80px" }} className="SMain_">
                                                <div>
                                                    <div className="DMain_allmenu">
                                                        <div><strong>매장위치</strong></div>
                                                    </div>
                                                    {
                                                        this.props.data ?
                                                            <div style={{ margin: "0 12px" }}>
                                                                <div>
                                                                    <div style={{ marginBottom: "4px", lineHeight: "21px" }}><span className="store_address">{this.props.data.address}</span><span className="store_address_copy" onClick={this.clickcopyAddress}>복사</span></div>
                                                                    <div className="store_location">{this.props.data.location[0]} 거리</div>
                                                                </div>
                                                                <img className="store_map" onClick={this.clickcopyAddress} src={process.env.PUBLIC_URL + this.props.data.map} alt={`로위 ${this.props.data.store} 지도`} />
                                                                <div style={{ width: "100%" }}>
                                                                    <a href={this.props.data.mapurl}>
                                                                        <div style={{ lineHeight: "54px" }} className="store_box">지도 보기</div>
                                                                    </a>
                                                                </div>
                                                                <div className="store_time">
                                                                    <div style={{ marginBottom: "12px" }}>
                                                                        <span style={{ marginRight: "8px" }}><strong>운영시간</strong></span><span>{this.props.data.operating_date}(명절 당일 휴무) {this.props.data.operating_time}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span style={{ marginRight: "8px" }}><strong>매장번호</strong></span><span>{this.props.data.phone}</span>
                                                                    </div>
                                                                </div>
                                                            </div> : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        this.props.list === 5 ?
                                            <Portfolios data={this.props.data} />
                                            : null
                    }
                </section>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Secondsec;