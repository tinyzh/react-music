/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import './progress.less'

class Progress extends Component {
    constructor(props) {
        super(props)
        this.changeProgress = this.changeProgress.bind(this)
    }
    changeProgress(e){
        let progressBar = this.progressBar
        let progressP = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth  //当前鼠标的左边距-当前进度条的左边距  然后除以进度条宽度  得到当前的百分比
        this.props.onProgressChange && this.props.onProgressChange(progressP)
    }

    render(){
        return (
            <div className="components-progress"
                 ref={(progressBar) => {this.progressBar = progressBar}}
                onClick={this.changeProgress}
            >
                <div className="progress" style={{width:`${this.props.progress}%`, background:this.props.barColor}}></div>
            </div>
        )
    }
}

export default Progress