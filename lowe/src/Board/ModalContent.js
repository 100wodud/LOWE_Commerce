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
        axios.post("https://server.lowehair.kr/getOneUser", {
            id: this.props.data.UserId,
        })
            .then((res) => {
                this.setState({ user: res.data[0].login_id })
            })
            .catch(err => {
                console.log("에러")
            })

    }

    render() {
        return (
            <div style={{height: "100vh",}}>
                <div style={{height: "100%", overflow: "scroll"}}>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "24px 0 12px 0" }}>
                    <span className="review_modal_user">{this.state.user}</span>
                    <span className="review_modal_create">{this.props.data.createdAt.replaceAll("-", ". ").slice(2, 12)}</span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <span className="review_modal_info">헤어정보</span>
                    {this.props.data.hair_color === '1' ?
                        <span className="review_modal_span">탈색했음</span> :
                        <span className="review_modal_span">탈색안함</span>
                    }
                    <span className="review_modal_span"> / </span>
                    {this.props.data.hair_amout === '1' ?
                        <span className="review_modal_span">모량 적음</span> :
                        this.props.data.hair_amout === '2' ?
                            <span className="review_modal_span">모량 보통</span> :
                            <span className="review_modal_span">모량 많음</span>
                    }
                    <span className="review_modal_span"> / </span>
                    {this.props.data.hair_thick === '1' ?
                        <span className="review_modal_span">곱슬</span> :
                        this.props.data.hair_thick === '2' ?
                            <span className="review_modal_span">반곱슬</span> :
                            <span className="review_modal_span">직모</span>
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
