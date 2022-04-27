import React from "react";
import "./ReviewModal.css";

class ReviewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    handleClose = () => {
        if (this.props.comment.slice(0, 5) === "리뷰 수정") {
            window.location.replace('/mypage')
        } else {
            this.props.closemodal();
        }
    }


    render() {
        const { open } = this.props;
        return (
            <>
                {open ? (
                    <div className="Review_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Review_modalInner">
                            <div className="Review_modalContent" >
                                {this.props.comment === "성공" ?
                                    <>
                                        <div style={{ backgroundColor: "#ffffff", height: "108px", paddingTop: "40px", borderRadius: "8px 8px 0px 0px", borderBottom: "1px solid #DDDDDD" }}>
                                            <div style={{ color: "#333333", font: '700 16px "Noto Snas"', marginBottom: "10px" }}>리뷰 작성 완료!</div>
                                            <div style={{ color: "#333333" }}>작성한 리뷰는 마이페이지에서<br />확인 할 수 있어요 : )</div>
                                        </div>
                                        <div style={{ backgroundColor: "#ffffff", height: "52px", cursor: "pointer", borderRadius: "0px 0px 8px 8px" }} >
                                            <a href="/" style={{ lineHeight: "52px", width: "49.7%", float: "left", borderRight: "1px solid #DDDDDD" }}>닫기</a>
                                            <a href="/mypage" style={{ lineHeight: "52px", width: "49.7%", float: "left", color: "#FF3D12", fontWeight: "700" }}><strong>작성 리뷰 확인하기</strong></a>
                                        </div>
                                    </> :
                                    <>
                                        {this.props.comment.slice(0, 5) === "리뷰 수정" ?
                                            <div style={{ backgroundColor: "#ffffff", height: "108px", paddingTop: "40px", borderRadius: "8px 8px 0px 0px", borderBottom: "1px solid #DDDDDD" }}>
                                                <div style={{ color: "#333333", font: '700 16px "Noto Snas"', marginBottom: "10px" }}>리뷰 수정 완료!</div>
                                                <div style={{ color: "#333333" }}>수정한 리뷰는 마이페이지에서<br />확인 할 수 있어요 : )</div>
                                            </div> :
                                            <div style={{ backgroundColor: "#ffffff", height: "100px", borderRadius: "8px 8px 0px 0px", lineHeight: "100px", borderBottom: "1px solid #DDDDDD" }}>
                                                <pre style={{ color: "#333333", lineHeight: "100px" }}>{this.props.comment}</pre>
                                            </div>
                                        }
                                        <div style={{ backgroundColor: "#ffffff", height: "52px", cursor: "pointer", borderRadius: "0px 0px 8px 8px" }} onClick={this.handleClose}>
                                            <div style={{ lineHeight: "52px" }}><strong>확인</strong></div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default ReviewModal;