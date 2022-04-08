import { Component } from "react";
import "./Thirdsec.css";

class Thirdsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Payment_third_section">
                  <div>
                        <div className="Payment_third_title">요청사항</div>
                        <textarea
                            onChange={this.props.handleInputValue("content")}
                            placeholder={`최근 미용실에 언제, 무슨시술을 받으셨나요?\n시술전 디자이너에게 헤어 상태를 말씀해보세요!`}
                        >
                        </textarea>
                    </div>
                    <div className="paymentimg_scroll">
                        <div>
                            <label htmlFor="paymentimg"><div><div style={{ fontSize: "30px", fontWeight: "400", marginTop: "15px", height: "30px" }}>+</div>{this.props.state.imgs.length} / 5</div></label>
                            {this.props.state.imgs.length < 5 ?
                                <input
                                    type="file"
                                    accept="image/*"
                                    size="40"
                                    id="paymentimg"
                                    onChange={this.props.handleInputValue("img")}
                                /> : null
                            }
                        </div>
                        {
                            this.props.state.imgs.length ?
                                this.props.state.imgs.map((e, i) => (
                                    <div key={i}>
                                        <img className="review_write_addimg" src={e.url} alt={e}></img>
                                        <img className="review_write_delimg" onClick={this.props.onClickDelimg(i)} src={process.env.PUBLIC_URL + "/image/nav/reviewimg_del.svg"} alt="리뷰 이미지 삭제" />
                                    </div>
                                )) : null
                        }
                    </div>
            </section>
        )
    }
}

export default Thirdsec;