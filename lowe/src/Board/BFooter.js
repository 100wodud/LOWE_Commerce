import { Component } from 'react';
import "./BFooter.css"


class BFooter extends Component {
    constructor() {
        super();
        this.state = {
            accordion: true
        }
    }
    render() {
        console.log(this.props)
        return (
            <footer className='BFooter'>
                {this.props.data && this.props.designer ?
                    <>
                        <div style={{ maxWidth: "80px", width:"21%",float: "left", marginRight: "0.4%" }}>
                            <div style={{lineHeight: "65px", marginTop: "14px"}}>
                                <div>리뷰</div>
                                <div>({this.props.data.board.Reviews.length})</div>
                            </div>
                        </div>
                        <div style={{ maxWidth: "102px", width:"25.2%",float: "left", marginRight: "0.4%" }}>
                            {
                                this.props.data.board.eventType === 1 ?
                                    <div style={{lineHeight: "65px", height:"65px", textAlign: "left", marginLeft: "16px", marginTop: "14px" }}>
                                        <div style={{ fontFamily: "Montserrat"}}>{this.props.data.board.eventPrice}%</div>
                                        <div style={{fontWeight: "700" ,fontFamily: "Montserrat"}}>{this.props.data.board.price.comma()}</div>
                                    </div> :
                                    <div style={{fontWeight: "700" ,fontFamily: "Montserrat", lineHeight: "65px"}}>{this.props.data.board.price.comma()}</div>
                                  
                            }
                        </div>
                        <div style={{ maxWidth: "200px", width:"52.9%", float: "left" }}>
                            <a href={this.props.designer[0].reserve_url}>예약하기</a>
                        </div>
                    </> : null
                }
            </footer >
        );
    }
}
export default BFooter;