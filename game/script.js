//bit.ly/s-pcs
var possibleCombitationSum = function(arr, n){
    if(arr.indexOf(n) >= 0) {return true;}
    if(arr[0] > n) {return false;}
    if(arr[arr.length - 1] > n){
        arr.pop();
        return possibleCombitationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize);
    for(var i = 1; i < combinationsCount; i++){
        var combinationSum = 0;
        for(var j = 0; j < listSize; j++){
            if(i & (1 << j)){combinationSum += arr[j];}
        }
        if(n === combinationSum) {return true;}
    }
    return false;
};

var StarsFrame - React.createClass({
    render: function(){
        var stars = [];
        for(var i = 0; i < this.props.numberOfStars; i++){
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }
        return(
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
});

var ButtonFrame = React.createClass({
    render: function(){
        var disabled, button, correct = this.props.correct;
        switch(correct){
            case true:
                button = (
                    <button className="btn btn-succes btn-lg" onClick={this.props.acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button=(
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove">
                    </button>
                );
                break;
            default:
                disabled = (this.props.selectedNumbers.length === 0);
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>
                        =
                    </buttom>
                );
        }
        
        disabled = (this.props.selectedNumbers.length === 0);
        return (
            <div id="button-frame">
                {button}
                <br /><br />
                <button className="btn btn-warning btn-xs"onClick={this.props.redraw} disabled={this.props.redraws === 0}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                {this.props.redraws}
                </button>
            </div>
        );
    }
});

var AnswerFrame = React.createClass({
    render: function(){
        var props = this.props;
        var selectedNumbers = props.selectedNumbers.map(function(i){
            return(
                <span onClick={props.unselectedNumber.bind(null, i)}>
                    {i}
                </span>
            );
        });
        return(
            <div id="answer-frame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        );
    }
});