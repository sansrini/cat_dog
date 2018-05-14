var React = require("react");

var headerStyle = {
    textAlign: 'center',
    fontSize: '2em',
    color: 'rebeccapurple'
};

var Header = function() {
    return (
        <h1 style={headerStyle}>
            Welcome to Cat and Dog Cuteness Fight Game!!!
        </h1>
    );
};

module.exports = Header;