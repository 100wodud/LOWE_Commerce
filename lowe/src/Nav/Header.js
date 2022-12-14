import './Header.css';
import { Component } from 'react';
import TagManager from "react-gtm-module";


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

    clickButton = (e) => () => {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        if (e === 1) {
            window.location.href = "/search" + funnel
        } else if (e === 2) {
            window.location.href = "/" + funnel
        } else if (e === 3) {
            if(this.props.event === "item"){
                const tagManagerArgs = {
                    dataLayer: {
                        event: 'click_item_share'
                    },
                };
                TagManager.dataLayer(tagManagerArgs);
            }
            if(window.location.pathname.split("/")[1] === "designer"){
                const tagManagerArgs = {
                    dataLayer: {
                        event: 'click_designer_share'
                    },
                };
                TagManager.dataLayer(tagManagerArgs);
            }
            if (navigator.share) {
                navigator.share({
                    title: '?????? - ??????????????? ?????????',
                    text: '????????? ??????????????? ?????????. ?????? ????????? ?????? ??????????????? ?????? ???????????? ??? ??????, ??????(LOWE)',
                    url: window.location.href,
                });
            } else {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert("???????????? ??????!");
                    })
            }
        }
    }


    render() {
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <>
                {this.props.header === "clear" ?

                    <header className="header clear" id="headers">
                        <div style={{ cursor: "pointer" }}>
                            <img onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_dback.svg"} alt="?????? ??????" />
                            {this.props.scroll ?
                                <div style={{ float: "right" }}>
                                    <img className='header_nav_img' onClick={this.clickButton(3)} src={process.env.PUBLIC_URL + "/image/nav/nav_share.svg"} alt="?????? ??????" />
                                    <img className='header_nav_img' onClick={this.clickButton(2)} src={process.env.PUBLIC_URL + "/image/nav/nav_home.svg"} alt="?????? ??????" />
                                    <img className='header_nav_img' style={{ marginRight: "12px" }} onClick={this.clickButton(1)} src={process.env.PUBLIC_URL + "/image/nav/nav_search.svg"} alt="?????? ??????" />
                                </div> : null
                            }
                        </div>
                    </header> :
                    <header className="header" id="headers">
                        {this.props.header !== "board" ?
                            <>
                                <a href={`/${funnel}`}>
                                    <img className="header_logo" src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="?????? ??????" />
                                </a>
                                {this.props.header === "home" ?
                                    <a href={`/search`}>
                                        <img className="header_search" src={process.env.PUBLIC_URL + "/image/nav/header_search.svg"} alt="?????? ??????" />
                                    </a> :
                                    <div></div>
                                }
                            </> :
                            <>
                                <a href={`/${funnel}`}>
                                    <img className="header_name" src={process.env.PUBLIC_URL + "/image/nav/header_logo.svg"} alt="?????? ??????" />
                                </a>
                                <div>
                                    <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="?????? ??????" />
                                </div>
                            </>
                        }
                    </header>
                }
            </>
        );
    }
}
export default Header;