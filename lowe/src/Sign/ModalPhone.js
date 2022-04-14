import React from "react";
import "./ModalPhone.css";

class ModalPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    handleClose = () => {
        if (this.props.comment.slice(0, 7) === "회원가입 완료" || this.props.comment.slice(0, 7) === "회원탈퇴가 완") {
            window.localStorage.removeItem("id");
            window.location.replace('/')
        } else if (this.props.comment.slice(0, 5) === "회원정보가") {
            window.location.replace('/mypage')
        } else if (this.props.comment.slice(0, 5) === "비밀번호가") {
            window.location.replace('/signin')
        } else {
            this.props.closemodal();
        }
    }

    render() {
        const { open } = this.props;
        return (
            <>
                {open ? (
                    <div className="Phonecheck_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Phonecheck_modalInner">
                        <div className="modalclick" onClick={this.handleClose}></div>
                            <div className="Phonecheck_modalContent" >
                                {this.props.comment.indexOf(`\n`) !== -1 || this.props.comment === "인증번호"?
                                    <div style={{ backgroundColor: "#ffffff", height: "70px", borderRadius: "8px 8px 0px 0px", paddingTop: "30px", borderBottom: "1px solid #DDDDDD" }}>
                                        {this.props.comment === "인증번호" ?
                                            <pre style={{ color: "#333333", }}>인증번호가 발송되었습니다<br /><strong>카카오톡을 확인해주세요</strong></pre>
                                            :
                                            <pre style={{ color: "#333333", }}>{this.props.comment}</pre>
                                        }
                                    </div> :
                                    <div style={{ backgroundColor: "#ffffff", height: "100px", borderRadius: "8px 8px 0px 0px", lineHeight: "100px", borderBottom: "1px solid #DDDDDD" }}>
                                            <pre style={{ color: "#333333",  lineHeight: "100px"}}>{this.props.comment}</pre>
                                    </div>
                                }
                                <div style={{ backgroundColor: "#ffffff", height: "52px", cursor: "pointer", borderRadius: "0px 0px 8px 8px" }} onClick={this.handleClose}>
                                    <div style={{ lineHeight: "52px" }}><strong>확인</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default ModalPhone;