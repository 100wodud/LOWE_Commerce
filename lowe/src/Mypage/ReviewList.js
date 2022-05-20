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
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://server.lowehair.kr/getOneUser", {
                id: id,
            })
                .then((res) => {
                    this.setState({ data: res.data[0] })
                })
                .catch(err => {
                    console.log("에러")
                })

                // axios.post("https://server.lowehair.kr/getPayment", {
                //     UserId: Number(id),
                // })
                //     .then((res) => {
                //         let done= [];
                //         if (res.data) {
                //             for (let i = 0; i < res.data.length; i++) {
                //                 if (res.data[i].state === "시술완료"){
                //                     done.push(res.data[i])
                //                 } 
                //             }
                //             this.setState({ payment: done });
                //         }
                //     })
                //     .catch(err => {
                //         console.log("에러")
                //     })
        } else {
            window.location.href = `/signin${funnel}`
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