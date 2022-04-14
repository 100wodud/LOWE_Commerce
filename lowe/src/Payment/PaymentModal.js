import React from "react";
import "./PaymentModal.css";
import agree from "../data/Agree";

class PaymentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    handleClose = () => {
        this.props.close();
    }

    render() {
        const { open } = this.props;
        return (
            <>
                {open ? (
                    <div className="Signup_modalBody">
                        <div className="modalclick" onClick={this.handleClose}></div>
                        <div className="Signup_modalInner">
                            <div>
                                <div style={{ textAlign: "right" }}>
                                    <img className="Signup_modalClose" onClick={this.handleClose} src={`${process.env.PUBLIC_URL}/image/nav/exit_button.svg`} alt="로위 상세보기 닫기" />
                                </div>
                                {
                                    open === 1 ?
                                        <div>
                                            <div className="Signup_title">{agree[0].title}</div>
                                            <div className="Signup_sub">{agree[0].sub}</div>
                                            {
                                                agree[0].content.map((e, i) => (
                                                    <div className="Signup_content" style={{lineHeight: "18px"}} key={i}>{e}</div>
                                                ))
                                            }
                                        </div> :
                                        <div>
                                            <div className="Signup_title">{agree[1].title}</div>
                                            <div className="Signup_sub">{agree[1].sub1}</div>
                                            {
                                                agree[1].content1.map((e, i) => (
                                                    <div className="Signup_content" key={i}>{e}</div>
                                                ))
                                            }
                                            <div className="Signup_sub" style={{marginTop: "40px"}}>{agree[1].sub2}</div>
                                            {
                                                agree[1].content2.map((e, i) => (
                                                    <div className="Signup_content" key={i}>{e}</div>
                                                ))
                                            }
                                            <div className="Signup_sub" style={{marginTop: "40px"}}>{agree[1].sub3}</div>
                                            {
                                                agree[1].content3.map((e, i) => (
                                                    <div className="Signup_content" key={i}>{e}</div>
                                                ))
                                            }
                                            <div className="Signup_sub" style={{marginTop: "40px"}}>{agree[1].sub4}</div>
                                            {
                                                agree[1].content4.map((e, i) => (
                                                    <div className="Signup_content" key={i}>{e}</div>
                                                ))
                                            }
                                        </div>

                                }
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default PaymentModal;