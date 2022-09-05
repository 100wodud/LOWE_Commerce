import React from "react";
import "./DesignerList.css"
import axios from "axios";
import ScrollContainer from 'react-indiana-drag-scroll'

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
        let manager_id = this.props.data.id;
        let user_id = Number(window.localStorage.getItem("id"));
        if (user_id && manager_id) {
            await axios.post("https://server.lowehair.kr/favorite", {
                manager_id: manager_id,
                user_id: user_id,
            }).then((res) => {
                this.setState({ like: !this.state.like })
            });
        }
        window.naverInnerScript(2)
        window.naverOuterScript()
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
                            <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div">
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
                                    {data.home} <span style={{marginLeft: "8px"}}>{data.operating_time}</span>
                                </div>
                            </a> :
                            <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div">
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
                                    this.props.data.Portfolios.slice(0,8).map((e)=>(
                                        <a href={`/portfolio/${e.id}${funnel}`} key={e.id}>
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
                        </div>:null
                    }
                    </>
                    : null}
            </>
        );
    }
}

export default DesignerList;