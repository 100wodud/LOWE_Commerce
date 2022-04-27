import { Component } from "react";
import "./Promotion2List.css";

class Promotion2List extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <div className="Promotion2List">
                <a href={"https://lowehair.kr/designer/"+this.props.data.manager + funnel}>
                    <img src={`${process.env.PUBLIC_URL}${this.props.data.thumnail}`} alt="로위 프로모션 상품" />
                </a>
                <a href={"https://lowehair.kr/board/" + this.props.data.number + funnel}>
                    <div className="Promotion2List_content">
                        <div>
                            <div>
                                <div className="Promotion2List_content_title">{this.props.data.title}</div>
                                <div className="Promotion2List_content_price">{this.props.data.price.comma()}원<span>{this.props.data.event_percent ? this.props.data.event_percent + "%" : null}</span></div>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/image/promotion/02/boards/go.png`} alt="프로모션 상품가기" />
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default Promotion2List;
