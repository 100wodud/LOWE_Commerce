import { Component } from "react";
import "./Recommand.css"
import axios from "axios";
import TagManager from "react-gtm-module";

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
    if (this.props.e.category === 1) {
        cat = "컷";
      } else if (this.props.e.category === 2) {
        cat = "펌"
      } else if (this.props.e.category === 3) {
        cat = "염색"
      } else if (this.props.e.category === 5) {
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
    const tagManagerArgs = {
      dataLayer: {
        event: this.props.event,
        recomm_item_id: this.props.e.id,
        recomm_item_name: this.props.e.name,
        recomm_price: this.props.e.price,
        recomm_branch: this.props.e.store,
        recomm_designer: this.props.e.designer_name
      },
    };
    TagManager.dataLayer(tagManagerArgs);
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
                <a href={`/board/${this.props.e.id}${funnel}`} className="recommand">
                    <div>
                        <img onClick={this.onclickRecently} src={process.env.PUBLIC_URL + this.props.e.thumbnail} className="recommand_thumnail" alt="로위 상품 썸네일" /><div style={{ width: "100%", height: "37px", marginTop: "-39px", textAlign: "right", zIndex: "100" }} >
              {user ?
                this.state.like === false ?
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                  <img src={process.env.PUBLIC_URL + "/image/nav/home_like.svg"} className="goods_like" alt="로위 상품 찜" onClick={this.onclickLike} /> :
                <img src={process.env.PUBLIC_URL + "/image/nav/home_dislike.png"} className="goods_like" alt="로위 상품 찜" onClick={(e) => { e.preventDefault(); alert("로그인을 해주세요") }} />
              }
            </div>
                    </div>
                    <div className="recommand_title" onClick={this.onclickRecently} >
                        {this.props.e.name}
                    </div>
                    <div className="recommand_price" onClick={this.onclickRecently} >
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
