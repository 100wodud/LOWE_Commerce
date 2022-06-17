import { Component } from "react";
import Header from "../Sign/SignHeader";
import Contact from "./Contact";
import Fifthsec from "./Fifthsec";
import Firstsec from "./Firstsec";
import Fourthsec from "./Fourthsec";
import Thirdsec from "./Thirdsec";
import axios from "axios";
import Store from "../data/Store";
import RFooter from "./RFooter";
import Secondsec from "./Secondsec";

class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            manager: "",
            store: "",
            payment: "",
        };
    }

    componentDidMount = async (e) => {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let path = window.location.pathname.split("/")[1];
        if (path === "mypayment") {
            let data = {
                board: { board: this.props.location.state.data.Board },
                BoardId: this.props.location.state.data.BoardId,
                coupons: this.props.location.state.data.Coupons,
                managerId: this.props.location.state.data.ManagerId,
                price: this.props.location.state.data.pay_total,
                request: {
                    text: this.props.location.state.data.user_request,
                    img: this.props.location.state.data.Images
                },
                user: this.props.location.state.data.User,
                userId: this.props.location.state.data.UserId
            }
            this.setState({ data: data, manager: this.props.location.state.data.Manager })

            let id = window.location.pathname.split("/")[2];
            if (this.props.location.state.data.Manager.store) {
                for (let i = 0; i < Store.length; i++) {
                    if (Store[i].store.indexOf(this.props.location.state.data.Manager.store) !== -1) {
                        this.setState({ store: Store[i] })
                    }
                }
            }
            await axios.post("https://server.lowehair.kr/getPayment", {
                id: id,
            }).then((res) => {
                this.setState({ payment: res.data })
            }).catch((err) => {
                console.log(err)
            });

        } else {
            let recent_payment = JSON.parse(window.localStorage.getItem("recent_payment"));
            let userid = window.localStorage.getItem("id");
            this.setState({ data: recent_payment })
            let id = window.location.pathname.split("/")[2];
            let reload = window.localStorage.getItem("reload");
            await axios.post("https://server.lowehair.kr/getPayment", {
                id: id,
            }).then((res) => {
                if (Number(userid) === res.data[0].User.id) {
                    this.setState({ payment: res.data })
                } else {
                    window.location.href = `/${funnel}`

                }
            }).catch((err) => {
                console.log(err)
            });

            await axios.post("https://server.lowehair.kr/getDesignerDetail", {
                id: recent_payment.managerId,
            }).then((res) => {
                this.setState({ manager: res.data })
                if (res.data.store) {
                    for (let i = 0; i < Store.length; i++) {
                        if (Store[i].store.indexOf(res.data.store) !== -1) {
                            this.setState({ store: Store[i] })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            });
           

            if (reload === "false") {
                axios.post('https://server.lowehair.kr/updatePayment', {
                    id: Number(id), //결제 DB 상의 id 값
                    ManagerId: this.state.manager.id,
                    BoardId: this.state.data.board.board.id,
                    UserId: Number(window.localStorage.getItem('id')),
                    state: '결제완료', //원하시는 형태로 결제 상태 입력해주세요!
                    user_request: this.state.data.request.text,
                    request_img: this.state.data.request.img,
                    list_price: this.state.data.board.board.eventPrice
                        ? null
                        : this.state.data.board.board.price,
                    event_price: this.state.data.board.board.eventPrice
                        ? this.state.data.board.board.price
                        : null,
                    event_percent: this.state.data.board.board.eventPrice,
                    coupons: this.state.data.coupons,
                    text: this.state.data.board.board.name,
                }).then((res) => {
                    window.localStorage.setItem("reload", "true");
                    axios.post("https://server.lowehair.kr/alert", {
                        type: 2,
                        PaymentId: Number(id)
                    }).then((res) => {
                        window.location.reload();
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            } 
            else {
                    const webhookUrl = 'https://hooks.slack.com/services/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' //리얼;
                    // const webhookUrl= 'https://hooks.slack.com/services/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' //테스트
                    const data = {
                        "text": `${this.state.data.board.board.name}\n상품금액: ${this.state.data.board.board.price.comma()}원\n지점: ${this.state.store.store} \n<http://lowehair.admin.s3-website.ap-northeast-2.amazonaws.com/payments|결제 확인하기>`,
                    }
                    let res = await axios.post(webhookUrl, JSON.stringify(data), {
                        withCredentials: false,
                        transformRequest: [(data, headers) => {
                            delete headers.post["Content-Type"]
                            return data
                        }]
                    })
                
                    if (res.status === 200) {
                        console.log("성공")
                    } 
            }
        }
    }


    render() {
        let path = window.location.pathname.split("/")[1];
        return (
            <>
                {
                    path === `mypayment` ?
                        <Header header="결제 내역" /> :
                        <Header header="결제 내역" home={true} />
                }
                {this.state.payment ?
                    <>
                        <Contact />
                        <Firstsec data={this.state.data.board} mypayment={this.props.location.state ? this.props.location.state.data : ""} payment={this.state.payment[0]} />
                        <Secondsec payment={this.state.payment} user={this.state.data.user} />
                        <Thirdsec data={this.state.data.board} coupon={this.state.data.coupons} price={this.state.data.price} />
                        <Fourthsec manager={this.state.manager} store={this.state.store} />
                        <Fifthsec request={this.state.data.request} />
                    </> : null
                }
                {
                    path === `mypayment` ?
                        null :
                        <RFooter />
                }
            </>
        )
    }
}

export default Receipt;
