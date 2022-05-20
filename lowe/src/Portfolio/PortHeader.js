import { Component } from 'react';
import "./PortHeader.css"


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

            let header = document.getElementById("portheader");
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


    gotoHome = () => {
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        window.location.href = `/${funnel}`
    }

    handleShare = () => {
        let url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: '로위 - 헤어스타일 스토어',
                text: '온라인 헤어스타일 스토어. 내가 원하는 모든 헤어스타일 부터 예약까지 한 번에, 로위(LOWE)',
                url: url,
            });
        } else {
            navigator.clipboard.writeText(url)
                .then(() => {
                    alert("링크복사 완료 주변에 알려주세요!");
                })
        }
    }

    render() {
        return (
            <header className="portheader" id="portheader">
                <div>
                    <img className="portheader_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                </div>
                <div>
                    {this.props.portfolio ?
                        <>
                    <img className="portheader_logo_home" onClick={this.gotoHome} src={process.env.PUBLIC_URL + "/image/nav/portfolio_home.svg"} alt="로위 상품 찜" />
                    <img className="portheader_logo" onClick={this.handleShare} src={process.env.PUBLIC_URL + "/image/nav/portfolio_share.svg"} alt="로위 상품 찜" />
                    </> :
                    null}
                </div>
            </header>
        );
    }
}
export default Header;