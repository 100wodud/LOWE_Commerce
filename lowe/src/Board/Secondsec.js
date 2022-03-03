import { Component } from "react";
import axios from "axios";
import "./Secondsec.css"

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            like: false,
            banner: ''
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    componentDidMount = () => {
        let id = this.props.data.board.id;
        let user = Number(window.localStorage.getItem("id"));
        if (id && user) {
            axios.post("http://3.36.218.192:5000/boardLikeChk", {
                user: user,
                id: id,
            })
                .then((res) => {
                    if (res.data.heart === 1) {
                        this.setState({ like: true })
                    } else {
                        this.setState({ like: false })
                    }
                });
        }


        axios.post("http://3.36.218.192:5000/getAllBanner", {})
            .then((res) => {
                if (res.data.length) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 2 && this.props.data.board.eventType === 1) {
                            this.setState({ banner: res.data[i] })
                        } else if (res.data[i].type === 3 && this.props.data.board.eventType === 0) {
                            this.setState({ banner: res.data[i] })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
    }


    async onclickLike(e) {
        e.preventDefault();
        let id = this.props.data.board.id;
        let user = window.localStorage.getItem("id");
        let like = 0;
        if (this.state.like) {
            like = 1;
        } else {
            like = 0;
        }
        if (id && user) {
            await axios.post("http://3.36.218.192:5000/boardLikeUpdate", {
                id: id,
                user: user,
                heart: like
            }).then((res) => {
                this.setState({ like: !this.state.like })
            });
        }
    }

    render() {
        let user = window.localStorage.getItem("id");
        return (
            <section className="Board_second">
                <div className="Board_second_section">
                    <div className="Board_title">{this.props.data.board.name}</div>
                    <div className="Board_content">{this.props.data.board.content}</div>
                    <div className="Board_second_price">
                        <div className="Board_price" >
                            {this.props.data.board.eventType ?
                                <span className="Board_price_percent">{this.props.data.board.eventPrice}%</span> :
                                <></>
                            }
                            <span className="Board_price_price">{this.props.data.board.price.comma()}원</span>
                        </div>
                        <div>
                            {user ?
                                this.state.like === false ?
                                    <img src={process.env.PUBLIC_URL + "/image/nav/goods_dislike.svg"} className="Board_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                                    <img src={process.env.PUBLIC_URL + "/image/nav/goods_like.svg"} className="Board_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                                <img src={process.env.PUBLIC_URL + "/image/nav/goods_dislike.svg"} className="Board_like" alt="로위 상품 찜" onClick={() => { alert("로그인을 해주세요") }} />
                            }
                        </div>
                    </div>
                    <div className="Board_second_addprice">
                        <div style={{ width: "80px", fontWeight: "700" }}>추가금액</div>
                        <div style={{ width: "67%", maxWidth: "270px", whiteSpace: "pre-line" }}>{this.props.data.board.addPrice}</div>
                    </div>
                    <div>
                        <a className="Board_second_store" href={this.props.designer[0].home}>
                            <div style={{ width: "70%" }}>
                                <span>로위 {this.props.data.board.store}</span>
                                <span style={{ marginLeft: "8px", fontWeight: "400" }}>원장 {this.props.data.board.designer_name}</span>
                            </div>
                            <div style={{ width: "30%" }}>
                                <img src={process.env.PUBLIC_URL + "/image/nav/board_arrow.svg"} alt="로위 지점페이지" />
                            </div>
                        </a>
                    </div>
                </div>
                <a href={this.state.banner.url} className="Board_banner">
                    <img src={this.state.banner.img} alt="이벤트 배너" />
                </a>
                <div id="filter_trigger" />
            </section>
        )
    }
}

export default Secondsec;