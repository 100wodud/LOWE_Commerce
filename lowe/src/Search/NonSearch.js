import { Component } from "react";

class NonSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="nonSearch_title">가장 많이 검색하고 있어요</div>
                <div className="nonSearch_content">
                    <span>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>1</span>
                            <span onClick={this.props.handleInputRecommand("히피펌")} className="nonSearch_content_text">히피펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>2</span>
                            <span onClick={this.props.handleInputRecommand("펌")} className="nonSearch_content_text">펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>3</span>
                            <span onClick={this.props.handleInputRecommand("발레아쥬")} className="nonSearch_content_text">발레아쥬</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>4</span>
                            <span onClick={this.props.handleInputRecommand("긴머리펌")} className="nonSearch_content_text">긴머리펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>5</span>
                            <span onClick={this.props.handleInputRecommand("탈색")} className="nonSearch_content_text">탈색</span>
                        </div>
                    </span>
                    <span>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>6</span>
                            <span onClick={this.props.handleInputRecommand("염색")} className="nonSearch_content_text">염색</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>7</span>
                            <span onClick={this.props.handleInputRecommand("남자머리")} className="nonSearch_content_text">남자머리</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>8</span>
                            <span onClick={this.props.handleInputRecommand("남자펌")} className="nonSearch_content_text">남자펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>9</span>
                            <span onClick={this.props.handleInputRecommand("숏컷")} className="nonSearch_content_text">숏컷</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>10</span>
                            <span onClick={this.props.handleInputRecommand("젤리펌")} className="nonSearch_content_text">젤리펌</span>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default NonSearch;
