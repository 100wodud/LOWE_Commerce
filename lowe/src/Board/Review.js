import { Component } from "react";
import "./Review.css"
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            click: false,
            board: '',
        };
    }

    componentDidMount = () => {
        axios.post("https://server.lowehair.kr/getOneUser", {
            id: this.props.data.UserId,
        })
            .then((res) => {
                this.setState({ user: res.data[0].login_id })
            })
            .catch(err => {
                console.log("에러")
            })

        if(this.props.designer){
            axios.post("https://server.lowehair.kr/getBoardDetail", {
                id: this.props.data.BoardId,
            })
            .then((res) => {
                this.setState({ board: res.data.board })
            })
            .catch(err => {
                console.log("에러")
            })
        }
    }
    onClickreview = () => {
        this.setState({ click: !this.state.click })
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            autoplaySpeed: 1000,
            pauseOnHover: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
        };
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <div style={{ paddingBottom: "24px", borderBottom: "1px solid #DDDDDD" }} onClick={this.onClickreview}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
                    <a style={{font: '700 12px "Montserrat"', color: "#FF5732"}} href={`/board/${this.state.board.id}${funnel}`}>{this.state.board.name}</a>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "12px 0 12px 0" }}>
                    <span className="review_user">{this.state.user}</span>
                    <span className="review_create">{this.props.data.createdAt.replaceAll("-", ". ").slice(2, 12)}</span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <span className="review_info">헤어정보</span>
                    {this.props.data.hair_color === '1' ?
                        <span className="review_span">탈색했음</span> :
                        <span className="review_span">탈색안함</span>
                    }
                    <span className="review_span"> / </span>
                    {this.props.data.hair_amout === '1' ?
                        <span className="review_span">모량 적음</span> :
                        this.props.data.hair_amout === '2' ?
                            <span className="review_span">모량 보통</span> :
                            <span className="review_span">모량 많음</span>
                    }
                    <span className="review_span"> / </span>
                    {this.props.data.hair_thick === '1' ?
                        <span className="review_span">곱슬</span> :
                        this.props.data.hair_thick === '2' ?
                            <span className="review_span">반곱슬</span> :
                            <span className="review_span">직모</span>
                    }
                </div>
                {
                    this.props.data.Images.length ?
                        <div id="review_slider" style={{ marginBottom: "20px" }} >
                            <Slider {...settings}>
                                {
                                    this.props.data.Images.map((e) => (
                                        <img key={e.id} src={e.url} className="review_img" alt="로위 리뷰사진" />
                                    )
                                    )
                                }
                            </Slider>
                        </div> : null
                }
                <div>
                    <div className={(this.state.click === false ? "review_content_false" : 'review_content_true')} id="review_content">
                        {this.props.data.content}
                    </div>

                    <img className={(this.state.click === false ? "Board_review_moreview" : 'Board_review_moreview rev')} src={process.env.PUBLIC_URL + "/image/nav/board_moreview.svg"} alt="리뷰가 더보기"></img>
                </div>
            </div>
        )
    }
}

export default Review;
