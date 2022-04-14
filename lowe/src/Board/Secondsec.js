import { Component } from "react";
import axios from "axios";
import "./Secondsec.css"
import DesignerList from "../Designer/DesignerList";

class Secondsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            like: false,
            banner: '',
            designer: []
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    componentDidMount = () => {
        let id = this.props.data.board.id;
        let user = Number(window.localStorage.getItem("id"));
        if (id && user) {
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/boardLikeChk", {
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


        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getAllBanner", {})
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

        this.setState({ designer: this.props.designer[0] })
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
            await axios.post("https://d205rw3p3b6ysa.cloudfront.net/boardLikeUpdate", {
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
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
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
                        {this.props.designer ?
                            <DesignerList data={this.props.designer} board={true} /> 
                            : null
                        }
                    </div>
                </div>
                <a href={this.state.banner.url + funnel} className="Board_banner">
                    <img src={this.state.banner.img} alt="이벤트 배너" />
                </a>
                <div id="filter_trigger" />
            </section>
        )
    }
}

export default Secondsec;