import { Component } from "react";
import "./ThirdReview.css";
import axios from "axios";
import ModalPhone from "../Sign/ModalPhone";

class ThirdReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            arr: [],
            phonemodal: false,
            modalcomment: '',
        };
        this.onclickLike = this.onclickLike.bind(this);
    }
    componentDidMount = () => {
        let id = this.props.e.Board.id;
        let user = window.localStorage.getItem("id");
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
    }
    async onclickLike(e) {
        e.preventDefault();
        let id = this.props.e.Board.id;
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
                this.setState({ like: !this.state.like })
            });
        }
        window.naverInnerScript(2)
        window.naverOuterScript()
    }

    onclickRecently = async () => {
        var recently = JSON.parse(localStorage.getItem("recent"));
        if (recently == null) recently = [];
        var id = this.props.e.id;
        let index = recently.indexOf(id)
        localStorage.setItem("entry", JSON.stringify(id));
        if (index === -1) {
            recently.unshift(id);
        } else {
            recently.splice(index, 1);
            recently.unshift(id);
        }
        localStorage.setItem("recent", JSON.stringify(recently));
    }

    openmodalPhone = (e) => (v) => {
        v.preventDefault();
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    render() {
        let user = window.localStorage.getItem("id");
        return (
            <>
                <div className="Mainpage_third_review_div">
                    <div className="Mainpage_third_review_div_div">
                        <span className="Mainpage_third_review_a" onClick={this.props.onclickimg(this.props.e.id)}>
                            <img className="Mainpage_third_review_img" src={this.props.e.Images[0].url} alt="리뷰 사진" />
                            <div className="Mainpage_third_review_text" ><div>{this.props.e.content ? '"' + this.props.e.content + '"' : null}</div></div>
                        </span>
                    </div>
                    <div className="Mainpage_third_review_div_div2">
                        <a onClick={this.onclickRecently} href={`/board/${this.props.e.Board.id}`} >
                            <div className="Mainpage_third_review_board" style={{ paddingLeft: "12px" }}>
                                <div>
                                    <img className="Mainpage_third_review_board_thumb" src={this.props.e.Board.thumbnail} alt="thumbnail" />
                                </div>
                                <div className="Mainpage_third_review_board_content">
                                    <div className="Mainpage_third_review_board_designer"><strong>{this.props.e.Board.designer_name} {this.props.e.Manager.rank}</strong> {this.props.e.Board.store}</div>
                                    <div className="Mainpage_third_review_board_name">{this.props.e.Board.name}</div>
                                    <div className="Mainpage_third_review_board_price">{this.props.e.Board.eventType ? <span>{this.props.e.Board.eventPrice + "%"}</span> : null}{this.props.e.Board.price.comma()}</div>
                                </div>
                                <div className="Mainpage_third_review_board_like">
                                    {user ?
                                        this.state.like === false ?
                                            <img src={process.env.PUBLIC_URL + "/image/nav/home_dislikes.svg"} alt="로위 상품 찜" onClick={this.onclickLike} /> :
                                            <img src={process.env.PUBLIC_URL + "/image/nav/home_likes.svg"} alt="로위 상품 찜" onClick={this.onclickLike} /> :
                                        <img src={process.env.PUBLIC_URL + "/image/nav/home_dislikes.svg"} alt="로위 상품 찜" onClick={this.openmodalPhone("로그인이 필요한 서비스 입니다")} />
                                    }
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default ThirdReview;
