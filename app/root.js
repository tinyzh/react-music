/**
 * Created by zhangchao on 2017/10/28.
 */
import React, {Component} from 'react'
import Header from './components/header'
import Player from './player/player'
import {MUSIC_LIST} from './config/musiclist'
import Musiclist from './player/musicList'
import {hashHistory, Router, Route, IndexRoute} from 'react-router'
import Pubsub from 'pubsub-js'


class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            musiclist: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            isPlay: null
        }
    }
    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        }).jPlayer('play')
        this.setState({
            currentMusicItem: musicItem
        })
    }
    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem)
        let newIndex = null
        let length = this.state.musiclist.length
        if(type === 'text'){
            newIndex = (index + 1)%length
        }else{
            newIndex = (index - 1 + length)%length
        }
        this.playMusic(this.state.musiclist[newIndex])
    }
    findMusicIndex(musicItem){
        return this.state.musiclist.indexOf(musicItem)
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window',
            volume: 0.3 //默认音量
        });
        this.playMusic(this.state.currentMusicItem)
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext()
        })
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            if(this.state.currentMusicItem === musicItem){
                this.playNext('next')
            }
            this.setState({
                musiclist: this.state.musiclist.filter(item => {
                    return item !== musicItem
                })
            })
        })
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        })
        Pubsub.subscribe('IS_PLAY', (msg, isPlay) => {
            this.setState({
                isPlay: true
            })
        })
        Pubsub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev')
        })
        Pubsub.subscribe('PLAY_NEXT', (msg) => {
            this.playNext('next')
        })

    }

    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC')
        Pubsub.unsubscribe('PLAY_MUSIC')
        Pubsub.unsubscribe('PLAY_PREV')
        Pubsub.unsubscribe('PLAY_NEXT')
        Pubsub.unsubscribe('IS_PLAY')
        $('#player').unbind($.jPlayer.event.ended)
    }
    
    render(){
        return(
            <div>
                <Header />
                { React.cloneElement(this.props.children, this.state) }
            </div>
        )
    }
}

class Root extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player} />
                    <Route path="/list" component={Musiclist}></Route>
                </Route>
            </Router>
        )
    }
}

export default Root;