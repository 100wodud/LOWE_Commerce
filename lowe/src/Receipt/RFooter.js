import { Component } from "react";
import "./RFooter.css"

class RFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

        
    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <>
                <section className="Receipt_footer_section">
                    <a href={`/mypage${funnel}`} className="Receipt_footer_price">결제 확인 완료</a>
                </section>
            </>
        );
    }
}

export default RFooter;