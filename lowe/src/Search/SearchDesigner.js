import React from "react";
import "./SearchDesigner.css"
import axios from "axios";

class SearchDesigner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            data: "",
            id: this.props.data.id,
        };
    }

    componentDidMount = () => {
        let manager_id = this.props.data.id;
        let user_id = Number(window.localStorage.getItem("id"));
        if (manager_id && user_id) {
            axios.post(`http://54.180.117.244:5000/getFavorite`, {
                manager_id: manager_id,
                user_id: user_id,
            }).then((res) => {
                if (res.data.length) {
                    this.setState({ like: true })
                } else {
                    this.setState({ like: false })
                }
            }).catch((err) => {
                console.log(err)
            });
        }
        if(this.props.rank){
            axios.post("http://54.180.117.244:5000/getPortfolio", {
                ManagerId: manager_id,
            }).then((res)=>{
                this.setState({data: res.data.portfolio})
            })

        }
    }


    render() {
        let data = this.props.data;
        let funnel = "";
        if (window.location.href.split("?")[1]) {
            funnel = "?" + window.location.href.split("?")[1];
        } else {
            funnel = ''
        }
        return (
            <>
                {data.user_state === 1 ?
                <>
                    <div className={this.props.board ? "Designerlist_div border" : "Designerlist_div"} style={this.props.board ? {} : {padding: "0 12px"}}>
                        <div>
                            <div className="DesignerList_profileimg" style={{width: "36px", height: "36px", padding: "12px 2px 12px 0"}}>
                                <img src={data.img} alt={data.name} style={{borderRadius: "90%"}} />
                            </div>
                        </div>
                        {this.props.detail ?
                            <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div">
                                <div className="DesignerList_content_time">
                                    <strong>{data.name} {data.rank}</strong><span style={{ marginLeft: "8px" }}>{data.store}</span>
                                </div>
                                {data.Hashtags.length ?
                                    <div className="DesignerList_content_hash_time">
                                        <span>#{data.Hashtags[0].content}</span><span style={{ marginLeft: "8px" }}>#{data.Hashtags[1].content}</span>
                                    </div> :
                                    <div className="DesignerList_content_hash_time">
                                        <span>ㅤ</span>
                                    </div>
                                }
                                <div className="DesignerList_content_operating_time">
                                    {data.home} <span style={{marginLeft: "8px"}}>{data.operating_time}</span>
                                </div>
                            </a> :
                            <a href={`/designer/${data.id}${funnel}`} className="DesignerList_content_div">
                                <div className="DesignerList_content">
                                    <strong>{data.name} {data.rank}</strong><span style={{ marginLeft: "8px" }}>{data.store}</span>
                                </div>
                                {data.Hashtags.length ?
                                    <div className="DesignerList_content_hash">
                                        <span>#{data.Hashtags[0].content}</span><span style={{ marginLeft: "8px" }}>#{data.Hashtags[1].content}</span>
                                    </div> :
                                    <div className="DesignerList_content_hash">
                                        <span>ㅤ</span>
                                    </div>
                                }
                            </a>
                        }
                        <div className="DesignerList_Coupon_div">
                            {JSON.parse(data.coupons) ?
                                <div style={{ lineHeight: "63px" }}>
                                    <img src={process.env.PUBLIC_URL + "/image/nav/designer_coupon.svg"} alt="쿠폰" />
                                </div> :
                                <div>

                                </div>
                            }
                        </div>
                    </div>
                    </>
                    : null}
            </>
        );
    }
}

export default SearchDesigner;