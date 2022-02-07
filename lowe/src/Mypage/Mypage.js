import { Component } from 'react';
import "./Mypage.css"
import axios from "axios";
import Footer from '../Nav/Footer';
import Coupon from './Coupon';
import Review from './Review';


class Mypage extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            list: 1,
        }
    }

    componentDidMount = () => {
        let id = window.localStorage.getItem("id");
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getOneUser", {
            id: id,
        })
            .then((res) => {
                this.setState({ data: res.data[0] })
            })
            .catch(err => {
                console.log("에러")
            })
    }

    onclickList = (e) => () => {
        this.setState({ list: e })
    }

    render() {
        let data = this.state.data
        return (
            <>
                <section>
                    {data ?
                        <>
                            <div className="login_id">{data.login_id}님</div>
                            <div className="mypage-filter">
                                <p className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>쿠폰</p>
                                <p className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>마이리뷰</p>
                                <p className={(this.state.list === 3 ? "push_button" : 'pull_button')} onClick={this.onclickList(3)}>시술내역</p>
                            </div>
                            <div className="mypage-list">
                                {
                                    this.state.list === 1 ?
                                        <Coupon data={data.Coupons} /> : null
                                }
                                {
                                    this.state.list === 2 ?
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
                                        : null
                                }
                                {
                                    this.state.list === 3 ?
                                        <div className="mypage_noreview">
                                            <div>
                                                <div style={{ marginTop: "150px" }}>준비중입니다</div>
                                            </div>
                                        </div> : null
                                }

                            </div>
                        </> :
                        null
                    }
                </section>
                <Footer />
            </>
        );
    }
}
export default Mypage;