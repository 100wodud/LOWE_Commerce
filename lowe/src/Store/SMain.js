import { Component } from "react";
import "./SMain.css"
import Goodslist from "../Home/Goodslist";
import ReviewList from "../Board/ReviewList";
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll'
import DesignerList from "../Designer/DesignerList";

class SMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            imgreview: [],
            number: true
        };
    }

    componentDidMount = () => {
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

    onClickdesignerMoreview = () => {
        this.setState({number: false})

    }

    render() {
        let port = this.props.data.Portfolios;
        const Portfolios = port.sort(() => Math.random() - 0.5).slice(0, 9);
        return (
            <section className="DMain_section">
                <div>
                    <div className="DMain_allmenu">
                        <div>{this.props.data.store} <strong>시그니처</strong></div>
                        <div>
                            <span>
                                <span onClick={this.props.onclickList(2)}>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </div>
                    <div className="DMain_allmenu_board" style={{paddingBottom: "52px"}}>
                        <div>
                            {
                                this.props.data.Boards.length ?

                                    <ScrollContainer className="DMain_allmen_slide">
                                        {
                                            this.props.data.Boards.slice(0, 5).map((e) => (
                                                e.open === "1" ?
                                                <Goodslist e={e} key={e.id} /> : null
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
                        <div>{this.props.data.store} <strong>디자이너</strong></div>
                    </div>
                    <div>

                    {this.state.number ?
                    this.props.data.Designers.slice(0,3).map((e, i) => (
                                        <div key={e.id}>
                                            <div className={String(i + 1).length < 3 ? "Designer_ranking_number" : "Designer_ranking_number_three"} style={{fontSize: "10px"}}>{i + 1}</div>
                                            <DesignerList data={e}  />
                                        </div>
                                    )):
                                    this.props.data.Designers.map((e, i) => (
                                                        <div key={e.id}>
                                                            <div className={String(i + 1).length < 3 ? "Designer_ranking_number" : "Designer_ranking_number_three"} style={{fontSize: "10px"}}>{i + 1}</div>
                                                            <DesignerList data={e}  />
                                                        </div>
                                                    ))
                    }
                    </div>
                    <div onClick={this.onClickdesignerMoreview} className={this.state.number? "SMain_moreview_button": "SMain_moreview_none"}>
                        {this.state.number? 
                        <>
                        <span>더보기</span>
                        <span >
                                <img style={{marginLeft: "4px", marginBottom: "-2px"}} src={process.env.PUBLIC_URL + "/image/nav/SMain_moreview.svg"} alt="다음" />
                                </span>
                        </>: null
                        }
                    </div>
                    <div className="DMain_allmenu">
                        <div>{this.props.data.store} <strong>스타일</strong></div>
                        <div>
                            <span>
                                <span onClick={this.props.onclickList(5)}>전체보기</span>
                            </span>
                            <span>
                                <img src={process.env.PUBLIC_URL + "/image/nav/port_arrow.svg"} alt="다음" />
                            </span>
                        </div>
                    </div>
                    <div className="DMain_allmenu_style">
                        {
                            this.props.data.Portfolios.length ?
                                Portfolios.map((e) => (
                                    <div key={e.id}>
                                        <a href={`/portfolio/${e.id}`}>
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

export default SMain;