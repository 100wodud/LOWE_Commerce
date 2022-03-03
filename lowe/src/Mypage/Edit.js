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
        return (
            <div className="profile_edit" >
                <a href='/editmyinfo'>
                    <div>회원정보 수정</div><div><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" /></div>
                </a>
                <div onClick={this.onClickSignOut} style={{cursor: "pointer"}}>
                    <div>로그아웃</div><div><img src={process.env.PUBLIC_URL + "/image/nav/next_arrow.svg"} alt="다음" /></div>
                </div>
            </div>
        );
    }
}
export default Edit;