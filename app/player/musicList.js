/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import MusicListItem from '../components/musicListItem'

class MusicList extends Component {
    constructor(){
        super()
        this.state = {
            progress: 0
        }
    }
    componentDidMount(){
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        })
    }
    render() {
        let listEle = null;
        listEle = this.props.musiclist.map((item) => {
            return <MusicListItem
                key={item.id}
                progress={item === this.props.currentMusicItem ? this.state.progress : 0}
                musicItem={item}
                focus={item === this.props.currentMusicItem}
            />
        })
        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}

export default MusicList;