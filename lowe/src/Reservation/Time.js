import React from "react";
import "./Time.css";
import moment from 'moment';

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: [],
            close: false
        };
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <section className="Reservation_time_section" id="reservation_time">
                {
                    this.props.date ?
                        <>
                            <div className="Reservation_time_title">시간선택</div>
                            <div style={{ textAlign: "center" }}>
                                {
                                    this.props.empty ?
                                        <div className="Reservation_time_zone">
                                            {
                                                this.props.empty.map((e, i) => (
                                                    <>
                                                        {
                                                            e.time.time !== "none" ?
                                                                e.empty === true ?
                                                                    (e.time.time === "10:30" || e.time.time === "11:00" || e.time.time === "11:30") && new Date(moment(this.props.date)).toLocaleDateString("it-IT", { dateStyle: "short" }) === new Date(moment().add(1, "days")).toLocaleDateString("it-IT", { dateStyle: "short" }) && Number(new Date().toLocaleTimeString("it-IT", { timeStyle: "short" }).slice(0, 2) >= 17) ?
                                                                        <span key={e.id} className="Reservation_time_span_cantselect">{e.time.type} {e.time.show} </span> :
                                                                        <span key={e.id} onClick={this.props.selectTime(e.time.time)} className={this.props.time === e.time.time ? "Reservation_time_span_select" : "Reservation_time_span_nonselect"}>{e.time.type} {e.time.show}</span> :
                                                                    <span key={e.id} className="Reservation_time_span_cantselect">{e.time.type} {e.time.show} </span>
                                                                : <span key={e.id} className="Reservation_time_span_none" style={{ border: "none" }}>ㅤ</span>
                                                        }
                                                    </>
                                                ))
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                        </>
                        : null
                }
            </section>
        );
    }
}

export default Time;