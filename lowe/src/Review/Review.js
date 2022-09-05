import { Component } from "react";
import "./Review.css";
import axios from 'axios';
import Header from "../Sign/SignHeader";
import ReviewModal from "./ReviewModal";

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            id: 0,
            Color: 0,
            Amout: 0,
            Thick: 0,
            content: '',
            imgs: [],
            img: '',
            phonemodal: false,
            modalcomment: '',
            payment: "",
            happy: "",

        };
    }

    openmodalReview = (e) => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalReview = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        let id = window.location.pathname.split("/")[4];
        let ManagerId = window.location.pathname.split("/")[3];
        let user = window.localStorage.getItem("id");
        if (!user) {
            window.location.href = '/signin'
        }

        if (window.location.pathname.split("/")[5]) {

            if (window.location.pathname.split("/")[6]) {

                this.setState({ id: id, user: user, ManagerId: ManagerId, payment: window.location.pathname.split("/")[5], surgeryId: window.location.pathname.split("/")[6] })
            } else {

                this.setState({ id: id, user: user, ManagerId: ManagerId, payment: window.location.pathname.split("/")[5] })
            }
        } else {
            this.setState({ id: id, user: user, ManagerId: ManagerId, payment: "" })
        }
        let arr = [];
        if (this.props.location.state) {
            let img = this.props.location.state.Images;
            if (img.length) {
                for (let i = 0; i < img.length; i++) {
                    let data = {
                        url: img[i].url,
                    }
                    arr.push(data)
                }
            }
            this.setState({
                Color: Number(this.props.location.state.hair_color),
                Amout: Number(this.props.location.state.hair_amout),
                Thick: Number(this.props.location.state.hair_thick),
                content: this.props.location.state.content,
                happy: this.props.location.state.happy,
                imgs: arr
            })
        }
    }

    onClicksubmit = () => {
        const img = this.state.imgs;
        let boardid = window.location.pathname.split("/")[4];
        if (this.state.Color && this.state.Amout && this.state.Thick && this.state.content && this.state.happy) {
            if (this.state.payment) {
                if (boardid !== "122") {
                    axios
                        .post("https://server.lowehair.kr/review", {
                            user: Number(this.state.user),
                            PaymentId: Number(this.state.payment),
                            BoardId: Number(boardid),
                            ManagerId: Number(this.state.ManagerId),
                            hair_color: this.state.Color,
                            hair_amout: this.state.Amout,
                            hair_thick: this.state.Thick,
                            content: this.state.content,
                            happy: this.state.happy,
                            img,
                        })
                        .then((res) => {
                            this.openmodalReview("성공")
                        });
                } else {

                    axios
                        .post("https://server.lowehair.kr/review", {
                            user: Number(this.state.user),
                            PaymentId: Number(this.state.payment),
                            SurgeryId: Number(this.state.surgeryId),
                            BoardId: Number(this.state.id),
                            ManagerId: Number(this.state.ManagerId),
                            hair_color: this.state.Color,
                            hair_amout: this.state.Amout,
                            hair_thick: this.state.Thick,
                            content: this.state.content,
                            happy: this.state.happy,
                            img,
                        })
                        .then((res) => {
                            this.openmodalReview("성공")
                        });
                }

            } else {
                axios
                    .post("https://server.lowehair.kr/review", {
                        user: Number(this.state.user),
                        BoardId: Number(this.state.id),
                        ManagerId: Number(this.state.ManagerId),
                        hair_color: this.state.Color,
                        hair_amout: this.state.Amout,
                        hair_thick: this.state.Thick,
                        content: this.state.content,
                        happy: this.state.happy,
                        img
                    })
                    .then((res) => {
                        this.openmodalReview("성공")
                    });
            }
        } else {
            this.openmodalReview("모든 항목을 채워주세요")
        }
    }

    onClickEdit = () => {
        const img = this.state.imgs
        if (this.state.Color && this.state.Amout && this.state.Thick && this.state.content) {
            axios
                .patch("https://server.lowehair.kr/review", {
                    id: this.props.location.state.id,
                    hair_color: this.state.Color,
                    hair_amout: this.state.Amout,
                    hair_thick: this.state.Thick,
                    content: this.state.content,
                    happy: this.state.happy,
                    img
                })
                .then((res) => {
                    this.openmodalReview("리뷰 수정 완료\n수정한 리뷰는 마이페이지에서 확인 할 수 있어요 : )")
                });
        } else {
            this.openmodalReview("모든 항목을 채워주세요")
        }
    }

    handleInputValue = (key) => async (e) => {
        if (key === "img") {
            let reader = new FileReader();
            let file = e.target.files[0];
            if (e.target.files.length) {
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        previewURL: reader.result,
                    });
                };
                reader.readAsDataURL(file);
                let img = e.target.files[0];

                const formData = new FormData();
                formData.append("file", img);
                await axios
                    .post("https://server.lowehair.kr/addImg", formData, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }).then(res => {
                        let img = this.state.imgs;
                        let data = {
                            url: res.data.url,
                        }
                        img.push(data);
                        this.setState({ imgs: img });
                    })
            }
        } else {
            this.setState({ [key]: e.target.value });
        }
    };


    onclickColor = (e) => () => {
        this.setState({ Color: e })
    }


    onclickAmount = (e) => () => {
        this.setState({ Amout: e })
    }

    onclickThick = (e) => () => {
        this.setState({ Thick: e })
    }

    onclickHappy = (e) => () => {
        this.setState({ happy: e })
    }




    onClickDelimg = (i) => () => {
        let img = this.state.imgs;
        img.splice(i, 1);
        this.setState({ imgs: img });
    }

    render() {
        let content = this.props.location.state
        return (
            <>
                <Header header="리뷰쓰기" />
                <section className="review_write_section">
                    <div>
                        <div className="review_write_main">시술 경험은 어떠셨나요?</div>
                    </div>
                    <div style={{ margin: "20px 0px 36px 12px" }}>
                        <div className="review_write-filter">
                            <p className={(this.state.happy === "good" ? "click_button" : 'unclick_button')} onClick={this.onclickHappy("good")}>최고예요😁</p>
                            <p className={(this.state.happy === "soso" ? "click_button" : 'unclick_button')} onClick={this.onclickHappy("soso")}>괜찮아요🙂</p>
                            <p className={(this.state.happy === "bad" ? "click_button" : 'unclick_button')} onClick={this.onclickHappy("bad")}>아쉬워요🥲</p>
                        </div>
                    </div>
                    <div>
                        <div className="review_write_main">시술 경험을 더 상세하게 평가해주세요.</div>
                    </div>
                    <div>
                        <div className="review_write_title">탈색한 적이 있으신가요?</div>
                        <div className="review_write-filter">
                            <p className={(this.state.Color === 1 ? "click_button" : 'unclick_button')} onClick={this.onclickColor(1)}>탈색했음</p>
                            <p className={(this.state.Color === 2 ? "click_button" : 'unclick_button')} onClick={this.onclickColor(2)}>탈색안함</p>
                        </div>
                    </div>
                    <div>
                        <div className="review_write_title">모량이 어떠신가요?</div>
                        <div className="review_write-filter">
                            <p className={(this.state.Amout === 1 ? "click_button" : 'unclick_button')} onClick={this.onclickAmount(1)}>숱 적음</p>
                            <p className={(this.state.Amout === 2 ? "click_button" : 'unclick_button')} onClick={this.onclickAmount(2)}>숱 보통</p>
                            <p className={(this.state.Amout === 3 ? "click_button" : 'unclick_button')} onClick={this.onclickAmount(3)}>숱 많음</p>
                        </div>
                    </div>
                    <div>
                        <div className="review_write_title">모질은 어떠신가요?</div>
                        <div className="review_write-filter">
                            <p className={(this.state.Thick === 1 ? "click_button" : 'unclick_button')} onClick={this.onclickThick(1)}>곱슬</p>
                            <p className={(this.state.Thick === 2 ? "click_button" : 'unclick_button')} onClick={this.onclickThick(2)}>반곱슬</p>
                            <p className={(this.state.Thick === 3 ? "click_button" : 'unclick_button')} onClick={this.onclickThick(3)}>직모</p>
                        </div>
                    </div>

                    <div>
                        <textarea
                            onChange={this.handleInputValue("content")}
                            placeholder={`리뷰작성에 따른 포인트 적립\n20자 이상 텍스트 리뷰: 500p\n20자 이상 텍스트+사진 리뷰: 1,000p\n\n* 포인트 지급은 리뷰 작성 후 최대 3일 소요될 수 있습니다.\n* 광고, 비방, 부적절한 사진은 무통보 삭제될 수 있습니다.`}
                        >
                            {content ? this.props.location.state.content : null}
                        </textarea>
                    </div>
                    <div className="review_write_length">
                        <strong>{this.state.content.length}</strong>/20
                    </div>
                    <div className="reviewimg_scroll">

                        <div>
                            <label htmlFor="reviewimg"><div><div style={{ fontSize: "30px", fontWeight: "400", marginTop: "15px", height: "30px" }}>+</div>{this.state.imgs.length} / 5</div></label>
                            {this.state.imgs.length < 5 ?
                                <input
                                    type="file"
                                    accept="image/*"
                                    size="40"
                                    id="reviewimg"
                                    onChange={this.handleInputValue("img")}
                                /> : null
                            }
                        </div>
                        {
                            this.state.imgs.length ?
                                this.state.imgs.map((e, i) => (
                                    <div key={i}>
                                        <img className="review_write_addimg" src={e.url} alt={e.url}></img>
                                        <img className="review_write_delimg" onClick={this.onClickDelimg(i)} src={process.env.PUBLIC_URL + "/image/nav/reviewimg_del.svg"} alt="리뷰 이미지 삭제" />
                                    </div>
                                )) : null
                        }
                    </div>
                    {
                        this.props.location.state ?
                            <div className={this.state.content.length >= 20 ? "review_write_submit" : "review_write_submit_gray"} style={{ marginLeft: 0 }} onClick={this.state.content.length >= 20 ? this.onClickEdit : null}>수정 완료</div> :
                            <div className={this.state.content.length >= 20 ? "review_write_submit" : "review_write_submit_gray"} style={{ marginLeft: 0 }} onClick={this.state.content.length >= 20 ? this.onClicksubmit : null}>작성 완료</div>
                    }
                </section>
                <ReviewModal open={this.state.phonemodal} closemodal={this.closemodalReview} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Review;
