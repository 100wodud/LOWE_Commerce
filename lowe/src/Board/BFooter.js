import { Component } from 'react';
import "./BFooter.css";
import axios from "axios";
import TagManager from "react-gtm-module";


class BFooter extends Component {
    constructor() {
        super();
        this.state = {
            accordion: true
        }
    }

    onClicknumber = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_reservation',
            },
        };
        TagManager.dataLayer(tagManagerArgs);

        let id = Number(window.location.pathname.split("/")[2]);
        let userid = Number(window.localStorage.getItem("id"));
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        if (userid) {
            axios.post("https://server.lowehair.kr/click", {
                type: 1,
                BoardId: id,
                UserId: userid,
                funnel: funnel
            })
                .then((res) => {
                    window.location.href = '/reservation_board/'+this.props.data.board.id+funnel
                }).catch((err) => {
                });
        } else {
            axios.post("https://server.lowehair.kr/click", {
                type: 1,
                BoardId: id,
                funnel:funnel
            })
                .then((res) => {
                    window.location.href = '/signin'+funnel
                }).catch((err) => {
                });
        }
    }


    onClickkakao = async() => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_kakaochat',
            },
        };
        await TagManager.dataLayer(tagManagerArgs);
    }

    render() {
        return (
            <footer className='BFooter'>
                {this.props.data && this.props.designer ?
                    <>
                        {/* <div style={{ maxWidth: "92px", width: "21%", float: "left", marginRight: "0.4%" }}>
                            <a className='BFooter_review' href='#review' style={{ lineHeight: "65px" }}>
                                <div style={{ paddingTop: "14px", }}>??????</div>
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
                            ????????????
                        </div> */}
                        <div className='BFooter_kakao'>
                            <a href="http://pf.kakao.com/_xlzsPs/chat" >
                                <img src={process.env.PUBLIC_URL + "/image/nav/gotokakao.svg"} alt="????????????" onClick={this.onClickkakao}/>
                            </a>
                        </div>
                        <div className='BFooter_payment' onClick={this.onClicknumber}>
                            <div>
                                <div>????????????</div>
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