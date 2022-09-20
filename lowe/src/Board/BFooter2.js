import { Component } from 'react';
import "./BFooter.css";
import TagManager from "react-gtm-module";


class BFooter2 extends Component {
    constructor() {
        super();
        this.state = {
            footer: false,
            scroll: 0
        }
    }

    componentDidMount = () => {
        var self = this
        document.addEventListener('scroll', function () {
            var cur = self.state.scroll;
            var currentScrollValue = document.documentElement.scrollTop;
            if (cur > 60) {
                self.setState({ scroll: currentScrollValue, footer: false })
            }
            if (cur <= 60) {
                self.setState({ scroll: currentScrollValue, footer: true })
            }

            let footer = document.getElementById("footers");
            if (self.state.footer) {
                footer.classList.remove("down");
            } else {
                footer.classList.add("down");
            }
        });
    }
    onClickFooter = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: 'click_item_coupon_btn',
            },
        };
        TagManager.dataLayer(tagManagerArgs);
        
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        let userid = Number(window.localStorage.getItem("id"));
        if(userid){
            window.location.href = `/mycoupons${funnel}`
        } else {
            window.location.href = `/signin${funnel}`
        }
    }

    render() {
        return (
            <footer className='BFooter2' id="footers" onClick={this.onClickFooter}>
               회원가입하고 <strong>20,000원 쿠폰받기</strong><img src={process.env.PUBLIC_URL + "/image/nav/footer_redarrow.svg"} alt="쿠폰 받기" />
            </footer >
        );
    }
}
export default BFooter2;