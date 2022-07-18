import { Component } from "react";
import ReviewList from "../Board/ReviewList";
import Store from "../data/Store";
import "./Secondsec.css"
import axios from "axios";
import Portfolios from "./Portfolios";
import Surgery from "./Surgery";
import ScrollContainer from 'react-indiana-drag-scroll'
import DMain from "./DMain";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainimg: [],
            review: [],
            imgreview: [],
            store: null,
            category: "전체",
            naver: []
        };
    }
    componentDidMount = () => {
        let data = this.props.data;
        let bookingid = this.props.data.reserve_url.split('/')[6]
        let itemid = this.props.data.reserve_url.split('/')[8]
        if (data.store) {
            for (let i = 0; i < Store.length; i++) {
                if (Store[i].store.indexOf(data.store) !== -1) {
                    this.setState({ store: Store[i] })
                    let url = "https://api.place.naver.com/graphql";
                    let formData = [
                        {
                            "operationName": "getVisitorReviews",
                            "variables": {
                                "input": {
                                    "businessId": `${Store[i].number}`,
                                    "businessType": "hairshop",
                                    "item": `${itemid}`,
                                    "bookingBusinessId": `${bookingid}`,
                                    "page": 1,
                                    "display": 100,
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
                                "id": `${Store[i].number}`
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
            }
        }
    }
    onClickcategory = (e) => () => {
        window.location.replace(window.location.pathname + "#"+e);
        this.setState({ category: e })
    }

    SurgeriesPay = (e) => () => {
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
                SurgeryId: Number(e.id),
                funnel: funnel,
                tab_num:tab_num
            })
                .then((res) => {
                    localStorage.setItem("surgey_payment", JSON.stringify(e));
                    window.location.href = `/reservation_surgery/${e.id}${funnel}`
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 6,
                ManagerId: id,
                SurgeryId: Number(e.id),
                funnel: funnel,
                tab_num:tab_num
            })
                .then((res) => {
                    localStorage.setItem("surgey_payment", JSON.stringify(e));
                    window.location.href = `/signin${funnel}`
                }).catch((err) => {
                });
        }
    }

    boardPay = (e) => () => {
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
                type: 8,
                ManagerId: id,
                UserId: userid,
                SurgeryId: Number(e.id),
                funnel: funnel,
                tab_num:tab_num
            })
                .then((res) => {
                    window.location.href = `${e.url}${funnel}`
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 6,
                ManagerId: id,
                SurgeryId: Number(e.id),
                funnel: funnel,
                tab_num:tab_num
            })
                .then((res) => {
                    window.location.href = `${e.url}${funnel}`
                }).catch((err) => {
                });
        }
    }

    render() {
        return (
            <section className="Ddetail" id="시그니처">
                {
                    this.props.list === 1 ?
                        <div>
                            <DMain data={this.props.data} onclickList={this.props.onclickList} review={this.props.review} imgreview={this.props.imgreview} designer={true}/>
                        </div> :
                        this.props.list === 2 ?
                            this.props.data.Surgeries.length ?
                                <div className="Ddetail_surgery">
                                    {this.props.data.Categories.length ?
                                    <div id="filter_category">
                                    <ScrollContainer className="Ddetail_filter_category">
                                        {this.props.data.Categories.map((e, i) => (
                                            <span key={e.id} onClick={this.onClickcategory(e.content)} className={(this.state.category === e.content ? "Ddetail_category_select" : "Ddetail_category_nonselect")}>{e.content}</span>
                                        ))
                                        }
                                    </ScrollContainer>
                                    </div>
                                    : null}
                                    <table  className="Ddetail_surgery_surgery" style={{paddingTop: "0px"}}>
                                        <thead>
                                            <tr>
                                                <th className="Ddetail_surgery_title_first">시그니처</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.data.Boards.map((e, i) => (
                                                e.open === "1" ?
                                                <div className="Ddetail_surgery_boards">
                                                    <a href={`/board/${e.id}`} >
                                                    <div><img className="Ddetail_surgery_thunmbnail" src={e.thumbnail} alt={e.name} /></div>
                                                    <div>
                                                        <div className="Ddetail_surgery_boards_name" style={{marginTop: "4px",marginBottom: "8px"}}>{e.name}</div>
                                                        <div className="Ddetail_surgery_boards_name" style={{marginBottom: "12px",lineHeight: "15px"}}>{e.price.comma()}원 <span>{e.eventPrice ? e.eventPrice+"%" : null}</span></div>
                                                        <div className="Ddetail_surgery_boards_content">{e.content}</div>
                                                    </div>
                                                    </a>
                                                </div> : null
                                            ))}
                                        </tbody>
                                    </table>
                                    {this.props.data.Categories.length ?
                                    this.props.data.Categories.slice(1).map((v, i) => (
                                    <table id={v.content} className="Ddetail_surgery_surgery">
                                        <thead>
                                            <tr>
                                                <th className="Ddetail_surgery_title_first">{v.content}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.data.Surgeries.map((e, i) => (
                                                <>
                                                    {(e.Category && e.Category.content === v.content) ?
                                                        <Surgery data={e} key={i} SurgeriesPay={this.SurgeriesPay} boardPay={this.boardPay} /> : null
                                                    }
                                                </>
                                            ))}
                                        </tbody>
                                    </table>)):null
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
                                        <div style={{ float: "left", padding: "12px", paddingBottom: "80px" }}>
                                            <div id="store">
                                                <div>
                                                    <dl className="dl">
                                                        <dt className="dt">Instagram</dt>
                                                        <dd className="dd"><a href={this.props.data.sns}><strong>{this.props.data.sns.split('/')[3]}</strong></a></dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">위치</dt>
                                                        <dd className="dd">
                                                            {
                                                                this.state.store ?
                                                                    <>
                                                                        <div><strong>로위 {this.state.store.store}</strong></div>
                                                                        <div style={{ marginTop: "12px" }}>{this.state.store.address}</div>
                                                                        {
                                                                            this.state.store.location.map((e, i) => (
                                                                                <div key={i} style={{ marginTop: "12px" }}>{e}</div>
                                                                            ))
                                                                        }
                                                                        <div className="store-map">
                                                                            <a href={this.state.store.mapurl}>지도에서 매장 확인하기</a>
                                                                        </div>
                                                                    </> :
                                                                    <>
                                                                        <div>{this.props.data.address}</div>
                                                                        {/* <div className="store_map">
                                                                            <a href={`https://map.kakao.com/?urlLevel=1&itemId=25540042&q=${this.props.data.address.replaceAll(" ", "%20")}`}>지도에서 매장 확인하기</a>
                                                                        </div> */}
                                                                    </>
                                                            }
                                                        </dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">운영시간</dt>
                                                        <dd className="dd"><div style={{ marginBottom: "12px" }}><strong>{this.props.data.operating_time}</strong></div><div>{this.props.data.home}</div></dd>
                                                    </dl>
                                                    <dl className="dl">
                                                        <dt className="dt">매장번호</dt>
                                                        <dd className="dd">
                                                            <strong>
                                                                {
                                                                    this.state.store ?
                                                                        <a href={`tel:${this.state.store.phone}`}>
                                                                            {this.state.store.phone}
                                                                        </a> :
                                                                        <a href={`tel:${this.props.data.login_id}`}>
                                                                            {this.props.data.login_id}
                                                                        </a>

                                                                }
                                                            </strong>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    this.props.list === 5 ?
                                        <Portfolios data={this.props.data} />
                                        : null
                }
            </section>
        )
    }
}

export default Secondsec;