import React from "react";
import SignupModal from "../Sign/SignupModal";
import "./Popup.css";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            main: false,
            event: true,
            modalOpen: '',
        };
    }

    componentDidMount = () => {
        let policy = window.localStorage.getItem("policy");
        if (window.location.pathname === '/' && !policy) {
            this.setState({ main: true })
        }
    }

    handleClose = () => {
        this.props.close();
    }

    handelPolicyClose = () => {
        this.setState({ main: false })
    }

    handelPolicyNeverClose = () => {
        this.setState({ main: false })
        localStorage.setItem("policy", true);
    }


    openmodal = (e) => () => {
        this.setState({ modalOpen: e });
    };
    closemodal = () => {
        this.setState({ modalOpen: '' });
    };


    render() {
        return (
            <div className="popup_modalBody" >
                <div className="popup_modalclick" onClick={this.handleClose}></div>
                {!this.state.main && this.state.event ?
                    <div className="popup_modalInner" >
                        <div className="popup_modalclick" onClick={this.handleClose}></div>
                        <div className="popup_content">
                            <a href="/mypage">
                                <img src={process.env.PUBLIC_URL + "/image/nav/Popup_img1.svg"} alt="로위 로고" />
                            </a>
                        </div>
                        <div className="popup_close">
                            <div onClick={this.props.dayclose} style={{ color: "#9C9C9C", }}><span>오늘 하루 보지 않기</span></div>
                            <div onClick={this.props.close}><strong>닫기</strong></div>
                        </div>
                    </div> :
                    <div style={{ zIndex: "10" }} className="policy_content" >
                        <img onClick={this.handelPolicyClose} src={process.env.PUBLIC_URL + "/image/nav/policy_close.svg"} alt="로위 로고" style={{ marginLeft: "260px" }} />
                        <div style={{ backgroundColor: "#ffffff", height: "419px", paddingTop: "44px", borderRadius: "8px", lineHeight: "148px", borderBottom: "1px solid #DDDDDD" }}>
                            <pre style={{ color: "#333333" }}>
                                <div style={{ fontSize: "16px", marginBottom: "20px" }}><strong>이용약관/개인정보 처리방침 변경 안내</strong></div>
                                <div style={{ marginBottom: "24px", fontWeight: "500", lineHeight: "150%" }}>
                                    안녕하세요, 로위몰입니다.<br />
                                    <span style={{ color: "#FF3D12" }}>로위몰 서비스 이용약관이 변경</span>되어<br />
                                    이에 사전 안내 드립니다.<br />
                                    <br />
                                    <strong>개정 약관 시행 일자</strong><br />
                                    <strong style={{ fontSize: "17px", marginRight: "5px" }}>·</strong> 공고일자: 2022년 08월 22일<br />
                                    <strong style={{ fontSize: "17px", marginRight: "5px" }}>·</strong> 시행일자: 2022년 08월 29일<br />
                                    <br />
                                    <span style={{ color: "#9C9C9C" }}>아래의 버튼을 통해 변경된 내용을<br />
                                        확인하실 수 있습니다.</span>
                                </div>
                                <div style={{ marginLeft: "59px", marginBottom: "20px" }}>
                                    <div style={{ display: "flex" }}>
                                        <div onClick={this.openmodal(1)} style={{ color: "#FF3D12",cursor: "pointer", width: "80px", textAlign: "left", marginBottom: "12px", textDecorationLine: "underline", fontWeight: "700" }}>이용약관</div>
                                        <div onClick={this.openmodal(3)} style={{ color: "#FF3D12",cursor: "pointer", marginBottom: "12px", textDecorationLine: "underline", fontWeight: "700" }}>개인정보 처리방침</div></div>
                                </div>
                                <div style={{ color: "#9C9C9C", fontWeight: "500", lineHeight: "150%", fontSize: "12px" }}>
                                    본 개정에 동의하지 않으시는 경우<br />
                                    거부의사 표시(회원탈퇴)를 하실 수 있으며, <br />
                                    거부의사를 표시하지 않으신 경우 개정에<br />
                                    동의하신 것으로 간주됩니다.
                                </div>
                            </pre>
                        </div>
                        <div style={{marginTop: "20px", fontSize: "14px", textAlign: "center",cursor: "pointer", color: "#ffffff", textDecorationLine: "underline"}} onClick={this.handelPolicyNeverClose}>다시보지 않기</div>
                    </div>
                }
                <SignupModal open={this.state.modalOpen} close={this.closemodal} />
            </div >
        );
    }
}

export default Popup;

