import { Component } from "react";
import "./ModalContent.css"
import axios from "axios";
import TagManager from "react-gtm-module";

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }


    componentDidMount = () => {
        if (typeof (this.props.data.UserId) === "number") {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: this.props.data.UserId,
            })
                .then((res) => {
                    let name = ''
                    if(res.data[0].login_id){
                        name = res.data[0].login_id
                    } else {
                        name = res.data[0].name
                    }
                    const tagManagerArgs = {
                        dataLayer: {
                            event: 'view_photo_review',
                            name: name,
                            item_id: this.props.data.BoardId,
                            item_name: this.props.data.goods
                        },
                    };
                    if(this.props.i === this.props.slider){
                        TagManager.dataLayer(tagManagerArgs);
                    }
                    this.setState({ user: name })
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            const tagManagerArgs = {
                dataLayer: {
                    event: 'view_photo_review',
                    name: this.props.data.UserId,
                    item_id: this.props.data.BoardId,
                    item_name: this.props.data.goods
                },
            };
            TagManager.dataLayer(tagManagerArgs);
            this.setState({ user: this.props.data.UserId })

        }
    }

    onClickReviewBoard = () =>{
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_photo_review_product',
                name: this.state.user,
                item_id: this.props.data.BoardId,
                item_name: this.props.data.goods,
                price: this.props.data.Board.price,
                branch: this.props.data.Board.store,
                designer: this.props.data.Board.designer_name
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        return (
            <div style={{ height: "100vh", }}>
                <div style={{ height: "100%", overflow: "scroll" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "24px 0 12px 0" }}>
                        <span className="review_modal_user">{this.state.user}</span>
                        <span className="review_modal_create">{this.props.data.createdAt.length > 12 ?
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
                    {this.props.data.Images.map((e, i) => (
                        <div key={i}>
                            <img className="review_modal_img" src={e.url} alt="main" />
                        </div>
                    ))}
                    <div className='review_modal_content_true ' id="review_modal_content">
                        {this.props.data.content}
                    </div>
                    {
                        this.props.mainpage ?

                            <a href={`/board/${this.props.data.Board.id}`} onClick={this.onClickReviewBoard}>
                                <div className="Porf_Board" style={{ margin: "20px 0 120px" }}>
                                    <div>
                                        <img src={this.props.data.Board.thumbnail} alt={this.props.data.Board.content} />
                                    </div>
                                    <div style={{ marginLeft: "12px" }}>
                                        <div className="Porf_Board_designer"><strong>{this.props.data.Board.designer_name} {this.props.data.Manager.rank}</strong> {this.props.data.Board.store}</div>
                                        <div className="Porf_Board_name">{this.props.data.Board.name}</div>
                                        <div className="Porf_Board_price">{this.props.data.Board.eventType ? <span>{this.props.data.Board.eventPrice + "%"}</span> : null}{this.props.data.Board.price.comma()}원</div>

                                    </div>
                                </div>
                            </a> :
                            <div style={{ marginBottom: "120px" }}></div>
                    }
                </div>
            </div>
        )
    }
}

export default ModalContent;
