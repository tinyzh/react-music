/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import MusicListItem from '../components/musicListItem'

class MusicList extends Component {
    
    render() {
        let listEle = null;
        listEle = this.props.musiclist.map((item) => {
            return <MusicListItem
                key={item.id}
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