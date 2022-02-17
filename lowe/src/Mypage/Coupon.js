import { Component } from 'react';
import "./Coupon.css";
import Moment from 'react-moment';
import moment from 'moment';


class Coupon extends Component {
    constructor() {
        super();
        this.state = {
            used: [],
            can: []
        }
    }

    componentDidMount = () => {
        let used = [];
        let can = []
        if (this.props.data) {
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].used === 1) {
                    can.push(this.props.data[i])
                } else {
                    used.push(this.props.data[i])
                }
            }
            this.setState({ used: used, can: can });
        }
    }

    render() {
        return (
            <>
                <div style={{padding: "12px 0 40px 0"}}>
                    <div style={{marginBottom: "12px", font: "700 16px Montserrat"}}>유의사항</div>
                    <ul className='coupon_ul'>
                        <li><strong>발급일로부터 한 달 내 사용</strong> 가능합니다.</li>
                        <li>사용 시, <strong>직원에게 위 쿠폰을 보여주세요.</strong></li>
                        <li>다른 쿠폰과 <strong>중복사용 불가</strong>합니다.</li>
                    </ul>
                </div>
                {this.state.can.map((e) => {
                    let expired = moment(e.createdAt).add(1, "months")
                    return(
                    <div key={e.id} className="coupon_div">
                        <div className="coupon_first_div">
                            <div style={{fontWeight: "700", fontSize: "21px", marginBottom: "6px"}}>{e.price.comma()}원</div>
                            <div style={{fontWeight: "700", fontSize: "14px", marginBottom: "7px"}}>{e.content}</div>
                            <div style={{fontSize: "12px"}}>30,000원 이상 시술 결제시 사용가능</div>
                        </div>
                        <div className="coupon_second_div">
                            <div style={{fontSize: "12px", marginBottom: "6px"}}>{e.createdAt.slice(0, 10).replaceAll("-",". ")} - <Moment date={expired} format='YYYY. MM. DD'></Moment></div>
                            <div style={{fontSize: "12px"}}>일부상품제외</div>
                        </div>
                    </div>
                )})
                }
                {this.state.used.map((e) => {
                    let expired = moment(e.createdAt).add(1, "months")
                    return(
                    <div key={e.id} className="coupon_div used">
                        <div className="coupon-dim" style={{lineHeight: "188px", zIndex:5}}>사용완료</div>
                        <div className="coupon_first_div">
                            <div style={{fontWeight: "700", fontSize: "21px", marginBottom: "6px"}}>{e.price.comma()}원</div>
                            <div style={{fontWeight: "700", fontSize: "14px", marginBottom: "7px"}}>{e.content}</div>
                            <div style={{fontSize: "12px"}}>30,000원 이상 시술 결제시 사용가능</div>
                        </div>
                        <div className="coupon_second_div">
                            <div style={{fontSize: "12px", marginBottom: "6px"}}>{e.createdAt.slice(0, 10).replaceAll("-",". ")} - <Moment date={expired} format='YYYY. MM. DD'></Moment></div>
                            <div style={{fontSize: "12px"}}>일부상품제외</div>
                        </div>
                    </div>
                )})
                }
            </>
        );
    }
}
export default Coupon;