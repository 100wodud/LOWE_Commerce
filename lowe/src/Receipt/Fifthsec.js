import { Component } from "react";
import "./Fifthsec.css";

class Fifthsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <section className="Receipt_fifth_section">
                {this.props.request ?
                    <>
                        <div>
                            <div className="Receipt_fifth_title">요청사항</div>
                            {this.props.request.text ?
                                <div className="Receipt_fifth_text"><pre >{this.props.request.text}</pre></div> :
                                <div className="Receipt_fifth_text">요청사항이 없습니다</div>
                            }
                        </div>
                        <div className="receiptimg_scroll">
                            {
                                this.props.request.img.length ?
                                    this.props.request.img.map((e, i) => (
                                        <div key={i}>
                                            <img className="receipt_fifth_img" src={e.url} alt={e}></img>
                                        </div>
                                    )) : null
                            }
                        </div>
                    </> :
                    null
                }
            </section>
        )
    }
}

export default Fifthsec;