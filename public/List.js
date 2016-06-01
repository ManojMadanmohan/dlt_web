 var List = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function() {
    var path = this.props.url;
    var ref = new Firebase(path);
    console.log(path);
    this.bindAsArray(ref, "items");
    },

    getInitialState: function() {
    return {items: [] };
    },

    render: function() {
    {console.log(this.state.items.length);}
    var rows = [];
    for(var i in this.state.items)
    {
      rows.push(<Hello name={this.state.items[i].deep_link}/>);
    }
    return <div>{rows}</div>;
    }
    })