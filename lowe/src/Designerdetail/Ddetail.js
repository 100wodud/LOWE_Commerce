import { Component } from "react";
import Footer from "../Nav/Footer";
import Header from "../Nav/Header";
import axios from "axios";
import Firstsec from "./Firstsec";
import DesignerList from "../Designer/DesignerList";
import "./Ddetail.css"
import Secondsec from "./Secondsec";
import ModalPhone from "../Sign/ModalPhone";

class Ddetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            list: 1,
            coupon: "",
            modal: false,
            modalcomment: "",
            review: [],
            imgreview: []
        };
    }
    
    openmodalPhone =(e)=>()  => {
        this.setState({ modal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ modal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        let id = window.location.pathname.split("/")[2];
        let arr = []
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/getDesignerDetail", {
            id: id,
        }).then((res) => {
            let coupon = ""
            if(res.data.coupons){
                coupon = JSON.parse(res.data.coupons)
            }

            this.setState({data: res.data, coupon: coupon})
        }).catch((err) => {
            console.log(err)
        });


        axios.post(`https://d205rw3p3b6ysa.cloudfront.net/getReview`, {
            ManagerId: id,
        }).then((res) => {

        if(res.data.data.length){
            for(let i=0; i < res.data.data.length; i++){
                if(res.data.data[i].Images.length){
                        arr.push(res.data.data[i])
                }
            }
            this.setState({review: res.data.data, imgreview: arr})
        }
        }).catch((err) => {
            console.log(err)
        });
        let tab=window.location.href.split("#")[1];
        if(tab === "Ddetailmenu"){
            this.setState({list: 2})
        } else if(tab === "Ddetailreview"){
            this.setState({list: 3})
        }else if(tab === "Ddetailinfo"){
            this.setState({list: 4})
        } else {
            this.setState({list: 1})
        }
    }

    onClickCoupon = () => {
        let user_id = Number(window.localStorage.getItem("id"));
        axios.post("https://d205rw3p3b6ysa.cloudfront.net/createCoupon", {
            UserId: user_id,
            price: Number(this.state.coupon.couponprice),
            content: this.state.coupon.coupontext,
            used: "1",
            expired: this.state.coupon.couponexpired,
            minimum: Number(this.state.coupon.couponlimit),
            ManagerId: this.state.data.id
        }).then((res)=>{
            setTimeout(() => {
                this.openmodalPhone(`쿠폰발급 완료 :)`)()
            })
        }).catch((err)=>{
            setTimeout(() => {
                this.openmodalPhone(`이미 받으신 쿠폰 입니다`)()
            })
        })
    }


    onclickList = (e) => () => {
        this.setState({ list: e })
    }

    render() {
        return (
            <>
                <Header header="clear" />
                {this.state.data && this.state.data.user_state ===1 ?
                    <>
                        <Firstsec data={this.state.data} />
                        <DesignerList data={this.state.data} />
                        {
                            this.state.coupon ? 
                            <div className="Ddetail_coupon_div">
                                <div className="Ddetail_coupon" onClick={this.onClickCoupon}>
                                    <span style={{lineHeight: "48px", paddingLeft: "20px"}}>
                                        <span style={{font: '700 13px "Montserrat"', color: "#FF6746"}}>{this.state.coupon.couponprice.comma()}원</span>
                                        <span style={{font: '700 13px "Noto Sans'}}> 할인 쿠폰</span>
                                        <span style={{marginLeft:"8px", font: '700 12px "Montserrat"', color: "#9C9C9C"}}>{this.state.coupon.couponexpired.slice(2,8).replaceAll("-",".")}01~{this.state.coupon.couponexpired.slice(2,10).replaceAll("-",".")}</span>
                                    </span>
                                    <span style={{paddingLeft: "8px"}}><img src={process.env.PUBLIC_URL + "/image/nav/coupon_downlord.svg"} alt="로위 쿠폰 다운로드" /></span>
                                </div>
                            </div> :
                            null
                        }
                            <div className="Ddetail-filter">
                                <p id="Ddetailboard" className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)}>상품</p>
                                <p id="Ddetailmenu" className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)}>메뉴</p>
                                <p id="Ddetailreview" className={(this.state.list === 3 ? "push_button" : 'pull_button')} onClick={this.onclickList(3)}>리뷰</p>
                                <p id="Ddetailinfo" className={(this.state.list === 4 ? "push_button" : 'pull_button')} onClick={this.onclickList(4)}>정보</p>
                            </div>
                        <Secondsec list={this.state.list} data={this.state.data} review={this.state.review} imgreview={this.state.imgreview} openmodalPhone={this.openmodalPhone} />
                    </>
                    : <div style={{ height:"100vh", textAlign: "center",lineHeight: "100vh"}}>
                       잠시만 기다려 주세요 :)
                    </div>
                }
                <Footer data={this.state.data} designer={this.state.designer} />
                <ModalPhone open={this.state.modal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Ddetail;
