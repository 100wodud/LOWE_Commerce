import { Component } from "react";
import axios from "axios";
import "./Goodslist.css";

class Goodslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      arr: []
    };
    this.onclickLike = this.onclickLike.bind(this);
  }
  componentDidMount = () => {
    let id = this.props.e.id;
    let user = window.localStorage.getItem("id");
    if (id && user) {
      axios.post("http://54.180.117.244:5000/boardLikeChk", {
        user: user,
        id: id,
      })
        .then((res) => {
          if (res.data && res.data.heart === 1) {
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
      await axios.post("http://54.180.117.244:5000/boardLikeUpdate", {
        id: id,
        user: user,
        heart: like
      }).then((res) => {
        this.setState({ like: !this.state.like })
      });
    }

  }

  onclickRecently = async () => {
    var recently = JSON.parse(localStorage.getItem("recent"));
    if (recently == null) recently = [];
    var id = this.props.e.id;
    let index = recently.indexOf(id)
    localStorage.setItem("entry", JSON.stringify(id));
    if (index === -1) {
      recently.unshift(id);
    } else {
      recently.splice(index, 1);
      recently.unshift(id);
    }
    localStorage.setItem("recent", JSON.stringify(recently));
  }

  render() {
    let user = window.localStorage.getItem("id");
    let funnel = "";
    if (window.location.href.split("?")[1]) {
      funnel = "?" + window.location.href.split("?")[1];
    } else {
      funnel = ''
    }
    return (
      <span style={{ float: "left" }}>
        <a onClick={this.onclickRecently} href={`/board/${this.props.e.id}${funnel}`} className="goods">
          <div>
            <img src={process.env.PUBLIC_URL + this.props.e.thumbnail} className="goods_thumnail" alt="로위 상품 썸네일" />

            <div style={{ width: "100%", height: "37px", marginTop: "-39px", textAlign: "right", zIndex: "100" }} >
              {user ?
                this.state.like === false ?
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_like.svg"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={(e) => { e.preventDefault(); alert("로그인을 해주세요") }} />
              }
            </div>
          </div>
          <div className="goods_designer">
            <strong>{this.props.e.designer_name}</strong> {this.props.e.store}
          </div>
          <div className="goods_title">
            {this.props.e.name}
          </div>
          <div className="goods_price">
            {
              this.props.e.eventType ?
                <span className="goods_price_percent">{this.props.e.eventPrice}%</span> :
                <></>
            }

            <span className="goods_price_price">{this.props.e.price.comma()}</span>
            {
              this.props.e.eventType ?
                <div className="goods_price_realprice">{(Math.round(this.props.e.price / (100 - this.props.e.eventPrice) * 100 / 1000) * 1000).comma()}</div> :
                <></>
            }
          </div>
        </a>
      </span>
    )
  }
}

export default Goodslist;