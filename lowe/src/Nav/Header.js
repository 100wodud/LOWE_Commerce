import './Header.css';
import { Component } from 'react';


class Header extends Component {
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
            <header className="header">
                {this.props.header !== "board" ?
                    <>
                        <a href="/">
                            <img className="header_logo" src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="로위 로고" />
                        </a>
                        {this.props.header === "home" ?
                            <a href="/search">
                                <img className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="로위 서치" />
                            </a> :
                            <div></div>
                        }
                    </> :
                    <>
                        <a href="/">
                            <img className="header_name" src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="로위 로고" />
                        </a>
                        <div>
                            <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                        </div>
                    </>
                }
            </header>
        );
    }
}
export default Header;