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
            data: "",
            payment: [],
            tab: false
        }
    }

    componentDidMount = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("http://54.180.117.244:5000/getOneUser", {
                id: id,
            })
                .then((res) => {
                    this.setState({ data: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })

            axios.post("http://54.180.117.244:5000/getPayment", {
                UserId: Number(id),
            })
                .then((res) => {
                    let done = [];
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].state === "시술완료" && res.data[i].review) {
                                done.push(res.data[i])
                            }
                        }
                        this.setState({ payment: done });
                    }
                })
                .catch(err => {
                    console.log("에러")
                })
        } else {
            window.location.href = `/signin${funnel}`
        }
    }
    onclickAll =()=>{
        this.setState({tab: false})
    }
    onclickPromotion =()=>{
        this.setState({tab: true})
    }

    render() {
        let data = this.state.data
        return (
            <>
                <Header header="리뷰" />
                <div className="filter-myreview">
                    <p style={{ lineHeight: "43px" }} className={(this.state.tab ? "pull_button" : 'push_button')} onClick={this.onclickAll}>작성 가능한 리뷰</p>
                    <p style={{ lineHeight: "43px" }} className={(this.state.tab ? "push_button" : 'pull_button')} onClick={this.onclickPromotion}>마이 리뷰</p>
                </div>
                <div className='Review_myreviews'>
                    {
                        this.state.tab ?
                            this.state.data ?
                                <div>
                                    {
                                        data.Reviews.length > 0 ?
                                            data.Reviews.map((e) => (
                                                <Review key={e.id} data={e} possible={false} />
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
                                </div> :
                            this.state.payment ?
                                <div>
                                    {
                                        this.state.payment.length > 0 ?
                                            this.state.payment.map((e) => (
                                                <Review key={e.id} data={e} possible={true}/>
                                            ))
                                            :
                                            <div className="mypage_noreview">
                                                <img src={process.env.PUBLIC_URL + "/image/nav/no_review.svg"} alt="등록한 리뷰가 없습니다"></img>
                                                <div>
                                                    <div>앗!</div>
                                                    <div>작성가능한 시술 내역이 없어요</div>
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