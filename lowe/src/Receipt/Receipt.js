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
            payment: ""
        };
    }

    componentDidMount = async (e) => {
        let path = window.location.pathname.split("/")[1];
        console.log(this.props.location.state)
        if (path === "mypayment") {
            let data = {
                board: { board: this.props.location.state.data.Board },
                BoardId: this.props.location.state.data.BoardId,
                coupons: this.props.location.state.data.Coupons,
                managerId: this.props.location.state.data.Board.ManagerId,
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
            await axios.post("https://d205rw3p3b6ysa.cloudfront.net/getPayment", {
                id: id,
            }).then((res) => {
                this.setState({ payment: res.data })
            }).catch((err) => {
                console.log(err)
            });

        } else {
            let recent_payment = JSON.parse(window.localStorage.getItem("recent_payment"));
            this.setState({ data: recent_payment })
            let id = window.location.pathname.split("/")[2];

            await axios.post("https://d205rw3p3b6ysa.cloudfront.net/getPayment", {
                id: id,
            }).then((res) => {
                this.setState({ payment: res.data })
            }).catch((err) => {
                console.log(err)
            });

            await axios.post("https://d205rw3p3b6ysa.cloudfront.net/getDesignerDetail", {
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


            if (this.state.store) {
                axios.post('https://d205rw3p3b6ysa.cloudfront.net/updatePayment', {
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
                    coupons: this.state.data.coupons
                }).then((res) => {
                    let reload = window.localStorage.getItem("reload");
                    if (!reload) {
                        window.localStorage.setItem("reload", true);
                        window.location.reload();
                    } else {
                        window.localStorage.removeItem("reload")
                    }
                })
            }
        }
    }


    render() {
        let path = window.location.pathname.split("/")[1];
        console.log(this.state)
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
                        <Firstsec data={this.state.data.board} mypayment={this.props.location.state ? this.props.location.state.data : ""} />
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
