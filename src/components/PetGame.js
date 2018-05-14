var React = require("react");
var axios = require('axios');
var PetComponent = require('./PetComponent');
var constants = require('../constants');

var btnStyle = {
    marginTop: '30px',
    marginRight: '5px',
    height: '25px'
};

var CAT = constants.CAT;
var DOG = constants.DOG;
var API_KEY = constants.API_KEY;
var WINNER = constants.WINNER;
var LOSER = constants.LOSER;
var TIE = constants.TIE;
var CUTE = constants.CUTE;

var CAT_URL = 'http://localhost:63000/cat/?api_key=' + API_KEY;
var DOG_URL = 'http://localhost:63000/dog/?api_key=' + API_KEY;

class PetGame extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cat: { result: '', imageUrl:''},
            dog: { result: '', imageUrl:''},
            gameOver: false
        };
        this.catLikesCount = 0;
        this.dogLikesCount = 0;

        this.handleLikeBtnClick = this.handleLikeBtnClick.bind(this);
        this.handleDislikeBtnClick = this.handleDislikeBtnClick.bind(this);

        this.handleShowWinnerBtnClick = this.handleShowWinnerBtnClick.bind(this);
        this.handleStartOverBtnClick = this.handleStartOverBtnClick.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages() {
        this.fetchPetImage(CAT_URL, CAT);
        this.fetchPetImage(DOG_URL, DOG);
    }

    fetchPetImage(PET_URL, petName) {
        petName = petName.toLowerCase();
        axios.get(PET_URL).then((resp) => {
            this.setState((prevState) => {
                var state = {};
                state[petName] = {
                    result: prevState[petName].result,
                    imageUrl: resp.data.imageUrl
                };
                return state;
            });
        });
    }

    handleShowWinnerBtnClick() {
        var catLikesCount = this.catLikesCount;
        var dogLikesCount = this.dogLikesCount;

        var catResult = TIE;
        var dogResult = TIE;

        if( catLikesCount > dogLikesCount ) {
            catResult = WINNER;
            dogResult = LOSER;

        } else if ( catLikesCount < dogLikesCount ) {
            catResult = LOSER;
            dogResult = WINNER;
        }

        this.setState(function(prevState){
            return {
                cat: {
                    result: catResult,
                    imageUrl: prevState.cat.imageUrl
                },
                dog: {
                    result: dogResult,
                    imageUrl: prevState.dog.imageUrl
                },
                gameOver: true
            }
        });
    }
    handleStartOverBtnClick() {
        this.fetchImages();

        this.catLikesCount = 0;
        this.dogLikesCount = 0;

        this.setState(function(prevState){
            return {
                cat: { result: '', imageUrl: prevState.cat.imageUrl},
                dog: { result: '', imageUrl: prevState.dog.imageUrl},
                gameOver: false
            }
        });

    }


    handleLikeBtnClick(event) {
        this.handleLikeDislikeBtnClicks(event.target.value, 1);
    }

    handleDislikeBtnClick(event) {
        this.handleLikeDislikeBtnClicks(event.target.value, -1);
    }

    handleLikeDislikeBtnClicks(petName, operation) {
        this.fetchImages();

        if( petName === CAT) {
            this.catLikesCount += operation;

        } else if ( petName === DOG) {
            this.dogLikesCount += operation;
        }
    }

    render() {
        return (
            <div>

                <div style={{marginTop: 60, textAlign: 'center'}}>
                    <PetComponent
                        petName={CAT}
                        likesCount={this.catLikesCount}
                        petImageUrl={this.state.cat.imageUrl}
                        result={this.state.cat.result}
                        gameOver={this.state.gameOver}
                        onLikeBtnClick={this.handleLikeBtnClick}
                        onDislikeBtnClick={this.handleDislikeBtnClick}
                    />
                    <PetComponent
                        petName={DOG}
                        likesCount={this.dogLikesCount}
                        petImageUrl={this.state.dog.imageUrl}
                        result={this.state.dog.result}
                        gameOver={this.state.gameOver}
                        onLikeBtnClick={this.handleLikeBtnClick}
                        onDislikeBtnClick={this.handleDislikeBtnClick}
                    />
                </div>
                <div style={{textAlign: 'center'}}>
                    {!this.state.gameOver && <button style={btnStyle} onClick={this.handleShowWinnerBtnClick}>Show Winner</button>}
                    <button style={btnStyle} onClick={this.handleStartOverBtnClick}>Start Over</button>
                </div>
            </div>
        );
    }
};

module.exports = PetGame;