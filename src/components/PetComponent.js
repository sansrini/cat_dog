var React = require("react");
var constants = require('../constants');

var compStyle = {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto'
};

var btnStyle = {
    height: '25px',
    width: '70px',
    marginTop: '10px',
    marginLeft: '5px',
    marginRight: '5px'
};

class PetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.resultStyle = {visibility: 'hidden'};
    }

    getResultStyle() {
        if( this.props.result === constants.WINNER || this.props.result === constants.TIE) {
            this.resultStyle = {color: 'green'};
        } else {
            this.resultStyle = {color: 'red'};
        }
        return this.resultStyle;
    }

    render(){
        return (
            <div style={compStyle}>
                <h2 style={this.getResultStyle()}>{this.props.result}</h2>
                {(!this.props.gameOver) ?
                    (<h3>{this.props.petName} </h3>) :
                    (<h3>{this.props.petName} Likes: {this.props.likesCount}</h3>)
                }
                <img src={this.props.petImageUrl}
                     alt={"Cute " + this.props.petName}
                     style={{height: 400, width: 400}}/>
                <br/>
                <button style={btnStyle} value={this.props.petName} disabled={this.props.gameOver} onClick={this.props.onLikeBtnClick.bind(this)}>Like</button>
                <button style={btnStyle} value={this.props.petName} disabled={this.props.gameOver} onClick={this.props.onDislikeBtnClick.bind(this)}>Dislike</button>
            </div>
        );
    };
}

module.exports = PetComponent;