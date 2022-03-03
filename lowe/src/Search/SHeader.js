import { Component } from "react";

class SHeader extends Component {
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
                    <input id="header_search" onChange={this.props.handleInputValue("search")} className="header_input" placeholder="검색어를 입력해주세요" type="text"></input>
                </span>
                    <span >
                        <img onClick={this.props.handleInputSearch} className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                    </span>
            </header>
        )
    }
}

export default SHeader;
