import { Component } from 'react';
import "./BFooter.css";
import axios from "axios";


class BFooter extends Component {
    constructor() {
        super();
        this.state = {
            accordion: true
        }
    }

    onClicknumber = () => {
        let id = Number(window.location.pathname.split("/")[2]);
        let userid = Number(window.localStorage.getItem("id"));
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel=window.location.href.split("?")[1];
        } else{
            funnel='/'
        }
        if (userid) {
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/click", {
                type: 1,
                BoardId: id,
                UserId: userid,
                funnel: funnel
            })
                .then((res) => {
                    window.location.href = '/payment/'+this.props.data.board.id
                }).catch((err) => {
                });
        } else {
            axios.post("https://d205rw3p3b6ysa.cloudfront.net/click", {
                type: 1,
                BoardId: id,
                funnel:funnel
            })
                .then((res) => {
                    window.location.href = '/payment/'+this.props.data.board.id
                }).catch((err) => {
                });
        }
    }

    render() {
        return (
            <footer className='BFooter'>
                {this.props.data && this.props.designer ?
                    <>
                        {/* <div style={{ maxWidth: "92px", width: "21%", float: "left", marginRight: "0.4%" }}>
                            <a className='BFooter_review' href='#review' style={{ lineHeight: "65px" }}>
                                <div style={{ paddingTop: "14px", }}>리뷰</div>
                                <div>({this.props.data.board.Reviews.length})</div>
                            </a>
                        </div>
                        <div style={{ maxWidth: "108px", width: "25.2%", float: "left", marginRight: "0.4%" }}>
                            {
                                this.props.data.board.eventType === 1 ?
                                    <div style={{ lineHeight: "65px", height: "65px", textAlign: "left", marginLeft: "16px", marginTop: "14px" }}>
                                        <div style={{ fontFamily: "Montserrat" }}>{this.props.data.board.eventPrice}%</div>
                                        <div style={{ fontWeight: "700", fontFamily: "Montserrat" }}>{this.props.data.board.price.comma()}</div>
                                    </div> :
                                    <div style={{ fontWeight: "700", fontFamily: "Montserrat", lineHeight: "65px" }}>{this.props.data.board.price.comma()}</div>

                            }
                        </div>
                        <div className='BFooter_res' style={{ maxWidth: "230px", width: "52.9%", float: "left" }} onClick={this.onClicknumber} >
                            예약하기
                        </div> */}
                        <div className='BFooter_kakao'>
                            <a href="http://pf.kakao.com/_xlzsPs/chat" >
                                <img src={process.env.PUBLIC_URL + "/image/nav/gotokakao.svg"} alt="문의하기" />
                            </a>
                        </div>
                        <div className='BFooter_payment' onClick={this.onClicknumber}>
                            <div>
                                <div>예약하기</div>
                            </div>
                        </div>
                    </> 
                    : null
                }
            </footer >
        );
    }
}
export default BFooter;