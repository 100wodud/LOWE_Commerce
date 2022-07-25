import { Component } from "react";
import Calendars from 'react-calendar';
import './Calendar.css';
import moment from 'moment';


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    onChangedate = (e) => {
        this.setState({ date: e })
        let kdate = new Date(e.toISOString());
        this.props.selectDate(new Date(kdate.getTime() - (kdate.getTimezoneOffset() * 60000)).toISOString().slice(0, 10))()
        window.location.href = window.location.pathname + "#reservation_time"
    }

    render() {
        // 
        return (
            <section className='Reservation_second_section'>
                <div className="Reservation_second_title">날짜선택</div>
                <div className='Calendar'>
                    <div className='Reservation_Calendar_container'>
                        <Calendars 
                            onChange={this.onChangedate}
                            formatDay={(locale, date) =>
                                date.toLocaleString("en", { day: "numeric" })
                            }
                            defaultActiveStartDate = {new Date(moment().add(1, 'days'))}
                            minDate={new Date(moment().add(1, 'days'))}
                            locale={"US"} calendarType={"US"} view={"month"} prev2Label={""} next2Label={""} maxDate={new Date(moment().add(30, 'days'))} />
                    </div>
                </div>
            </section>
        )
    }
}

export default Calendar;