import React from 'react';
import ReactMarkdown from 'react-markdown';
import Markmirror from 'react-markmirror';

const Editor = (props) => {

    const handleType = text => {
        props.onChange(text);
    };

    //available themes: https://codemirror.net/demo/theme.html
    //<textarea rows="15" cols="40" onChange={onInputChange}
    
            return (
            <form>
            <Markmirror
                value = {props.value}
                onChange = {handleType}
                theme="dracula"/>
            
            </form>
        );
};

export default class MarkdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '# hello'
        };
        this.onInputChange = this.onInputChange.bind(this);
    }


    onInputChange(md) {
        this.setState({
            value: md
        });
    }

    render(){
        return (
            <div className="row" >
                <div className="col-lg-6" style={markdownStyle.md}><Editor  onChange={this.onInputChange} value = {this.state.value}/></div>
                <div className="col-lg-6" style={markdownStyle.md}><ReactMarkdown source={this.state.value}/>            
                </div>
            </div>
        );
    }
}

var markdownStyle = {
    editor: {
    },
    md: {
        display: 'inline-block'
    }
}