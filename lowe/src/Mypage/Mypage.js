import { Component } from 'react';
import "./Mypage.css"
import axios from "axios";
import Footer from '../Nav/Footer';
import Coupon from './Coupon';
import Review from './Review';
import Edit from './Edit';
import SignoutModal from './SignoutModal';


class Mypage extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            list: 1,
            open: false
        }
    }


    openmodal = () =>  {
        this.setState({ open: true });
    };
    closemodal = () => {
        this.setState({ open: false });
    };


    componentDidMount = () => {
        let id = window.localStorage.getItem("id");
        if(id){
        axios.post("http://3.36.218.192:5000/getOneUser", {
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
                                                <div style={{ marginTop: "109px", marginBottom:"109px" }}>준비중입니다</div>
                                            </div>
                                        </div> : null
                                }
                                <Edit openmodal={this.openmodal} open={this.state.open} />
                            </div>
                        </> :
                        null
                    }
                </section>
                <SignoutModal open={this.state.open} closemodal={this.closemodal} />
                <Footer />
            </>
        );
    }
}
export default Mypage;