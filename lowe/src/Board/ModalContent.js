import { Component } from "react";
import "./ModalContent.css"
import axios from "axios";

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }


    componentDidMount = () => {
        if (typeof (this.props.data.UserId) === "number") {
            axios.post("http://54.180.117.244:5000/getOneUser", {
                id: this.props.data.UserId,
            })
                .then((res) => {
                    this.setState({ user: res.data[0].login_id })
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            this.setState({ user: this.props.data.UserId })

        }

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
                </div>
            </div>
        )
    }
}

export default ModalContent;
