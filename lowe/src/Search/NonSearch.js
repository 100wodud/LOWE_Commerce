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
                    <span style={{paddingBottom: "80px"}}>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>1</span>
                            <span onClick={this.props.handleInputRecommand("히피펌")} className="nonSearch_content_text">히피펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>2</span>
                            <span onClick={this.props.handleInputRecommand("허쉬")} className="nonSearch_content_text">허쉬</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px", color: "#FF3D12"}}>3</span>
                            <span onClick={this.props.handleInputRecommand("고데기펌")} className="nonSearch_content_text">고데기펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>4</span>
                            <span onClick={this.props.handleInputRecommand("컷트")} className="nonSearch_content_text">컷트</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>5</span>
                            <span onClick={this.props.handleInputRecommand("젤리펌")} className="nonSearch_content_text">젤리펌</span>
                        </div>
                    </span>
                    <span>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>6</span>
                            <span onClick={this.props.handleInputRecommand("남성")} className="nonSearch_content_text">남성</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>7</span>
                            <span onClick={this.props.handleInputRecommand("발레아쥬")} className="nonSearch_content_text">발레아쥬</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>8</span>
                            <span onClick={this.props.handleInputRecommand("단발")} className="nonSearch_content_text">단발</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>9</span>
                            <span onClick={this.props.handleInputRecommand("슬릭펌")} className="nonSearch_content_text">슬릭펌</span>
                        </div>
                        <div>
                            <span className="nonSearch_content_num" style={{width: "32px"}}>10</span>
                            <span onClick={this.props.handleInputRecommand("탈색")} className="nonSearch_content_text">탈색</span>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default NonSearch;
