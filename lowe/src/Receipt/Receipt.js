import { Component } from "react";
import Header from "../Sign/SignHeader";
import Fifthsec from "./Fifthsec";
import Firstsec from "./Firstsec";
import Fourthsec from "./Fourthsec";
import Thirdsec from "./Thirdsec";
import axios from "axios";
import Store from "../data/Store";
import RFooter from "./RFooter";
import Secondsec from "./Secondsec";
import TagManager from "react-gtm-module";

class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            manager: "",
            store: "",
            payment: "",
            surgery_date: "",
        };
    }

    componentDidMount = async (e) => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        let path = window.location.pathname.split("/")[1];
        if (path === "mypayment") {
            let point = 0
            if (this.props.location.state.data.Points.length) {
                if (this.props.location.state.data.Points[0].isSaved === false) {
                    point = this.props.location.state.data.Points[0].point
                }
            }
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
                userId: this.props.location.state.data.UserId,
                point: point
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

            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    window.location.reload();
                }
                else{
                    const tagManagerArgs = {
                        dataLayer: {
                            event: 'view_reservation_detail_page',
                            transaction_id: this.state.payment[0].pay_cardtradenum
                        },
                    };
                    TagManager.dataLayer(tagManagerArgs);
                    localStorage.removeItem('firstLoad');
                }
            }

        } else {
            let recent_payment = JSON.parse(window.localStorage.getItem("recent_payment"));
            let reservation_date = JSON.parse(window.localStorage.getItem("reservation_date"));
            let userid = window.localStorage.getItem("id");
            let uuid = window.localStorage.getItem("uuid");
            this.setState({ data: recent_payment, surgery_date: reservation_date })
            let id = window.location.pathname.split("/")[2];
            await axios.post("https://server.lowehair.kr/getPayment", {
                id: id, isUserPayment: true
            }).then((res) => {
                if (Number(userid) === res.data[0].User.id) {
                    let cat = ""
                    if (this.state.data.board.board.category === 1) {
                        cat = "???";
                    } else if (this.state.data.board.board.category === 2) {
                        cat = "???"
                    } else if (this.state.data.board.board.category === 3) {
                        cat = "??????"
                    } else if (this.state.data.board.board.category === 5) {
                        cat = "?????????"
                    } else {
                        cat = "??????"
                    }
                    let c =""
                    let cd =""
                    if(res.data[0].Coupons.length > 0){
                        c =res.data[0].Coupons[0].content
                        cd = res.data[0].Coupons[0].price
                    }
                    let disc = 0;
                    if(res.data[0].Board.listPrice > 0 && res.data[0].BoardId !== 122){
                        disc = res.data[0].Board.listPrice - res.data[0].Board.price
                    }

                    const tagManagerArgs = {
                        dataLayer: {
                            event: 'purchase',
                            user_id: uuid,
                            value: res.data[0].pay_total,
                            coupon: c,
                            coupon_discount: cd,
                            transaction_id: res.data[0].pay_cardtradenum,
                            first_purchase: res.data[0].User.Payments.length > 0 ? true : false,
                            items: [
                                {
                                    item_id: this.state.data.board.board.id,
                                    item_name: this.state.data.board.board.name,
                                    price: this.state.data.board.board.price,
                                    discount: disc,
                                    item_brand: this.state.data.board.board.store,
                                    item_variant: this.state.data.board.board.designer_name,
                                    item_category: cat
                                }
                            ]
                        },
                    };
                    TagManager.dataLayer(tagManagerArgs);
                    this.setState({ payment: res.data })
                    axios.post('https://server.lowehair.kr/updatePayment', {
                        id: Number(id), //?????? DB ?????? id ???
                        ManagerId: recent_payment.managerId,
                        BoardId: this.state.data.board.board.id,
                        UserId: Number(window.localStorage.getItem('id')),
                        state: '????????????', //???????????? ????????? ?????? ?????? ??????????????????!
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
                        surgery_date: reservation_date,
                        point: this.state.data.point
                    }).then((res) => {
                    })
                } else {
                    window.location.href = `/${funnel}`

                }
            }).catch((err) => {
                console.log(err)
            });

            await axios.post("https://server.lowehair.kr/getDesigner", {
                id: recent_payment.managerId
            }).then((res) => {
                this.setState({ manager: res.data[0] })
                if (res.data[0].store) {
                    for (let i = 0; i < Store.length; i++) {
                        if (Store[i].store.indexOf(res.data[0].store) !== -1) {
                            this.setState({ store: Store[i] })
                        }
                    }
                }

            }).catch((err) => {
                console.log(err)
            });
        }
    }


    render() {
        let path = window.location.pathname.split("/")[1];
        return (
            <>
                {
                    path === `mypayment` ?
                        <Header header="?????? ??????" /> :
                        null
                }
                {

                    path === `mypayment` ?
                        this.state.payment ?
                            <>
                                <Firstsec data={this.state.data.board} mypayment={this.props.location.state ? this.props.location.state.data : ""} payment={this.state.payment[0]} />
                                <Secondsec payment={this.state.payment} user={this.state.data.user} />
                                <Thirdsec data={this.state.data.board} point={this.state.data.point} coupon={this.state.data.coupons} price={this.state.data.price} payment={this.state.payment[0]} />
                                <Fourthsec manager={this.state.manager} store={this.state.store} />
                                <Fifthsec request={this.state.data.request} />
                            </> :
                            <>
                            </> : null
                }
                {
                    path === `mypayment` ?
                        null :

                        this.state.payment ?
                            <>
                                <RFooter payment={this.state.payment[0]} date={this.state.surgery_date} />
                                <div id="script"></div>
                            </> : null
                }
            </>
        )
    }
}

export default Receipt;
