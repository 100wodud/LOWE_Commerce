import { Component } from "react";
import "./Recommand.css"
import axios from "axios";

class Recommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            data: null,
            like: false,
        };
        this.onclickLike = this.onclickLike.bind(this);
    }

    componentDidMount = () => {
        let id = this.props.e.id;
        let user = window.localStorage.getItem("id");
        if (id && user) {
          axios.post("https://d205rw3p3b6ysa.cloudfront.net/boardLikeChk", {
            user: user,
            id: id,
          })
            .then((res) => {
              if (res.data.heart === 1) {
                this.setState({ like: true })
              } else {
                this.setState({ like: false })
              }
            });
        }
    }


  async onclickLike(e) {
    e.preventDefault();
    let id = this.props.e.id;
    let user = window.localStorage.getItem("id");
    let like = 0;
    if (this.state.like) {
      like = 1;
    } else {
      like = 0;
    }
    if (id && user) {
      await axios.post("https://d205rw3p3b6ysa.cloudfront.net/boardLikeUpdate", {
        id: id,
        user: user,
        heart: like
      }).then((res) => {
        this.setState({ like: !this.state.like })
      });
    }
    
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
        let user = window.localStorage.getItem("id");
        let funnel ="";
        if(window.location.href.split("?")[1]){
            funnel="?" + window.location.href.split("?")[1];
        } else{
            funnel=''
        }
        return (
            <span style={{float: "left", marginRight: "12px"}}>
                <a onClick={this.onclickRecently} href={`/board/${this.props.e.id}${funnel}`} className="recommand">
                    <div>
                        <img src={process.env.PUBLIC_URL + this.props.e.thumbnail} className="recommand_thumnail" alt="로위 상품 썸네일" /><div style={{ width: "100%", height: "37px", marginTop: "-39px", textAlign: "right", zIndex: "100" }} >
              {user ?
                this.state.like === false ?
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_like.svg"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={(e) => { e.preventDefault(); alert("로그인을 해주세요") }} />
              }
            </div>
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
