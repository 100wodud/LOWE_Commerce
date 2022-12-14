import { Component } from "react";
import "./Filter.css"

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 1,
            scroll: 0,
            filter: false
        };
    }

    componentDidMount = () => {
        var self = this
        document.addEventListener('scroll', function () {
            var cur = self.state.scroll;
            var target = document.getElementById("filter_trigger");
            var rev = document.getElementById("review");
            var loc = document.getElementById("location");
            var abBottom = window.pageYOffset + target.getBoundingClientRect().top + 50
            var location = window.pageYOffset + loc.getBoundingClientRect().top - 80
            var review = window.pageYOffset + rev.getBoundingClientRect().top - 80
            var currentScrollValue = document.documentElement.scrollTop;
            if (cur + 100 < currentScrollValue && currentScrollValue > 60) {
                self.setState({scroll: currentScrollValue, filter: false})
            }
            if (cur - 100 > currentScrollValue || currentScrollValue <= 60) {
                self.setState({scroll: currentScrollValue, filter: true})
            }
            let header = document.getElementById("scroll");
            if (currentScrollValue > abBottom && currentScrollValue < location) {
                header.classList.add("fixed");
                self.setState({ list: 1 })
            }
            if (currentScrollValue > location && currentScrollValue < review){
                header.classList.add("fixed");
                self.setState({ list: 3 })
            }
            if (currentScrollValue > review){
                header.classList.add("fixed");
                self.setState({ list: 2 })
            }
            if(currentScrollValue < abBottom){
                header.classList.remove("fixed");
                self.setState({ list: 0 })
            }

            if (self.state.filter) {
                header.classList.add("top_margin40");
            } else {
                header.classList.remove("top_margin40");
            }
        });
    }


    onclickList = (e) => () => {
        this.setState({ list: e })
    }

    render() {
        return (
            <div className="Board_third_filter" id="scroll">
                <a className={(this.state.list === 1 ? "push_button" : 'pull_button')} onClick={this.onclickList(1)} href={`${window.location.pathname}#goods`}>????????????</a>
                <a className={(this.state.list === 2 ? "push_button" : 'pull_button')} onClick={this.onclickList(2)} href={`${window.location.pathname}#review`}>??????({this.props.data.board.Reviews.length})</a>
                <a className={(this.state.list === 3 ? "push_button" : 'pull_button')} onClick={this.onclickList(3)} href={`${window.location.pathname}#location`}>?????? ??????</a>
            </div> 
        )
    }
}

export default Filter;