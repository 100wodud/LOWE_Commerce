import { Component } from "react";
import "./Caution.css"

class Caution extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.data)
        // const category = [{ id: 0, category: "전체" }, { id: 1, category: "컷" }, { id: 2, category: "펌" }, { id: 3, category: "염색" }, { id: 4, category: "붙임머리" }, { id: 5, category: "클리닉" }];
        return (
            <>
                <div className="notice-text" style={{ fontSize: "16px", fontFamily: "Montserrat" }}>미리 확인해주세요!</div>
                <ul className="notice-list">
                    <li><span className="num">1.</span>시간 예약 변경은 최소 <strong>하루 전</strong>에 연락주세요</li>
                    <li><span className="num">2.</span>시술에 따라 <strong>기장 추가 비용이 발생</strong>할 수 있습니다</li>
                    { this.props.data === 1 ?
                    <>
                        <li><span className="num">3.</span>디자인 커트의 경우 <strong>원장님과 충분한 상의 후에<br /> 두상에 맞게 디자인됩니다.</strong></li>
                        <li><span className="num">4.</span>중복 예약이 발생할 경우 시간 변경 요청을 드릴 수<br />있습니다</li>
                    </> :
                    this.props.data === 2 ?
                    <>
                        <li><span className="num">3.</span>탈색모의 경우 <strong>펌 시술이 불가능</strong> 할 수 있으니<br />원장님 혹은 <strong>문의 후 예약</strong>해주세요</li>
                        <li><span className="num">4.</span>펌 주기는 <strong>장발 기준 6개월, 단발 기준 3~4개월</strong>을<br />권장합니다</li>
                        <li><span className="num">5.</span>곱슬이 강할 경우 <strong>뿌리 매직을 통해 깔끔한 관리가<br />가능</strong>합니다</li>
                        <li><span className="num">6.</span>모든 시술은 <strong>1:1로 진행</strong>되며, 동시 시술이 어렵습니다</li>
                        <li><span className="num">7.</span>중복 예약이 발생할 경우 시간 변경 요청을 드릴 수<br />있습니다</li>
                    </> :
                    this.props.data === 3 ?
                    <>
                        <li><span className="num">3.</span>블랙 시술을 진행한 경우 <strong>밝은 컬러 염색 시 얼룩</strong>이<br />있을 수 있습니다</li>
                        <li><span className="num">4.</span>블랙빼기 시술 후 <strong>디자인 염색은 추가비용이 발생<br />할 수 있습니다</strong></li>
                        <li><span className="num">5.</span>고객님의 <strong>모질 및 모발 손상상태에 따라 시술이 <br />불가능</strong>할 수 있습니다</li>
                        <li><span className="num">6.</span>모든 시술은 <strong>1:1로 진행</strong>되며, 동시 시술이 어렵습니다</li>
                        <li><span className="num">7.</span>중복 예약이 발생할 경우 시간 변경 요청을 드릴 수<br />있습니다</li>
                    </>:
                    this.props.data === 4 ?
                    <>
                        <li><span className="num">3.</span>붙임머리는 원장님과의 상담 후 예약 부탁드립니다</li>
                        <li><span className="num">4.</span>상담 없이 예약 될 경우 <strong>예약 취소 및 별도 연락이<br />진행</strong> 될 수 있습니다</li>
                        <li><span className="num">5.</span>중복 예약이 발생할 경우 시간 변경 요청을 드릴 수<br />있습니다</li>
                    </>:
                    this.props.data === 5 ?
                    <>
                        <li><span className="num">3.</span>탈색 후 염색모의 경우 클리닉 약제로 인해<br /><strong>모발의 컬러가 달라질 수 있습니다</strong></li>
                        <li><span className="num">4.</span>중복 예약이 발생할 경우 시간 변경 요청을 드릴 수<br />있습니다</li>
                    </>: null
                    }
                </ul>
                <div className="notice-text" >위와 관련한 궁금사항은 카카오톡 채널로 문의해주세요 :)</div>
            </>
        )
    }
}

export default Caution;