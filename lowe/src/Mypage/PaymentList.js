import { Component } from 'react';
import axios from 'axios';
import Header from '../Sign/SignHeader';
import Footer from '../Nav/Footer';
import Payment from './Payment';
import "./PaymentList.css"


class PaymentList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            refund: [],
            done: []
        }
    }

    componentDidMount = () => {
        let id = window.localStorage.getItem("id");
        if (id) {
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/getPayment", {
                UserId: Number(id),
            })
                .then((res) => {
                    let data = [];
                    let refund = [];
                    let done= [];
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].state === "환불완료") {
                                refund.push(res.data[i])
                            } else if (res.data[i].state === "시술완료"){
                                done.push(res.data[i])
                            } else {
                                data.push(res.data[i])
                            }
                        }
                        this.setState({ data: data, refund: refund, done:done });
                    }
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
        let refund = this.state.refund
        let done = this.state.done
        return (
            <>
                <Header header="결제완료" />
                <div className='PaymentList_section'>
                    {
                        data.length || refund.length || done.length ?
                            <>
                                {
                                    data.map((e) => (
                                        <Payment key={e.id} data={e} />
                                    ))
                                }
                                {
                                    done.map((e) => (
                                        <Payment key={e.id} data={e} />
                                    ))
                                }
                                {
                                    refund.map((e) => (
                                        <Payment key={e.id} data={e} />
                                    ))
                                }
                            </>
                            :
                            <div className="mypage_noreview">
                                <img src={process.env.PUBLIC_URL + "/image/nav/no_review.svg"} alt="등록한 리뷰가 없습니다"></img>
                                <div>
                                    <div>앗!</div>
                                    <div>아직 결제하신 내역이 없어요</div>
                                </div>
                            </div>
                    }
                </div>
                <Footer />
            </>
        );
    }
}
export default PaymentList;