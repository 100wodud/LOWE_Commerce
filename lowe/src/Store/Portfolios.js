import { Component } from "react";
import "./Portfolios.css"
import ScrollContainer from 'react-indiana-drag-scroll'

class Portfolios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            portfolios: ""
        };
    }

    componentDidMount = () => {
        let arr = [];
        for(let i =0; i < this.props.data.Portfolios.length; i++){
            for(let j=0; j < this.props.data.Portfolios[i].Hashtags.length; j++){
                if(this.props.data.Portfolios[i].Hashtags[j].content.indexOf(this.props.data.Hashtags[0]) !== -1){
                    arr.push(this.props.data.Portfolios[i])
                    break;
                }
            }
        }
        this.setState({ category: this.props.data.Hashtags[0], portfolios: arr })
        
    }

    onClickcategory = (e) => () => {
        let arr = [];
        for(let i =0; i < this.props.data.Portfolios.length; i++){
            for(let j=0; j < this.props.data.Portfolios[i].Hashtags.length; j++){
                if(this.props.data.Portfolios[i].Hashtags[j].content.indexOf(e) !== -1){
                    arr.push(this.props.data.Portfolios[i])
                    break;
                }
            }
        }
        this.setState({ category: e, portfolios: arr })
    }

    render() {
        return (
            <div>
            <div style={{marginTop: "20px", marginBottom: "6px"}}>
                    <ScrollContainer className="filter_category" >
                    {this.props.data.Hashtags.map((e, i) => (
                        <span key={e} onClick={this.onClickcategory(e)} className={(this.state.category === e ? "category_select" : "Portfolio_title_content")}>{e}</span>
                    ))
                    }
                </ScrollContainer>
            </div>
                    <div className="DMain_allmenu_style" style={{marginBottom: "0"}}>
                {
            this.state.portfolios.length ?
            this.state.portfolios.map((e) => (
                    <div>
                        <a href={`/portfolio/${e.id}`}>
                            {
                                e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".avi" || e.img.slice(e.img.lastIndexOf('.'), e.img.lastIndexOf('.') + 4) === ".mp4" ?
                                    <video preload="metadata" className="Portf_image" alt="포트폴리오 사진" >
                                        <source src={e.img + "#t=0.5"} />
                                    </video> :
                                    <img src={e.img} alt="로위 포트폴리오 이미지" />
                            }
                        </a>
                    </div>
                ))
                : null
                        }
            </div>
            </div>
        )
    }
}

export default Portfolios;