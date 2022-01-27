import './SignHeader.css';
import { Component } from 'react';


class SignHeader extends Component {
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
            <header className="header2">
                {this.props.header ?
                    <div className="header_name" >{this.props.header}</div> :
                    <div></div>

                }
                {this.props.close ?
                    <div>
                        <img className="header_back" onClick={this.props.close} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                    </div> :

                    <div>
                        <img className="header_back" onClick={this.gotoBack} src={process.env.PUBLIC_URL + "/image/nav/nav_back.svg"} alt="로위 로고" />
                    </div>
                }
            </header>
        );
    }
}
export default SignHeader;