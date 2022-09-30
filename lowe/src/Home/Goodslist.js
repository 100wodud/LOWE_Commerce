import { Component } from "react";
import axios from "axios";
import "./Goodslist.css";
import ModalPhone from "../Sign/ModalPhone";
import TagManager from "react-gtm-module";

class Goodslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      arr: [],
      phonemodal: false,
      modalcomment: '',
    };
    this.onclickLike = this.onclickLike.bind(this);
  }
  componentDidMount = () => {
    let id = this.props.e.id;
    let user = window.localStorage.getItem("id");
    if (id && user) {
      axios.post("https://server.lowehair.kr/boardLikeChk", {
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
      await axios.post("https://server.lowehair.kr/boardLikeUpdate", {
        id: id,
        user: user,
        heart: like
      }).then((res) => {
        if(res.data){
          window.naverInnerScript(2)
        }
        this.setState({ like: !this.state.like })
      });
    }

    let cat = ""
    if (window.location.pathname.split('/')[3] === "event") {
      cat = "이벤트"
    } else if (window.location.pathname.split('/')[3] === 1 || this.props.e.category === 1) {
      cat = "컷";
    } else if (window.location.pathname.split('/')[3] === 2 || this.props.e.category === 2) {
      cat = "펌"
    } else if (window.location.pathname.split('/')[3] === 3 || this.props.e.category === 3) {
      cat = "염색"
    } else if (window.location.pathname.split('/')[3] === 5 || this.props.e.category === 5) {
      cat = "클리닉"
    }
    const tagManagerArgs = {
      dataLayer: {
        event: this.props.wish,
        items: [
          {
            index: this.props.i,
            item_id: this.props.e.id,
            item_name: this.props.e.name,
            price: this.props.e.price,
            item_brand: this.props.e.store,
            item_variant: this.props.e.designer_name,
            item_category: [cat]
          }
        ]
      },
    };
    TagManager.dataLayer(tagManagerArgs);

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
    let cat = ""
      if (window.location.pathname.split('/')[3] === "event") {
        cat = "이벤트"
      } else if (window.location.pathname.split('/')[3] === 1 || this.props.e.category === 1) {
        cat = "컷";
      } else if (window.location.pathname.split('/')[3] === 2 || this.props.e.category === 2) {
        cat = "펌"
      } else if (window.location.pathname.split('/')[3] === 3 || this.props.e.category === 3) {
        cat = "염색"
      } else if (window.location.pathname.split('/')[3] === 5 || this.props.e.category === 5) {
        cat = "클리닉"
      }
    const tagManagerArgs = {
      dataLayer: {
        event: this.props.event,
        items: [
          {
            index: this.props.i,
            item_id: this.props.e.id,
            item_name: this.props.e.name,
            price: this.props.e.price,
            item_brand: this.props.e.store,
            item_variant: this.props.e.designer_name,
            item_category: [cat]
          }
        ]
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }

  openmodalPhone = (e) => (v) => {
    v.preventDefault();
    this.setState({ phonemodal: true, modalcomment: e });
  };
  closemodalPhone = () => {
    this.setState({ phonemodal: false, modalcomment: "" });
  };


  render() {
    let user = window.localStorage.getItem("id");
    let hash = false
    if (this.props.e.Hashtags) {
      this.props.e.Hashtags.filter((v) => {
        return v.content.indexOf("시그니처") !== -1 ?
          hash = true : null
      })
    }
    return (
      <>
        <span style={{ float: "left" }}>
          <a onClick={this.onclickRecently} href={`/board/${this.props.e.id}`} className="goods">
            <div>
              {
                hash ?
                  <div className="goods_signature_box">
                    시그니처
                  </div> : null
              }
              <img src={process.env.PUBLIC_URL + this.props.e.thumbnail} className="goods_thumnail" alt="로위 상품 썸네일" />
              <div style={{ width: "100%", height: "37px", marginTop: "-39px", textAlign: "right", zIndex: "100" }} >
                {user ?
                  this.state.like === false ?
                    <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                    <img src={process.env.PUBLIC_URL + "/image/nav/home_like.svg"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={this.openmodalPhone("로그인이 필요한 서비스 입니다")} />
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
        <ModalPhone open={this.state.phonemodal} closemodal={this.closemodalPhone} comment={this.state.modalcomment} />
      </>
    )
  }
}

export default Goodslist;