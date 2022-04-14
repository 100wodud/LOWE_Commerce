import { Component } from 'react';
import "./Edit.css";


class Edit extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    onClickSignOut= () => {
        this.props.openmodal();
    }
    render() {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <div className="profile_edit" >
                <div className="profile_edit_subtitle">나의 정보</div>
                <a href={`/editmyinfo${funnel}`}>
                    <div>회원정보 수정</div><div><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" /></div>
                </a>
                <div className='profile_edit_div' onClick={this.onClickSignOut} style={{cursor: "pointer"}}>
                    <div>로그아웃</div><div><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" /></div>
                </div>
            </div>
        );
    }
}
export default Edit;