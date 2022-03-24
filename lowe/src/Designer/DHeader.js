import { Component } from "react";

class DHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    gotoBack = () => {
        window.history.go(-1)
    }

    render() {
        return (
            <header className="header3">
                <span>
                    <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                </span>
                <span>
                    <input id="header_search" className="header_input" onChange={this.props.onChangeSearch("search")} placeholder="검색어를 입력해주세요" type="text"></input>
                </span>
                    <span onClick={this.props.handleInputSearch}>
                        <img className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                    </span>
            </header>
        )
    }
}

export default DHeader;
