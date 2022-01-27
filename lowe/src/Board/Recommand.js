import { Component } from "react";
import "./Recommand.css"

class Recommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            data: null,
        };
    }

    componentDidMount = () => {
    }


  onclickRecently = async() => {
    var recently = JSON.parse(localStorage.getItem("recent"));
    if(recently == null) recently = [];
    var id = this.props.e.id;
    let index = recently.indexOf(id)
    localStorage.setItem("entry", JSON.stringify(id));
    if(index === -1){
      recently.unshift(id);
    } else {
      recently.splice(index, 1);
      recently.unshift(id);
    }
    localStorage.setItem("recent", JSON.stringify(recently));
  }


    render() {
        return (
            <span>
                <a onClick={this.onclickRecently} href={`/board/${this.props.e.id}`} className="recommand">
                    <div>
                        <img src={process.env.PUBLIC_URL + this.props.e.thumbnail} className="recommand_thumnail" alt="로위 상품 썸네일" />
                    </div>
                    <div className="recommand_title">
                        {this.props.e.name}
                    </div>
                    <div className="recommand_price">
                        {this.props.e.eventType ?
                            <span className="recommand_price_percent">{this.props.e.eventPrice}%</span> :
                            <></>
                        }
                        <span className="recommand_price_price">{this.props.e.price.comma()}원</span>
                    </div>
                </a>
            </span>
        )
    }
}

export default Recommand;
