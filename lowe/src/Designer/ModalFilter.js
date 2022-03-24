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
        const category = ["전체", "컷", "펌", "염색", "붙임머리", "클리닉"];
        const location = ["전체", "강남", "신촌", "합정", "홍대"]
        return (
            <div className="Designer_modalBody" >
                <div className="Designer_modalclick" onClick={this.handleClose}></div>
                <div className="Designer_modalInner" >
                    <div className="Designer_content">
                        <div className="Designer_reset" onClick={this.props.onclickReset}>
                            <span style={{ font: "500 14px 'Noto Sans'" }}>초기화</span>
                            <span><img src={process.env.PUBLIC_URL + "/image/nav/reset.svg"} alt="리셋버튼" /></span>
                        </div>
                        <div className="Designer_category">
                            <div className="Designer_category_title">지역</div>
                            <div className="Designer_categorylist">
                                {location.map((e, i) => (
                                    <span key={i} className={(this.props.location === e ? "category_select" : "category_nonselect")} onClick={this.props.onclicklocation(e)}>{e}</span>
                                ))}
                            </div>
                        </div>
                        <div className="Designer_category" style={{ marginBottom: "12px" }}>
                            <div className="Designer_category_title">시술</div>
                            <div className="Designer_categorylist">
                                {category.map((e, i) => (
                                    <span key={i} className={(this.props.category === e ? "category_select" : "category_nonselect")} onClick={this.props.onclickcategory(e)}>{e}</span>
                                ))}
                            </div>
                        </div>
                        <div onClick={this.props.onclickFilter} className="Designer_close">선택완료</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalFilter;

