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

    onclickEnter = (e) => {
        if (e.key === 'Enter') {
            this.props.handleInputSearch();
        }
    };

    render() {
        return (
            <header className="header3">
                <span>
                    <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                </span>
                <span>
                    <a href="/search">
                        <input id="header_search" onKeyPress={this.onclickEnter} className="header_input" onChange={this.props.onChangeSearch("search")} placeholder="검색어를 입력해주세요" type="text"></input>
                    </a>
                </span>
                <span onClick={this.props.handleInputSearch}>
                    <a href="/search">
                        <img className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                    </a>
                </span>
            </header>
        )
    }
}

export default DHeader;
