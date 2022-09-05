import React from "react";
import "./PointModal.css"

class PointModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }
    handleClose = () => {
        this.props.close();
    }

    render() {
        return (
            <div className="Designer_modalBody" >
                <div className="Designer_modalclick"></div>
                <div className="Designer_modalInner" >
                    <div className="Designer_modalclick" onClick={this.handleClose}></div>
                    <div className="Designer_content">
                        <div className="PointModal_content">
                            <div className="PointModal_content_exit" style={{paddingRight: "12px"}}>
                                <img onClick={this.handleClose} src={process.env.PUBLIC_URL + "/image/nav/pointmodal_exit.svg"} alt="로위 쿠폰" />
                            </div>
                            <div style={{ marginBottom: "20px" }}><strong>로위몰 포인트 안내사항</strong></div>
                            <div style={{ lineHeight: "150%" }}>
                                1. 적립
                                <li>로위몰 포인트는 시술 완료 후 결제 금액의 5%가 적립됩니다.</li>
                                <li>리뷰를 작성하여 포인트를 받을 수 있습니다.<br />
                                    (20자 이상 텍스트 리뷰+500p, 20자 이상 텍스트 리뷰 & 포토 리뷰 +1,000p)</li>
                                <li>리뷰 작성 후 적립까지는 최대 3일이 소요 됩니다.</li>
                                <li>포인트는 시술 완료 다음날 오전 11시에 적립됩니다. </li>
                                <br />
                                2. 사용/환불/유효기간
                                <li>포인트는 100P 단위 이상으로 사용이 가능합니다.</li>
                                <li>이벤트 포인트의 경우 명시한 유효기간을 따릅니다.</li>
                                <li>포인트는 유효기간 임박 순으로 사용됩니다.<br />
                                    : 탈퇴계정의 포인트는 자동으로 소멸됩니다.</li>
                                <li>당일 취소, 노쇼 등으로 인한 환불 수수료는 쿠폰을 제외한 금액 (실 결제금액 + 적립금)의 10%가 부과되며, 적립금은 100% 환급됩니다.</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PointModal;

