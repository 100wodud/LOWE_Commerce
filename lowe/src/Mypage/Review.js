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
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getBoardDetail", {
            id: this.props.data.BoardId,
        })
            .then((res) => {
                this.setState({ data: res.data.board })
            });
    }

    render() {
        return (
            <div className="myreview" >
                {this.state.data ?
                    <div>
                        <a href={`/board/${this.props.data.BoardId}`} className="myreview_img">
                            <img src={this.state.data.thumbnail} alt={this.state.data.name} />
                        </a>
                        <span className="myreview_content">
                            <Link to={{
                                pathname: "/myreview/edit/" + this.props.data.id,
                                state: {
                                    id: this.props.data.id,
                                    Images: this.props.data.Images,
                                    hair_amout: this.props.data.hair_amout,
                                    hair_color: this.props.data.hair_color,
                                    hair_thick: this.props.data.hair_thick,
                                    content: this.props.data.content
                                },
                            }}>
                                <div className="myreview_board">{this.state.data.name}</div>
                                <div style={{float: "left"}}>
                                    <div className="myreviwew_edit">수정하기</div>
                                </div>
                            </Link>
                        </span>
                    </div> :
                    null
                }
            </div>
        );
    }
}
export default Review;