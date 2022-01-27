import React from "react";
import "./FilterModal.css";

class FilterModal extends React.Component {
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
            <div className="filter_modalBody" >
                <div className="filter_modalclick" onClick={this.handleClose}></div>
                <div className="filter_modalInner" >
                    <div className="filter_content">
                        <div style={{height: "40px"}}></div>
                        <div className={`filter_content_div ${this.props.status === "리뷰 많은 순" ? "bold": null}`} onClick={this.props.onclickdataFilter("리뷰 많은 순")}>리뷰 많은 순</div>
                        <div className={`filter_content_div ${this.props.status === "인기순" ? "bold": null}`} onClick={this.props.onclickdataFilter("인기순")}>인기순</div>
                        <div className={`filter_content_div ${this.props.status === "최신순" ? "bold": null}`} onClick={this.props.onclickdataFilter("최신순")}>최신순</div>
                    </div>
                    <div onClick={this.props.close} className="filter_close">취소</div>
                </div>
            </div>
        );
    }
}

export default FilterModal;

