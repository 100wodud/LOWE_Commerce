import { Component } from "react";
import "./Recently.css"
import ScrollContainer from 'react-indiana-drag-scroll'

class Recently extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recent: []
        };
    }


    render() {
        return (
            <div>
                { this.props.recent && this.props.recent.length ?
                    <div>
                        <div className="recentSearch_text_div">
                            <div className="recentSearch_title">최근에 검색했어요</div>
                            <div className="recentSearch_deleteAll" onClick={this.props.deleteAllsearch}>모두 삭제</div>
                        </div>
                        <ScrollContainer className="recentSearch_content_div">
                                {this.props.recent.map((e, i) => (
                                    <span key={i} className="recentSearch_content" >
                                        <span onClick={this.props.handleRecentSearch(e)} style={{padding: "9px 5px 9px 16px"}}>{e}</span>
                                        <span onClick={this.props.deleteOnesearch(i)} style={{padding: "9px 16px 9px 10px"}}>
                                            <img src={process.env.PUBLIC_URL + "/image/nav/search_delete.svg"} alt="로위 홈 아이콘" />
                                        </span>
                                    </span>
                                ))
                                }
                        </ScrollContainer>
                    </div>: null
                }
            </div>
        )
    }
}

export default Recently;
