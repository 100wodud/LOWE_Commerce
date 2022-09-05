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
                                        <div className="Signup_sub">{agree[0].sub1}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content1}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px"}}>{agree[0].sub2}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content2}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px"}}>{agree[0].sub3}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content3}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px"}}>{agree[0].sub4}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content4}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px"}}>{agree[0].sub5}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content5}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px"}}>{agree[0].sub6}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content6}</div>
                                        <div className="Signup_sub"  style={{marginTop: "16px", marginBottom: "0", fontSize: "12px"}}>{agree[0].sub7}</div>
                                        <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[0].content7}</div>
                                    </div> :
                                open === 2 ?
                                    <div>
                                        <div className="Signup_title">{agree[2].title}</div>
                                        <div className="Signup_sub">{agree[2].sub}</div>
                                        <div className="Signup_content" >{agree[2].content}</div>
                                    </div>:
                                open === 3 ?
                                <div>
                                    <div className="Signup_title">{agree[3].title}</div>
                                    <div className="Signup_content" >{agree[3].content1}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub2}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content2}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/01.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content3}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/02.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content4}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/03.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content5}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub3}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content6}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/04.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content7}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub4}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content8}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/05.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub5}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content9}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/06.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content10}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub6}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content11}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub7}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content12}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub8}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content13}</div>
                                    <div className="Signup_sub" style={{marginTop: "16px"}}>{agree[3].sub9}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content14}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/07.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_sub">{agree[3].sub10}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content15}</div>
                                    <div style={{textAlign: "center", margin: "16px 0"}}>
                                    <img src={process.env.PUBLIC_URL + "/image/agree/08.svg"} alt="정책 이미지"  />
                                    </div>
                                    <div className="Signup_sub">{agree[3].sub11}</div>
                                    <div className="Signup_content" style={{lineHeight: "18px"}}>{agree[3].content16}</div>
                                </div>:
                                open === 4 ?
                                <div>
                                <div className="Signup_title">{agree[4].title}</div>
                                <div className="Signup_sub">{agree[4].sub}</div>
                                <div className="Signup_content" >{agree[4].content1}</div>
                                <div className="Signup_content" style={{marginTop: "16px"}}>{agree[4].content2}</div>
                                <div className="Signup_content" style={{marginTop: "16px"}}>{agree[4].content3}</div>
                                </div>:null

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