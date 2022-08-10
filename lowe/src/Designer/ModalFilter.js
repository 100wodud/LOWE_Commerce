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
        const category = ["전체", "컷", "펌", "염색", "클리닉"];
        const location = ["전체", "강남", "신촌", "합정", "홍대입구역", "L7홍대", "이수역"]
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
                            <div className="Designer_category_title">지점</div>
                            <div className="Designer_categorylist">
                                {location.map((e, i) => (
                                    <>
                                        {e === "전체" ?
                                            <span key={i} className={(this.props.filterList.indexOf("지역 전체") !== -1 || this.props.location ? "category_select" : "category_nonselect")} onClick={this.props.onclicklocation(e)}>{e}</span> :
                                            <span key={i} className={(this.props.filterList.indexOf(e) !== -1  ? "category_select" : "category_nonselect")} onClick={this.props.onclickFilterListloc(e)}>{e}</span>
                                        }
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="Designer_category" style={{ marginBottom: "12px" }}>
                            <div className="Designer_category_title">시술</div>
                            <div className="Designer_categorylist">
                                {category.map((e, i) => (
                                    <>
                                        {e === "전체" ?
                                            <span key={i} className={(this.props.filterList.indexOf("시술 전체") !== -1 || this.props.category ? "category_select" : "category_nonselect")} onClick={this.props.onclickcategory(e)}>{e}</span> :
                                            <span key={i} className={(this.props.filterList.indexOf(e) !== -1 ? "category_select" : "category_nonselect")} onClick={this.props.onclickFilterListcat(e)}>{e}</span>
                                        }
                                    </>
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

