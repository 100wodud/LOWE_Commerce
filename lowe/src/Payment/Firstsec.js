import { Component } from "react";
import "./Firstsec.css";

class Firstsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_first_section">
                {
                    this.props.data ? 
                    <div>
                        <div className="Payment_first_title">시술정보</div>
                        <div className="Payment_first_content">
                            <div><img src={this.props.data.board.thumbnail} alt="결제 상품 정보"/></div>
                            <div>
                                <div className="Payment_first_content_name">{this.props.data.board.name}</div>
                                <div className="Payment_first_content_price"><span>{this.props.data.board.price.comma()}원</span><span style={{color: "#FF3D12"}}>{this.props.data.board.eventPrice? this.props.data.board.eventPrice+"%" : null}</span></div>
                            </div>
                        </div>
                    </div> :
                    <div>시술 정보가 없습니다</div>
                }
            </section>
        )
    }
}

export default Firstsec;