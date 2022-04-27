import React from "react";
import "./ModalFilter.css"

class ModalFilter extends React.Component {
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
        const gender = ["전체", "남성", "여성"];
        const location = ["전체", "강남", "신촌", "합정", "홍대"]
        const length = ["전체", "숏", "미들", "롱"]
        return (
            <div className="Designer_modalBody" >
                <div className="Designer_modalclick" onClick={this.handleClose}></div>
                <div className="Designer_modalInner" >
                <div className="Designer_modalclick" onClick={this.handleClose}></div>
                    <div className="Designer_content">
                        <div className="Designer_reset" onClick={this.props.onclickReset}>
                            <span style={{ font: "500 14px 'Noto Sans'" }}>초기화</span>
                            <span><img src={process.env.PUBLIC_URL + "/image/nav/reset.svg"} alt="리셋버튼" /></span>
                        </div>
                        <div className="Designer_category">
                            <div className="Designer_category_title">지역</div>
                            <div className="Designer_categorylist">
                                {location.map((e, i) => (
                                    <span key={i} onClick={this.props.onclicklocation(e)} className={(this.props.location === e ? "category_select" : "category_nonselect")}>{e}</span>
                                ))}
                            </div>
                        </div>
                        <div className="Designer_category" style={{ marginBottom: "12px" }}>
                            <div className="Designer_category_title">성별</div>
                            <div className="Designer_categorylist">
                                {gender.map((e, i) => (
                                    <span key={i}  onClick={this.props.onclickgender(i)} className={(this.props.gender === i ? "category_select" : "category_nonselect")} >{e}</span>
                                ))}
                            </div>
                        </div>
                        <div className="Designer_category" style={{ marginBottom: "12px" }}>
                            <div className="Designer_category_title">길이</div>
                            <div className="Designer_categorylist">
                                {length.map((e, i) => (
                                    <span key={i} onClick={this.props.onclicklength(i)} className={(this.props.length === i ? "category_select" : "category_nonselect")} >{e}</span>
                                ))}
                            </div>
                        </div>
                        <div onClick={this.props.onclicksearching} className="Designer_close">선택완료</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalFilter;

