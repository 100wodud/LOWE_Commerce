import React from "react";
import "./DesignerList.css"
import axios from "axios";

class DesignerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    componentDidMount = () => {
        let manager_id = this.props.data.id;
        let user_id = Number(window.localStorage.getItem("id"));
        if (manager_id && user_id) {
            axios.post(`https://d205rw3p3b6ysa.cloudfront.net/getFavorite`, {
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
            await axios.post("https://d205rw3p3b6ysa.cloudfront.net/favorite", {
                manager_id: manager_id,
                user_id: user_id,
            }).then((res) => {
                this.setState({ like: !this.state.like })
            });
        }
    }

    render() {
        let user = window.localStorage.getItem("id");
        let data = this.props.data
        return (
            <>
                {data.user_state === 1 ?
                    <div className={this.props.board ? "Designerlist_div border" : "Designerlist_div"}>
                        <div>
                            <div className="DesignerList_profileimg">
                                <img src={data.img} alt={data.name} />
                            </div>
                        </div>
                        <a href={`/designer/${data.id}`} className="DesignerList_content_div">
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
                                    <img src={process.env.PUBLIC_URL + "/image/nav/goods_dislike.svg"} alt="좋아요 버튼" onClick={() => { alert("로그인을 해주세요") }} />
                                </div>
                            }
                            <div>
                                {data.Favorites.length >= 20 ? data.Favorites.length : ""}
                            </div>
                        </div>
                    </div>
                    : null}
            </>
        );
    }
}

export default DesignerList;