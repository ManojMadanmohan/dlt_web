
    var path = window.location.pathname;
         var USER_ID = path.substring(1, path.length);
         console.log("uid = "+USER_ID);
         alert("uid got = "+USER_ID);

var Entry = React.createClass({
    render: function() {
    return <div className="entryRoot" onClick={() => updateInput(this.props.link)}>
     <span className="black">{initialNonMatchingInput(currentInput, this.props.link)}</span>
     <span className="blue">{matchingInput(currentInput, this.props.link)}</span>
     <span className="black">{lastNonMatchingInput(currentInput, this.props.link)}</span>
     <div className="image_div" onClick={(e)=> handleRemoveClick(e, this.props.linkKey)} > <img className="image"  src={"images/cancel.png"} alt="remove" title="remove"/></div>
     </div>
    }
    });

    //boolean to track data loaded
    var loaded = false;

    //List
    var List = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function() {
    var path = this.props.url;
    var ref = new Firebase(path);
    ref.on("value", function(snapshot) {
    loaded = true;
    });
    console.log(path);
    this.bindAsArray(ref, "items");
    ref.on("value", function(snapshot) {
    loaded = true;
    reactDom.forceUpdate();
    });
    },

    getInitialState: function() {
    return {items: [] };
    },

    render: function() {
    {console.log(this.state.items.length);}
    var rows = [];
    if(this.state.items.length == 0)
    {
      if(loaded)
      {
      rows.push(<div className="historyEmpty"> No deep links in history </div>);
      } else
      {
      rows.push(<div className="historyEmpty"> Just a moment... </div>);
      }
      $("#container").css('opacity','0.5');
    }
    else
    {
      $("#container").css('opacity','1.0');
    for(var i in this.state.items)
    {
      var link = this.state.items[i].deep_link;
      var key = this.state.items[i][".key"];
      console.log("checking link = "+link+" against input = "+currentInput);
      if(link.toLowerCase().indexOf(currentInput.toLowerCase()) != -1)
      {
      rows.push(<Entry linkKey={key} link={link}/>);
      console.log("passed");
      }
    }
    }
    console.log("size = "+rows.length);
    return <div>{rows}</div>;
    }
    })

    var mainList = <List url= {getHistoryPath(USER_ID)}/>;