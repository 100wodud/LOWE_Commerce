import './Header.css';
import { Component } from 'react';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: false,
            scroll: 0
        };
    }

    componentDidMount = () => {
        var self = this
        document.addEventListener('scroll', function () {
            var cur = self.state.scroll;
            var currentScrollValue = document.documentElement.scrollTop;
            if (cur + 100 < currentScrollValue && currentScrollValue > 60) {
                self.setState({ scroll: currentScrollValue, header: false })
            }
            if (cur - 100 > currentScrollValue || currentScrollValue <= 60) {
                self.setState({ scroll: currentScrollValue, header: true })
            }

            let header = document.getElementById("headers");
            if (self.state.header) {
                header.classList.remove("hide");
            } else {
                header.classList.add("hide");
            }
        });
    }
    gotoBack = () => {
        window.history.go(-1)
    }

    render() {
        return (
            <header className="header" id="headers">
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