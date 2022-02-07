import { Component } from 'react';
import "./Coupon.css"


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
                {this.state.can.map((e) => (
                    <div key={e.id} className="coupon_div">
                        <div className="coupon_first_div">
                            <div style={{fontWeight: "700", fontSize: "21px", marginBottom: "6px"}}>{e.price.comma()}원</div>
                            <div style={{fontWeight: "700", fontSize: "14px", marginBottom: "7px"}}>{e.content}</div>
                            <div style={{fontSize: "12px"}}>30,000원 이상 기술 결제시 사용가능</div>
                        </div>
                        <div className="coupon_second_div">
                            <div style={{fontSize: "12px", marginBottom: "6px"}}>{e.createdAt.slice(0, 10)}</div>
                            <div style={{fontSize: "12px"}}>일부상품제외</div>
                        </div>
                    </div>
                ))
                }
                {this.state.used.map((e) => (
                    <div key={e.id} className="coupon_div used">
                        <div className="coupon-dim" style={{lineHeight: "188px", zIndex:5}}>사용완료</div>
                        <div className="coupon_first_div">
                            <div style={{fontWeight: "700", fontSize: "21px", marginBottom: "6px"}}>{e.price.comma()}원</div>
                            <div style={{fontWeight: "700", fontSize: "14px", marginBottom: "7px"}}>{e.content}</div>
                            <div style={{fontSize: "12px"}}>30,000원 이상 기술 결제시 사용가능</div>
                        </div>
                        <div className="coupon_second_div">
                            <div style={{fontSize: "12px", marginBottom: "6px"}}>{e.createdAt.slice(0, 10)}</div>
                            <div style={{fontSize: "12px"}}>일부상품제외</div>
                        </div>
                    </div>
                ))
                }
            </>
        );
    }
}
export default Coupon;