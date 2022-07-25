import React from "react";
import "./Secondsec.css"

class Surgery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false
        };
    }

    componentDidMount = () => {
        document.addEventListener('scroll', function () {
            var target = document.getElementById("filter_trigger2");
            var abBottom = window.pageYOffset + target.getBoundingClientRect().top + 60
            var currentScrollValue = document.documentElement.scrollTop;
            let header = document.getElementById("filter_category");
            if (currentScrollValue > abBottom ) {
                header.classList.add("fixed");
                header.classList.add("Ddetail_marginbottom");
            }
            if(currentScrollValue < abBottom){
                header.classList.remove("fixed");
                header.classList.remove("Ddetail_marginbottom");
            }
        });
    }

    onClickmoreview = () => {
        this.setState({ click: !this.state.click })
    }


    render() {
        return (
            <>
                <tr onClick={this.props.data.url ? this.props.boardPay(this.props.data) : this.props.SurgeriesPay(this.props.data)} >
                    <td className="Ddetail_surgery_content_first">
                        <div className="Ddetail_surgery_content_first_content">{this.props.data.content}</div>
                        <div className="Ddetail_surgery_content_first_price">{this.props.data.price.comma()}원</div>
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

