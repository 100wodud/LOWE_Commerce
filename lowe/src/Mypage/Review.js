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
        axios.post("http://3.36.218.192:5000/getBoardDetail", {
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
                    <a href={`/board/${this.props.data.BoardId}`}>
                        <div className="myreview_img">
                            <img src={this.state.data.thumbnail} alt={this.state.data.name} />
                        </div>
                        <div className="myreview_content">
                            <div className="myreview_board">{this.state.data.name}</div>
                            <div>
                                <div className="myreviwew_edit">
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
                                    }}>수정하기</Link>
                                </div>
                            </div>
                        </div>
                    </a> :
                    null
                }
            </div>
        );
    }
}
export default Review;