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
            await axios.post("http://54.180.117.244:5000/getPayment", {
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
                else
                    localStorage.removeItem('firstLoad');
            }

        } else {
            let recent_payment = JSON.parse(window.localStorage.getItem("recent_payment"));
            let reservation_date = JSON.parse(window.localStorage.getItem("reservation_date"));
            let userid = window.localStorage.getItem("id");
            this.setState({ data: recent_payment, surgery_date: reservation_date })
            let id = window.location.pathname.split("/")[2];
            await axios.post("http://54.180.117.244:5000/getPayment", {
                id: id,
            }).then((res) => {
                if (Number(userid) === res.data[0].User.id) {
                    this.setState({ payment: res.data })
                    axios.post('http://54.180.117.244:5000/updatePayment', {
                        id: Number(id), //결제 DB 상의 id 값
                        ManagerId: recent_payment.managerId,
                        BoardId: this.state.data.board.board.id,
                        UserId: Number(window.localStorage.getItem('id')),
                        state: '예약확정', //원하시는 형태로 결제 상태 입력해주세요!
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
                        surgery_date: reservation_date
                    }).then((res) => {
                    })
                } else {
                    window.location.href = `/${funnel}`

                }
            }).catch((err) => {
                console.log(err)
            });

            await axios.post("http://54.180.117.244:5000/getDesignerDetail", {
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
        }
    }


    render() {
        let path = window.location.pathname.split("/")[1];
        return (
            <>
                {
                    path === `mypayment` ?
                        <Header header="예약 내역" /> :
                        null
                }
                {

                    path === `mypayment` ?
                        this.state.payment ?
                            <>
                                <Firstsec data={this.state.data.board} mypayment={this.props.location.state ? this.props.location.state.data : ""} payment={this.state.payment[0]} />
                                <Secondsec payment={this.state.payment} user={this.state.data.user} />
                                <Thirdsec data={this.state.data.board} coupon={this.state.data.coupons} price={this.state.data.price} payment={this.state.payment[0]} />
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
