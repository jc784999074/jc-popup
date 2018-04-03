var React = require('react');
import './index.less';

const Popup = React.createClass({
	displayName: 'Popup',
	propTypes: {
		children: React.PropTypes.node, //内容
		transition: React.PropTypes.string, //从那边出来
		isShow:	React.PropTypes.bool, //控制
		shadow:	React.PropTypes.bool,  //阴影
		shadowClose: React.PropTypes.bool, //点击阴影关闭
		onPopupClose: React.PropTypes.func,  //关闭事件回调
		closeBtn: React.PropTypes.bool,  //显示关闭按钮
	},
	getDefaultProps () {
		return {
			shadow:true,
			shadowClose:true,
		};
	},
	getInitialState() {
    	return {
			style:""
		}
	},
	componentDidMount(){
		//fade  
	},
	componentWillUpdate(){
	},
	componentDidUpdate(){
	},
	componentWillReceiveProps(nextProps) {
		this.state.close=false;
    },
	onClose(){
		var _self=this;
		_self.setState({
			close:true
		})
		_self.props.onPopupClose&&_self.props.onPopupClose();
	},
	render () {
		let transition=this.props.transition||'top';//默认值
		let style;
		if(this.state.close==true){
			style='transform .0001s linear .3s';
		}else{
			if(this.props.isShow==true){
				style='';
			}else{
				style='transform .0001s linear .3s';
			}
		}
		return (
			<div className={this.props.isShow?"active jc-popup":"jc-popup"} style={{transition:style}}>
				<div className={transition}>
					<div className="popup-content">{this.props.children}</div>
					{this.props.closeBtn?<div className='btn-close'  onClick={this.onClose}>x</div>:null}
				</div>
				{this.props.shadow?this.props.shadowClose&&this.props.shadowClose==true?
				<div className='shadow' onClick={this.onClose}></div>:
				<div className='shadow'></div>:
				<div className='shadow' style={{background:'transparent'}}></div>}
			</div>
		);
	}
});

export default Popup;