import React from "react";
import "./DesignerList.css"
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll'
import TagManager from "react-gtm-module";

class DesignerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            data: "",
            id: this.props.data.id,
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    componentDidMount = () => {
        let manager_id = this.props.data.id;
        let user_id = Number(window.localStorage.getItem("id"));
        if (manager_id && user_id) {
            axios.post(`https://server.lowehair.kr/getFavorite`, {
                manager_id: manager_id,
                user_id: user_id,
            }).then((res) => {
                if (res.data.length) {
                    this.setState({ like: true })
                } else {
                    this.setState({ like: false })
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    async onclickLike(e) {
        e.preventDefault();
        const tagManagerArgs = {
            dataLayer: {
                event: this.props.wish,
            },
        };
        TagManager.dataLayer(tagManagerArgs);

        let manager_id = this.props.data.id;
        let user_id = Number(window.localStorage.getItem("id"));
        if (user_id && manager_id) {
            await axios.post("https://server.lowehair.kr/favorite", {
                manager_id: manager_id,
                user_id: user_id,
            }).then((res) => {
                if(res.data){
                  window.naverInnerScript(2)
                }
                this.setState({ like: !this.state.like })
            });
        }
    }

    onClickHerf = async () => {
        if (this.props.event === "click_designers_designer") {
            let arr = [];
            arr.push(this.props.data.Hashtags[0].content)
            arr.push(this.props.data.Hashtags[1].content)
            let procedures = [];
            let branchs = [];

            for(let m=0; m < this.props.filter.length; m++){
                if(this.props.filter[m] === "홍대입구역" || this.props.filter[m] === "강남" || this.props.filter[m] === "신촌" || this.props.filter[m] === "합정" || this.props.filter[m] === "L7홍대" || this.props.filter[m] === "이수역"){
                    branchs.push(this.props.filter[m])
                } else if(this.props.filter[m] === "컷" || this.props.filter[m] === "펌" || this.props.filter[m] === "염색" || this.props.filter[m] === "클리닉"){
                    procedures.push(this.props.filter[m])
                }
            }
            const tagManagerArgs = {
                dataLayer: {
                    event: "click_designers_designer",
                    procedures: procedures,
                    branchs: branchs,
                    index: this.props.index,
                    designer: this.props.data.name,
                    branch: this.props.data.store,
                    tags: arr
                },
            };
            await TagManager.dataLayer(tagManagerArgs);
        } else if(this.props.event === "click_wish_designer"){
            let arr = [];
                arr.push(this.props.data.Hashtags[0].content)
                arr.push(this.props.data.Hashtags[1].content)
            const tagManagerArgs = {
                dataLayer: {
                    event: "click_wish_designer",
                    branch: this.props.data.store,
                    designer: this.props.data.name,
                    tags: arr
                },
            };
            await TagManager.dataLayer(tagManagerArgs);
        }else {
            const tagManagerArgs = {
                dataLayer: {
                    event: this.props.event,
                },
            };
            await TagManager.dataLayer(tagManagerArgs);
        }
    }

    onClickPortfolios = (e) => (i) => async () => {
        if (window.location.pathname === "like") {
            let arr = [];
            arr.push(this.props.data.Hashtags[0].content)
            arr.push(this.props.data.Hashtags[1].content)
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_wish_designer',
                    designer: this.props.data.name,
                    branch: this.props.data.store,
                    tags: arr,
                },
            };
            await TagManager.dataLayer(tagManagerArgs);
        } else {
            let arr = [];
            arr.push(this.props.data.Hashtags[0].content)
            arr.push(this.props.data.Hashtags[1].content)
            let procedures = [];
            let branchs = [];

            for(let m=0; m < this.props.filter.length; m++){
                if(this.props.filter[m] === "홍대입구역" || this.props.filter[m] === "강남" || this.props.filter[m] === "신촌" || this.props.filter[m] === "합정" || this.props.filter[m] === "L7홍대" || this.props.filter[m] === "이수역"){
                    branchs.push(this.props.filter[m])
                } else if(this.props.filter[m] === "컷" || this.props.filter[m] === "펌" || this.props.filter[m] === "염색" || this.props.filter[m] === "클리닉"){
                    procedures.push(this.props.filter[m])
                }
            }
            const tagManagerArgs = {
                dataLayer: {
                    event: 'click_designers_designer_image',
                    procedures: procedures,
                    branchs: branchs,
                    designer_index: this.props.index,
                    index: i,
                    designer: this.props.data.name,
                    branch: this.props.data.store,
                    tags: arr,
                    portfolio_id: e.id
                },
            };

            await TagManager.dataLayer(tagManagerArgs);
        }

    }

    render() {
        let user = window.localStorage.getItem("id");
        let data = this.props.data;
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <>
                {data.user_state === 1 ?
                    <>
                        <div className={this.props.board ? "Designerlist_div border" : "Designerlist_div"}>
                            <div>
                                <div className="DesignerList_profileimg">
                                    <img src={data.img} alt={data.name} />
                                </div>
                            </div>
                            {this.props.detail ?
                                <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div" onClick={this.onClickHerf}>
                                    <div className="DesignerList_content_time">
                                        <strong>{data.name} {data.rank}</strong><span style={{ marginLeft: "8px" }}>{data.store}</span>
                                    </div>
                                    {data.Hashtags.length ?
                                        <div className="DesignerList_content_hash_time">
                                            <span>#{data.Hashtags[0].content}</span><span style={{ marginLeft: "8px" }}>#{data.Hashtags[1].content}</span>
                                        </div> :
                                        <div className="DesignerList_content_hash_time">
                                            <span>ㅤ</span>
                                        </div>
                                    }
                                    <div className="DesignerList_content_operating_time">
                                        {data.home} <span style={{ marginLeft: "8px" }}>{data.operating_time}</span>
                                    </div>
                                </a> :
                                <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div" onClick={this.onClickHerf}>
                                    <div className="DesignerList_content">
                                        <strong>{data.name} {data.rank}</strong><span style={{ marginLeft: "8px" }}>{data.store}</span>
                                    </div>
                                    {data.Hashtags.length ?
                                        <div className="DesignerList_content_hash">
                                            <span>#{data.Hashtags[0].content}</span><span style={{ marginLeft: "8px" }}>#{data.Hashtags[1].content}</span>
                                        </div> :
                                        <div className="DesignerList_content_hash">
                                            <span>ㅤ</span>
                                        </div>
                                    }
                                </a>
                            }
                            <div className="DesignerList_Coupon_div">
                                {JSON.parse(data.coupons) ?
                                    <div style={{ lineHeight: "63px" }}>
                                        <img src={process.env.PUBLIC_URL + "/image/nav/designer_coupon.svg"} alt="쿠폰" />
                                    </div> :
                                    <div>

                                    </div>
                                }
                            </div>
                            <div className="DesignerList_Like_div">
                                {user ?
                                    this.state.like === false ?
                                        <div>
                                            <img src={process.env.PUBLIC_URL + "/image/nav/designer_dislike.svg"} alt="좋아요 버튼" onClick={this.onclickLike} />
                                        </div> :
                                        <div>
                                            <img src={process.env.PUBLIC_URL + "/image/nav/designer_like.svg"} alt="좋아요 버튼" onClick={this.onclickLike} />
                                        </div> :
                                    <div>
                                        <img src={process.env.PUBLIC_URL + "/image/nav/designer_dislike.svg"} alt="좋아요 버튼" onClick={() => { window.location.href = `/signin${funnel}` }} />
                                    </div>
                                }
                                <div>
                                    {data.Favorites.length >= 20 ? data.Favorites.length : ""}
                                </div>
                            </div>
                        </div>
                        {
                            this.props.data.Portfolios && this.props.rank ?
                                <div>
                                    <ScrollContainer className="DesignerList_port_slide">
                                        {
                                            this.props.data.Portfolios.slice(0, 8).map((e, i) => (
                                                <a href={`/portfolio/${e.id}${funnel}`} key={e.id} onClick={this.onClickPortfolios(e)(i)}>
                                                    {
                                                        e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                                            <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                                                <source src={e.img + "#t=0.5"} />
                                                            </video> :
                                                            <img src={e.img} alt="로위 포트폴리오 이미지" />
                                                    }
                                                </a>
                                            ))
                                        }
                                    </ScrollContainer>
                                </div> : null
                        }
                    </>
                    : null}
            </>
        );
    }
}

export default DesignerList;