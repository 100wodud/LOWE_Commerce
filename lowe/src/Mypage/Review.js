import { Component } from 'react';
import "./Review.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


class Review extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    componentDidMount = () => {
        if (this.props.data.BoardId !== 122) {
            axios.post("https://server.lowehair.kr/getBoard", {
                id: this.props.data.BoardId, isImage: true, isReview: true
            })
                .then((res) => {
                    this.setState({ data: res.data[0] })
                });
        }
    }

    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <div className="myreview" >
                {
                    !this.props.possible ?
                        <>
                            <div className="myreview_content">
                                <Link to={{
                                    pathname: "/myreview/edit/" + this.props.data.id,
                                    state: {
                                        id: this.props.data.id,
                                        Images: this.props.data.Images,
                                        hair_amout: this.props.data.hair_amout,
                                        hair_color: this.props.data.hair_color,
                                        hair_thick: this.props.data.hair_thick,
                                        content: this.props.data.content,
                                        happy: this.props.data.happy
                                    },
                                }}>
                                    <div className="myreview_manager">{this.props.data.Manager.name} {this.props.data.Manager.rank} {this.props.data.Manager.store}</div>
                                    <div className="myreview_board">{this.props.data.goods}</div>
                                    <div style={{ float: "left" }}>
                                        <div className="myreviwew_edit">수정하기</div>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                {this.props.data.BoardId === 122 ?
                                    null :
                                    <a href={`/board/${this.props.data.BoardId}${funnel}`} className="myreview_img">
                                        <img src={this.state.data.thumbnail} alt={this.state.data.name} />
                                    </a>
                                }
                            </div>
                        </> :
                        <>
                            <div className="myreview_content">
                                <a href={`/review/write/${this.props.data.ManagerId}/${this.props.data.BoardId}/${this.props.data.id}${this.props.data.SurgeryId ?"/"+this.props.data.SurgeryId : ""}`}>
                                    <div className="myreview_manager">{this.props.data.Manager.name} {this.props.data.Manager.rank} {this.props.data.Manager.store}</div>
                                    <div className="myreview_board">{this.props.data.pay_goods}</div>
                                    <div style={{ float: "left" }}>
                                        <div className="myreviwew_edit_red">리뷰쓰기</div>
                                    </div>
                                </a>
                            </div>
                            <div>
                                {this.props.data.BoardId === 122 ?
                                    null :
                                    <a href={`/board/${this.props.data.BoardId}${funnel}`} className="myreview_img">
                                        <img src={this.props.data.Board.thumbnail} alt={this.props.data.Board.name} />
                                    </a>
                                }
                            </div>
                        </>
                }
            </div>
        );
    }
}
export default Review;