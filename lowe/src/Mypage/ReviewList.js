import { Component } from 'react';
import "./ReviewList.css";
import axios from 'axios';
import Review from './Review';
import Header from '../Sign/SignHeader';
import Footer from '../Nav/Footer';


class ReviewList extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    componentDidMount = () => {
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/getOneUser", {
                id: id,
            })
                .then((res) => {
                    this.setState({ data: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            window.location.replace("/signin")
        }
    }

    render() {
        let data = this.state.data
        return (
            <>
                <Header header="마이리뷰" />
                <div className='Review_myreviews'>
                {this.state.data ?
                    <div className="myreview" >
                        {
                            data.Reviews.length ?
                                data.Reviews.map((e) => (
                                    <Review key={e.id} data={e} />
                                ))
                                :
                                <div className="mypage_noreview">
                                    <img src={process.env.PUBLIC_URL + "/image/nav/no_review.svg"} alt="등록한 리뷰가 없습니다"></img>
                                    <div>
                                        <div>앗!</div>
                                        <div>아직 작성된 리뷰가 없어요</div>
                                    </div>
                                </div>
                        }
                    </div> :
                    <div className="mypage_noreview">
                        <img src={process.env.PUBLIC_URL + "/image/nav/no_review.svg"} alt="등록한 리뷰가 없습니다"></img>
                        <div>
                            <div>앗!</div>
                            <div>아직 작성된 리뷰가 없어요</div>
                        </div>
                    </div>
                }
                </div>
                <Footer />
            </>
        );
    }
}
export default ReviewList;