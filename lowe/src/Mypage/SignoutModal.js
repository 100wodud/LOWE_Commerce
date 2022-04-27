import React from "react";
import "./SignoutModal.css";

class SignoutModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    handleClose = () => {
        this.props.closemodal();
    }

    onClickSignout = () => {
        window.localStorage.removeItem("id");
        window.location.replace('/');
    }

    render() {
        const { open } = this.props;
        return (
            <>
                {open ? (
                    <div className="Signout_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signout_modalInner">
                            <div className="Signout_modalContent" >
                                <div style={{backgroundColor: "#ffffff", height: "100px", borderRadius: "8px 8px 0px 0px", borderBottom: "1px solid #DDDDDD"}}>
                                    <div style={{color: "#333333", lineHeight: "100px"}}>로그아웃 하시겠습니까?</div>
                                </div>
                                <div style={{backgroundColor: "#ffffff", height: "52px", cursor: "pointer", borderRadius: "0px 0px 8px 8px"}} >
                                    <div onClick={this.handleClose} style={{lineHeight: "52px", width: "49.7%", float:"left", borderRight: "1px solid #DDDDDD"}}>취소</div>
                                    <div onClick={this.onClickSignout} style={{lineHeight: "52px", width: "49.7%", float:"left"}}><strong>확인</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default SignoutModal;