import './LikeHeader.css';
import { Component } from 'react';


class LikeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <header className="headers">
                {this.props.header ?
                    <div className="header_text">{this.props.header} 시술</div> :
                    null
                }
            </header>
        );
    }
}
export default LikeHeader;