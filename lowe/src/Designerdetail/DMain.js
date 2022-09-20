import { Component } from "react";
import "./DMain.css"
import Store from "../data/Store";
import Goodslist from "../Home/Goodslist";
import ReviewList from "../Board/ReviewList";
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll'
import TagManager from "react-gtm-module";

class DMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            imgreview: [],
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
                                    "display": 3,
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

    onClickPortfolio = (e) =>(i)=> async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_designer_style_image',
                index: i,
                portfolio_id: e.id
            },
        };
        TagManager.dataLayer(tagManagerArgs);

    }

    render() {
        let port = this.props.data.Portfolios;
        const Portfolios = port.sort(() => Math.random() - 0.5).slice(0, 9);
        let filterboard = []
        for(let i=0; i < this.props.data.Boards.length; i++){
            let check = false
            for(let j=0; j < this.props.data.Boards[i].Hashtags.length; j++){
                if(this.props.data.Boards[i].Hashtags[j].content.indexOf("시그니처") !== -1){
                    check= true
                    break
                } 
            }
            if(check){
                filterboard.unshift(this.props.data.Boards[i]);

            } else {
                filterboard.push(this.props.data.Boards[i]);
            }
        }
        return (
            <section className="DMain_section">
                <div>
                    <div className="DMain_allmenu">
                        <div>{this.props.data.name} {this.props.data.rank} <strong>인기시술</strong></div>
                        <div>
                            <span>
                                <span onClick={this.props.onclickList(2.5)}>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </div>
                    <div className="DMain_allmenu_board">
                        <div>
                            {
                                filterboard.length ?

                                    <ScrollContainer className="DMain_allmen_slide">
                                        {
                                            filterboard.map((e, i) => (
                                                e.open === "1" ?
                                                <Goodslist e={e} key={e.id} i={i} event="click_designer_signature_product" /> : null
                                            ))
                                        }
                                        <div style={{ width: "140px" }}>
                                            <div style={{ width: "140px" }} onClick={this.props.onclickList(2)}>
                                            <div>
                                                <img style={{ marginLeft: "40px", marginTop: "80px", textAlign: "center", cursor: "pointer" }} src={process.env.PUBLIC_URL + "/image/nav/designer_board_moreview.svg"} alt="더 보기" />
                                            </div>
                                            <div className="DMain_allmenu_board_all" >
                                                시그니처<br />전체보기
                                            </div>
                                            </div>
                                        </div>
                                    </ScrollContainer>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="DMain_allmenu">
                        <div>{this.props.data.name} {this.props.data.rank} <strong>스타일</strong></div>
                        <div>
                            <span>
                                <span onClick={this.props.onclickList(5.5)}>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </div>
                    <div className="DMain_allmenu_style">
                        {
                            this.props.data.Portfolios.length ?
                                Portfolios.map((e, i) => (
                                    <div key={e.id}>
                                        <a href={`/portfolio/${e.id}`} onClick={this.onClickPortfolio(e)(i)}>
                                            {
                                                e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                                    <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                                        <source src={e.img + "#t=0.5"} />
                                                    </video> :
                                                    <img src={e.img} alt="로위 포트폴리오 이미지" />
                                            }
                                        </a>
                                    </div>
                                ))
                                : null
                        }
                    </div>

                    <div className="DMain_allmenu">
                        <div><strong>고객 리뷰</strong></div>
                        <div>
                            <span>
                                <span onClick={this.props.onclickList(3)}>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </div>
                    {
                        <div style={{padding: "0 12px" }}>
                            <ReviewList onclickList={this.props.onclickList} data={this.state.review.slice(0,3)} imgdata={this.state.imgreview} designer={true} home={true} />

                        </div>
                    }
                </div>
            </section>
        )
    }
}

export default DMain;