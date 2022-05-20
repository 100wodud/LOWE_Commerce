import { Component } from "react";
import "./ProFooter.css"


class ProFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    clickBanner = () => {
        navigator.clipboard.writeText("https://lowehair.kr/promotion/spring2204?utm_source=com&utm_medium=com&utm_campaign=share")
        .then(() => {
            alert("링크복사 완료 주변에 알려주세요!");
        })
    }


    clickShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '로위 - 헤어스타일 스토어',
                text: '온라인 헤어스타일 스토어. 내가 원하는 모든 헤어스타일 부터 예약까지 한 번에, 로위(LOWE)',
                url: "https://lowehair.kr/promotion/moment_event?utm_source=com&utm_medium=com&utm_campaign=share",
            });
        }else{
            navigator.clipboard.writeText("https://lowehair.kr/promotion/moment_event?utm_source=com&utm_medium=com&utm_campaign=share")
            .then(() => {
                alert("링크복사 완료 주변에 알려주세요!");
            })
        }
    }

    render() {
        return (
            <>
            { this.props.footer==="promotion1" ?
            <div className="ProFooter_footer">
                <div onClick={this.clickShare} style={{backgroundColor: "#F85C50"}}>
                    <div style={{lineHeight: "64px"}}  >
                    소중한 사람에게 <strong>공유하기</strong>
                    </div>
                </div>
            </div> :
            <div className="ProFooter_footer">
                <div onClick={this.clickBanner}>
                    <div style={{lineHeight: "64px"}}  >
                    친구에게 <strong>공유하기</strong>
                    </div>
                </div>
            </div>
            }
        </>
        );
    }
}

export default ProFooter;





