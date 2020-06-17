import React from "react";
import ConfirmTooltip from '@/components/ConfirmTooltip'
import './index.css'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '这是一大段测试文字啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿',
      childDisplay: false,
    };
  }
  componentDidMount() {
    console.log('click')
    document.addEventListener('click', (e) => {
      this.setState({
        childDisplay: false
      });
    });
  }

  confirm(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      childDisplay: false
    })
    console.log(e, 'confirm')
  }

  updateChildDisplay(display) {
    this.setState({
      childDisplay: display
    })
  }

  showTooltip(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      childDisplay : !this.state.childDisplay,
    }, () => {
      console.log(this.state.childDisplay,'childDisplay')
    })
  }
  render () {
    return (
      <div className="container">
        <button className="rc-btn rc-btn--one"　onClick={(e) => this.showTooltip(e)}>click here!</button>
        <ConfirmTooltip content={this.state.content} display={this.state.childDisplay} confirm={e => this.confirm(e)} updateChildDisplay={() => this.updateChildDisplay()}/>
      </div>
    );
  }
}

export default Test;
