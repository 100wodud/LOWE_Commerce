import { Component } from "react";
import "./ProFooter.css"


class ProFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    clickBanner = () => {
        navigator.clipboard.writeText("https://lowehair.kr/promotion/spring2204")
        .then(() => {
            alert("링크복사 완료 주변에 알려주세요!");
        })
    }

    render() {
        return (
            <div className="ProFooter_footer">
                <div onClick={this.clickBanner}>
                    <div style={{lineHeight: "64px"}}  >
                    친구에게 <strong>공유하기</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProFooter;





