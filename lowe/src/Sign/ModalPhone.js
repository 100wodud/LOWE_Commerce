import React from "react";
import "./ModalPhone.css";
import axios from 'axios';

class ModalPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    handleClose = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        if (this.props.comment.slice(0, 7) === "회원가입 완료") {
            window.localStorage.removeItem("id");
            window.history.go(-2)
        } else if (this.props.comment.slice(0, 7) === "회원탈퇴가 완") {
            window.localStorage.removeItem("id");
            window.location.href = `/${funnel}`
        }
        else if (this.props.comment === "네이버 소셜가입 완료") {
            window.localStorage.setItem("id", window.location.pathname.split("/")[2]);
            window.location.href = `/${funnel}`
        } else if (this.props.comment.slice(0, 5) === "회원정보가") {
            window.location.href = `/mypage${funnel}`
        } else if (this.props.comment.slice(0, 5) === "비밀번호가") {
            window.location.href = `/signin${funnel}`
        } else if (this.props.comment.indexOf("네이버가입된번호") !== -1) {
            axios.post("https://server.lowehair.kr/withdrawalUser", {
                id: window.location.pathname.split("/")[2],
                withdrawalReason: ""
            }).then((res) => {
                setTimeout(() => {
                    window.location.href = `/${funnel}`
                })
            })

        } else {
            this.props.closemodal();
        }
    }

    gotoLogin = () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        window.location.href = `/signin${funnel}`
    }

    render() {
        const { open } = this.props;
        return (
            <>
                {open ? (
                    <div className="Phonecheck_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Phonecheck_modalInner">
                            <div className="modalclick" style={{ zIndex: "-1" }} onClick={this.handleClose}></div>
                            <div style={{ zIndex: "10" }} className="Phonecheck_modalContent" >
                                {this.props.comment.indexOf(`\n`) !== -1 || this.props.comment === "인증번호" ?
                                    <div style={{ backgroundColor: "#ffffff", height: "70px", borderRadius: "8px 8px 0px 0px", paddingTop: "30px", borderBottom: "1px solid #DDDDDD" }}>
                                        {this.props.comment === "인증번호" ?
                                            <pre style={{ color: "#333333", lineHeight: "24px" }}>인증번호가 발송되었습니다<br /><strong>카카오톡을 확인해주세요</strong></pre>
                                            :
                                            <pre style={{ color: "#333333", }}>{this.props.comment}</pre>
                                        }
                                    </div> :
                                    this.props.comment === "네이버 소셜가입 완료" ?
                                        <div style={{ backgroundColor: "#ffffff", height: "104px", paddingTop: "44px", borderRadius: "8px 8px 0px 0px", lineHeight: "148px", borderBottom: "1px solid #DDDDDD" }}>
                                            <pre style={{ color: "#333333" }}>
                                                <div style={{ fontSize: "16px", marginBottom: "10px" }}><strong>회원가입 완료</strong></div>
                                                <div style={{ color: "#FF3D12", lineHeight: "21px" }}>💌 할인쿠폰 발급 완료</div>
                                                <div style={{ color: "#9C9C9C", lineHeight: "21px" }}>지금 바로 예약해 보세요</div>
                                            </pre>
                                        </div> :

                                        this.props.comment.indexOf("네이버가입된번호") !== -1 ?
                                            <div style={{ backgroundColor: "#ffffff", height: "144px", paddingTop: "44px", borderRadius: "8px 8px 0px 0px", lineHeight: "148px", borderBottom: "1px solid #DDDDDD" }}>
                                                <pre style={{ color: "#333333" }}>
                                                    <div style={{ fontSize: "16px", marginBottom: "10px" }}><strong>이미 가입된 번호입니다</strong></div>
                                                    <div style={{ color: "#9C9C9C", marginBottom: "24px", fontWeight: "500" }}>아래 가입정보를 확인해주세요</div>
                                                    <div style={{ marginLeft: "52px" }}>
                                                        <div style={{ display: "flex" }}><div style={{ width: "85px", textAlign: "left", marginBottom: "12px", color: "#9C9C9C", fontWeight: "700" }}>휴대폰번호</div><div>{`010 - **** - ${this.props.comment.split(" ")[1].slice(this.props.comment.split(" ")[1].length - 4, this.props.comment.split(" ")[1].length)}`}</div></div>
                                                        <div style={{ display: "flex" }}><div style={{ width: "85px", textAlign: "left", color: "#9C9C9C", fontWeight: "700" }}>가입 방법</div><div>로위몰</div></div>
                                                    </div>
                                                </pre>
                                            </div> :
                                            <div style={{ backgroundColor: "#ffffff", height: "100px", borderRadius: "8px 8px 0px 0px", lineHeight: "100px", borderBottom: "1px solid #DDDDDD" }}>
                                                <pre style={{ color: "#333333", lineHeight: "100px" }}>{this.props.comment}</pre>
                                            </div>
                                }
                                <div style={{ backgroundColor: "#ffffff", height: "52px", cursor: "pointer", borderRadius: "0px 0px 8px 8px" }} onClick={this.handleClose}>
                                    {
                                        this.props.comment === "네이버 소셜가입 완료" ?
                                            <div style={{ lineHeight: "52px" }}><strong>스타일 보러가기</strong></div> :
                                            this.props.comment.indexOf("네이버가입된번호") !== -1 ?
                                                <div style={{ lineHeight: "52px", color: "#FF3D12" }}><strong>로그인</strong></div> :
                                                this.props.comment.indexOf("로그인이 필요한") !== -1 ?
                                                    <>
                                                        <div onClick={this.handleClose} style={{ lineHeight: "52px", width: "49.7%", float: "left", borderRight: "1px solid #DDDDDD" }}>취소</div>
                                                        <div onClick={this.gotoLogin} style={{ lineHeight: "52px", width: "49.7%", float: "left", color: "#FF3D12" }}><strong>로그인</strong></div>
                                                    </> :
                                                    <div style={{ lineHeight: "52px" }}><strong>확인</strong></div>
                                    }
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