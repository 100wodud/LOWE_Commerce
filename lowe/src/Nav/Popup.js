import React from "react";
import "./Popup.css";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }
    handleClose = () => {
        this.props.close();
    }

    render() {
        return (
            <div className="popup_modalBody" >
                <div className="popup_modalclick" onClick={this.handleClose}></div>
                <div className="popup_modalInner" >
                    <div className="popup_modalclick" onClick={this.handleClose}></div>
                    <div className="popup_content">
                        <a href="/mypage">
                            <img src={process.env.PUBLIC_URL + "/image/nav/Popup_img1.png"} alt="로위 로고" />
                        </a>
                    </div>
                    <div className="popup_close">
                        <div onClick={this.props.dayclose} style={{color: "#9C9C9C", }}><span>오늘 하루 보지 않기</span></div>
                        <div onClick={this.props.close}><strong>닫기</strong></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;

