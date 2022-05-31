import { Component } from "react";
import Review from "./Review";
import ModalReview from "./ModalReview";
import "./ReviewList.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      data: null,
      review: false,
      slider: 0
    };
  }

  openmodal = (e) => () => {
    this.setState({ review: true, slider: e });
  };
  closemodal = () => {
    this.setState({ review: false });
  };

  render() {
    return (
      <div>
        {
          this.props.imgdata.length ?
            <div className="imgreviewlist_div" >
              {this.props.imgdata.map((e, i) => (
                e.Images.map((image) => (
                  <img onClick={this.openmodal(i)} src={image.url} key={e.id} alt="사진리뷰" className="imgreview_img" />
                ))
              ))}
            </div> : null
        }
        {!this.props.top ?
          this.props.data.length ?
            this.props.data.map((e, i) => (
              <Review key={i} data={e} designer={this.props.designer ? true : null} />
            )) :
            <div className="no_review" >
              <div>
                <img src={process.env.PUBLIC_URL + "/image/nav/board_noreview.svg"} alt="moreview" />
              </div>
              <div className="no_review_content1">리뷰 작성 후 <strong>베스트 리뷰에 선정되시면</strong></div>
              <div className="no_review_content2"><strong><span style={{ fontFamily: "Montserrat" }}>10,000</span>원 할인 쿠폰</strong>을 드려요!</div>
            </div> :
          this.props.data.length && this.props.imgdata.length ?
            null :
            <div className="no_review_top" >
              <div>
                <img src={process.env.PUBLIC_URL + "/image/nav/board_noreview.svg"} alt="moreview" />
              </div>
              <div className="no_review_content1">리뷰 작성 후 <strong>베스트 리뷰에 선정되시면</strong></div>
              <div className="no_review_content2"><strong><span style={{ fontFamily: "Montserrat" }}>10,000</span>원 할인 쿠폰</strong>을 드려요!</div>
            </div>
        }
        {this.props.data.length > this.props.number && !this.props.top ?
          <div className="review_moreview" style={{ lineHeight: "60px" }} onClick={this.props.onClickmoreview}>
            <span style={{ marginRight: "8px" }}><img src={process.env.PUBLIC_URL + "/image/nav/review_moreview.svg"} alt="moreview" /></span><span>더보기</span>
          </div> : null
        }
        {
          this.state.review === true ?
            <ModalReview data={this.props.imgdata} close={this.closemodal} slider={this.state.slider} /> :
            null
        }

      </div>
    )
  }
}

export default ReviewList;
