import React from "react";
import Header from "../Sign/SignHeader";
import Calendar from "./Calendar";
import Firstsec from "./Firstsec";
import Time from "./Time";
import axios from "axios";
import RFooter from "./RFooter";
import RModal from "./RModal";

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            date: "",
            time: "",
            empty: [],
            payment_date: "",
            modal: false
        };
    }

    componentDidMount = () => {

        let id = window.location.pathname.split("/")[2];
        let path = window.location.pathname.split("/")[1];
        if (path === "reservation_board") {
            axios.post("http://54.180.117.244:5000/getBoardDetail", {
                id: id,
            }).then((res) => {
                this.setState({ data: res.data });
            }).catch((err) => {
                console.log(err)
            });
        } else if (path === "reservation_surgery") {
            let data = {}
            axios.get(`http://54.180.117.244:5000/surgery?id=${id}`, {
            }).then((res) => {
                data = {
                    board: {
                        id: 122,
                        ManagerId: res.data[0].ManagerId,
                        price: res.data[0].price,
                        designer_name: res.data[0].Manager.name,
                        store: res.data[0].Manager.store,
                        thumbnail: "https://lowe-image.s3.ap-northeast-2.amazonaws.com…8237171_525430271510486_1571957910076915712_n.png",
                        name: res.data[0].content,
                        eventPrice: 0,
                    },
                }
                this.setState({ data: data });
            }).catch((err) => {
                console.log(err)
            });

        } else if (path === "reservation_change") {
            let id = window.location.pathname.split("/")[2];
            axios.post("http://54.180.117.244:5000/getPayment", {
                id: id,
            }).then((res) => {
                if (res.data[0].SurgeryId) {
                    let data = {}
                    data = {
                        board: {
                            id: 122,
                            ManagerId: res.data[0].Surgery.ManagerId,
                            price: res.data[0].Surgery.price,
                            designer_name: res.data[0].Manager.name,
                            store: res.data[0].Manager.store,
                            name: res.data[0].Surgery.content,
                            eventPrice: 0,
                        },
                    }
                    this.setState({ data: data, payment_date: res.data[0].surgery_date });
                } else {
                    this.setState({ data: {board: res.data[0].Board}, payment_date: res.data[0].surgery_date  })
                }
            }).catch((err) => {
                console.log(err)
            });

        }
    }

    selectDate = (v) => () => {
        this.setState({ date: v, time: "" })
        let array = [];
        let arr = [{ time: "10:30", type: "오전", show: "10:30" }, { time: "11:00", type: "오전", show: "11:00" },
        { time: "11:30", type: "오전", show: "11:30" }, { time: "12:00", type: "오후", show: "12:00" }, { time: "12:30", type: "오후", show: "12:30" },
        { time: "13:00", type: "오후", show: "01:00" }, { time: "13:30", type: "오후", show: "01:30" }, { time: "14:00", type: "오후", show: "02:00" },
        { time: "14:30", type: "오후", show: "02:30" }, { time: "15:00", type: "오후", show: "03:00" }, { time: "15:30", type: "오후", show: "03:30" },
        { time: "16:00", type: "오후", show: "04:00" }, { time: "16:30", type: "오후", show: "04:30" }, { time: "17:00", type: "오후", show: "05:00" },
        { time: "17:30", type: "오후", show: "05:30" }, { time: "18:00", type: "오후", show: "06:00" }, { time: "18:30", type: "오후", show: "06:30" },
        { time: "19:00", type: "오후", show: "07:00" }, { time: "19:30", type: "오후", show: "07:30" }, { time: "none", type: "오후", show: "none" }]

        axios.post(`http://54.180.117.244:5000/getSchedule`, {
            scheduleDate: v,
            ManagerId: this.state.data.board.ManagerId
        }).then((res) => {
            for (let i = 0; i < arr.length; i++) {
                let empty = true
                for (let j = 0; j < res.data.length; j++) {
                    if (res.data[j].startTime.slice(11, 16) === arr[i].time) {
                        array.push({ id: i + 1, time: arr[i], empty: false });
                        empty = false;
                        break
                    }
                }
                if (empty) {
                    array.push({ id: i + 1, time: arr[i], empty: true });
                }
            }
            this.setState({ empty: array })
        }).catch((err) => {
            console.log(err)
        });
    }

    selectTime = (v) => () => {
        this.setState({ time: v })
    }

    gotoPayment = () => {
        if (this.state.date && this.state.time) {
            let reservation_date = this.state.date + " " + this.state.time;
            localStorage.setItem("reservation_date", JSON.stringify(reservation_date));
            this.setState({payment_date: reservation_date})
            let id = window.location.pathname.split("/")[2];
            let path = window.location.pathname.split("/")[1];
            if (path === "reservation_board") {
                window.location.href = `/payment/${id}/${reservation_date}`
            } else if (path === "reservation_surgery") {
                window.location.href = `/surgery/${id}/${reservation_date}`
            }
        } else {
            window.alert("날짜를 선택해 주세요")
        }
    }

    changePaymentDate = () => {
        let paymentid = window.location.pathname.split("/")[2];
        if (this.state.date && this.state.time) {
            let reservation_date = this.state.date + " " + this.state.time;
             axios.patch('http://54.180.117.244:5000/schedule', {
                PaymentId: paymentid,
                state: '예약변경',
                schedule_confirm: false,
                startTime: reservation_date,
          }).then(()=>{
                axios.post("http://54.180.117.244:5000/alert", {
                    type: "reserveChange",
                    PaymentId: paymentid,
                    isUser: true,
                    isDesigner: true,
                    isLowe: true
                }).then((res) => {
                    this.setState({modal: true, payment_date: reservation_date})
                }).catch((err) => {
                    console.log(err)
                })
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
            window.alert("날짜를 선택해 주세요")
        }

    }

    render() {
        return (
            <>
                {this.state.data ?
                    <>
                        <Header header="예약하기" />
                        <Firstsec data={this.state.data} payment_date={this.state.payment_date} />
                        <Calendar selectDate={this.selectDate} />
                        <Time selectTime={this.selectTime} date={this.state.date} data={this.state.data} empty={this.state.empty} time={this.state.time} />
                        <RFooter gotoPayment={this.gotoPayment} changePaymentDate={this.changePaymentDate} date={this.state.date} data={this.state.data} time={this.state.time} />
                        {
                            this.state.modal ?
                            <RModal data={this.state.data}  payment_date={this.state.payment_date} /> : null
                        }
                    </> : null
                }
            </>
        );
    }
}

export default Reservation;