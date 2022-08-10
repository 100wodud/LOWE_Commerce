import axios from 'axios';
import { Component } from "react";
import SignHeader from './SignHeader';
import "./Withdrawal.css";
import ModalPhone from "./ModalPhone";

class Withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: "",
            phonemodal: false,
            modalcomment: '',
        };
    }

    openmodalPhone =(e)  => {
        this.setState({ phonemodal: true, modalcomment: e });
    };
    closemodalPhone = () => {
        this.setState({ phonemodal: false, modalcomment: "" });
    };

    componentDidMount = () => {
        let user = window.localStorage.getItem("id");
        if(!user){
            window.location.replace("/signin")
        }
    }

    userWithdrawal = () => {
        let user = window.localStorage.getItem("id");
        if (this.state.reason.length > 1 && user) {
            axios.post("https://server.lowehair.kr/withdrawalUser", { id: user, withdrawalReason: this.state.reason })
                .then((res) => {
                    setTimeout(() => {
                        window.localStorage.removeItem("id");
                        this.openmodalPhone(`회원탈퇴가 완료되었습니다\n그동안 이용해주셔서 감사합니다`)
                    })
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            setTimeout(() => {
                this.openmodalPhone(`회원탈퇴 이유를 선택해주세요`)
            })
        }

    }

    clickCheck = (value) => () => {
        this.setState({ reason: value })
    }



    handleInputValue = (key) => (e) => {
        let target = e.target.value
        if (target === "") {
            target = " "
        }
        this.setState({ [key]: target });
    };

    render() {
        return (
            <>
                <SignHeader header="회원탈퇴" />
                <section className="Withdrawal_section">
                    <div className='Withdrawal_choose'>
                        탈퇴하시려는 이유를 선택해주세요
                    </div>
                    <div>
                        <div>
                            <input className="Withdrawal_reason" name="withdrawal" id="withdrawal1" type="checkbox" checked={this.state.reason === "원하는 상품이 없어서" ? true : false} onClick={this.clickCheck("원하는 상품이 없어서")} readOnly />
                            <label className="Withdrawal_text" htmlFor="withdrawal1">원하는 상품이 없어서</label>
                        </div>
                        <div >
                            <input className="Withdrawal_reason" name="withdrawal" id="withdrawal2" type="checkbox" checked={this.state.reason === "잦은 오류, 장애가 발생해서" ? true : false} onClick={this.clickCheck("잦은 오류, 장애가 발생해서")} readOnly />
                            <label className="Withdrawal_text" htmlFor="withdrawal2">잦은 오류, 장애가 발생해서</label>
                        </div>
                        <div >
                            <input className="Withdrawal_reason" name="withdrawal" id="withdrawal3" type="checkbox" checked={this.state.reason === "쿠폰 등 혜택이 적어서" ? true : false} onClick={this.clickCheck("쿠폰 등 혜택이 적어서")} readOnly />
                            <label htmlFor="withdrawal3" className="Withdrawal_text">쿠폰 등 혜택이 적어서</label>
                        </div>
                        <div>
                            <input className="Withdrawal_reason" name="withdrawal" id="withdrawal3" type="checkbox" checked={this.state.reason === "쿠폰 등 혜택이 적어서" || this.state.reason === "잦은 오류, 장애가 발생해서" || this.state.reason === "원하는 상품이 없어서" || this.state.reason === "" ? false : true} onClick={this.clickCheck("0")} readOnly />
                            <label htmlFor="withdrawal4" className="Withdrawal_text">직접입력</label>
                            <div style={{maxWidth: "400px"}}>
                                <textarea className="Withdrawal_reason" name="withdrawal" id="withdrawal4" onChange={this.handleInputValue("reason")} onClick={this.handleInputValue("reason")} />
                            </div>
                        </div>
                    </div>
                    <div className='Withdrawal_button' onClick={this.userWithdrawal}>
                        탈퇴하고 계정을 완전히 삭제할게요
                    </div>
                </section>
                <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
            </>
        )
    }
}

export default Withdrawal;