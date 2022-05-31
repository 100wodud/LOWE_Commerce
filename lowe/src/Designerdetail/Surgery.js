import React from "react";
import "./Secondsec.css"

class Surgery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false
        };
    }


    onClickmoreview = () => {
        this.setState({ click: !this.state.click })
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
                <tr >
                    <td className="Ddetail_surgery_content_first">
                        <div className="Ddetail_surgery_content_first_content">{this.props.data.content}</div>
                        <div className="Ddetail_surgery_content_first_price">{this.props.data.price.comma()}원</div>
                    </td>
                    <td className="Ddetail_surgery_content_third">
                    {
                        this.props.data.url ?
                            <div className="Ddetail_orange">
                                <a href={this.props.data.url + funnel}>
                                    시술보기
                                </a>
                            </div> :
                            <div onClick={this.props.SurgeriesPay(this.props.data)} style={{ cursor: "pointer" }}>
                                결제하기
                            </div>
                    }
                    </td>
                </tr>
                {this.props.data.extra_amount ?
                    <div onClick={this.onClickmoreview} className="Ddetail_surgery_more_info">
                        <div className={(this.state.click === false ? "Ddetail_surgery_more_false" : 'Ddetail_surgery_more_true')} id="review_content">
                            {this.props.data.extra_amount}
                        </div>
                        <img className={(this.state.click === false ? "Ddetail_surgery_moreview" : 'Ddetail_surgery_moreview rev')} src={process.env.PUBLIC_URL + "/image/nav/board_moreview.svg"} alt="리뷰가 더보기"></img>
                    </div> : 
                    <div className="Ddetail_surgery_more_info"></div>
                }
            </>
        );
    }
}

export default Surgery;

