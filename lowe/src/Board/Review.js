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
        if (typeof (this.props.data.UserId) === "number") {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: this.props.data.UserId,
            })
                .then((res) => {
                    if(res.data[0].login_id){
                        this.setState({ user: res.data[0].login_id })

                    } else{
                        this.setState({ user: res.data[0].name })
                    }
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            this.setState({ user: this.props.data.UserId })

        }
        if (this.props.designer) {
            if (typeof (this.props.data.BoardId) !== "number") {
                this.setState({ board: this.props.data.BoardId })
            }
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
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <div style={{  borderBottom: "1px solid #DDDDDD" }} onClick={this.onClickreview}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
                    {
                        typeof (this.props.data.BoardId) === "number" ?
                            this.props.data.BoardId !== 122 ?
                                <a style={{ font: '700 12px "Montserrat"', color: "#FF5732" }} href={`/board/${this.props.data.BoardId}${funnel}`}>{this.props.data.goods}</a> :
                                <a style={{ font: '700 12px "Montserrat"', color: "#FF5732" }} href={`${window.location.pathname}#Ddetailmenu${funnel}`} onClick={this.props.onclickList(2)}>{this.props.data.goods}</a> :
                            <a style={{ font: '700 12px "Montserrat"', color: "#FF5732" }} href={`${window.location.pathname}#Ddetailmenu${funnel}`} onClick={this.props.onclickList(2)}>{this.props.data.BoardId}</a>
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "12px 0 12px 0" }}>
                    <span className="review_user">{this.state.user}</span>
                    <span className="review_create">{
                        this.props.data.createdAt.length > 12 ?
                            this.props.data.createdAt.replaceAll("-", ". ").slice(2, 12) :
                            "22. " +
                            (
                                this.props.data.createdAt.split('.')[0].length === 1 ?
                                    "0" + this.props.data.createdAt.split('.')[0] : this.props.data.createdAt.split('.')[0])
                            + ". " +
                            (this.props.data.createdAt.split('.')[1].length === 1 ?
                                "0" + this.props.data.createdAt.split('.')[1] : this.props.data.createdAt.split('.')[1])
                    }</span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    {this.props.data.createdAt.length > 12 ?
                        <>
                            <span className="review_info">헤어정보</span>
                            {this.props.data.hair_color === '1' ?
                                <span className="review_span">탈색했음</span> :
                                this.props.data.hair_color === '2' ?
                                    <span className="review_span">탈색안함</span> : null
                            }
                            <span className="review_span"> / </span>
                            {this.props.data.hair_amout === '1' ?
                                <span className="review_span">모량 적음</span> :
                                this.props.data.hair_amout === '2' ?
                                    <span className="review_span">모량 보통</span> :
                                    this.props.data.hair_amout === '3' ?
                                        <span className="review_span">모량 많음</span> : null
                            }
                            <span className="review_span"> / </span>
                            {this.props.data.hair_thick === '1' ?
                                <span className="review_span">곱슬</span> :
                                this.props.data.hair_thick === '2' ?
                                    <span className="review_span">반곱슬</span> :
                                    this.props.data.hair_thick === '3' ?
                                        <span className="review_span">직모</span> : null
                            }
                        </> : null
                    }
                </div>
                {
                    this.props.data.Images.length ?
                        !this.props.home ?
                            <div id="review_slider" style={{ marginBottom: "20px" }} >
                                <Slider {...settings}>
                                    {
                                        this.props.data.Images.map((e) => (
                                            <img onClick={this.props.onclickimg(this.props.data.id)} key={e.id} src={e.url} className="review_img" alt="로위 리뷰사진" />
                                        ))
                                    }
                                </Slider>
                            </div> :
                            this.props.data.Images.map((e) => (
                                <img onClick={this.props.onclickimg(this.props.data.id)} key={e.id} src={e.url} className="review_img_home" alt="로위 리뷰사진" />
                            ))
                        : null
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
