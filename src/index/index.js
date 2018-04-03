import React from 'react'
import { render } from 'react-dom'
import { Popup } from '../components'
import './style.less'

const Index = React.createClass({
    getInitialState() {
        return {
            popup:{
                show :false,
                transition: 'top'
            },
        }
    },
    componentDidMount(){
        
    },
    onOpen(){
        let { popup } = this.state;
        popup.show = true;
        this.setState({
            popup
        })
    },
    onCloseAlert(){
        let { popup } = this.state;
        popup.show = false;
        this.setState({
            popup
        })
    },
    render() {
        const { popup } = this.state;
        return (
            <div>
                <button onClick = { this.onOpen }>打开弹框</button>
                <Popup isShow={popup.show} transition={popup.transition} onPopupClose={this.onCloseAlert}>
                    <div className='popup-title'>修改绑定手机</div>
                    <div className='popup-content'>
                        弹框内容
                    </div>
                    <div className='popup-footer'>
                        <a></a>
                        <a></a>
                    </div>
                </Popup>
            </div>
        )
    }
})

render((
  <Index />
), document.getElementById('app'))