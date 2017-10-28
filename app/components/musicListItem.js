/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import './listitem.less'
import Pubsub from 'pubsub-js'

class MusicListItem extends Component {
    handlePlayMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem) //订阅事件
        Pubsub.publish('IS_PLAY', true)
    }

    handleDeleteMusic(musicItem, event) {
        event.stopPropagation()
        Pubsub.publish('DELETE_MUSIC', musicItem)
    }

    render() {
        let musicItem = this.props.musicItem
        return (
            <li
                onClick={this.handlePlayMusic.bind(this,musicItem)}
                className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}
            >
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p
                    onClick={this.handleDeleteMusic.bind(this,musicItem)}
                    className="-col-auto delete"
                ></p>
            </li>
        )
    }
}

export default MusicListItem;