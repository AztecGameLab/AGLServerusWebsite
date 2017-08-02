import React from 'react';
import ReactMarkdown from 'react-markdown';

const Editor = props => {
    const onInputChange = event => {
        props.onChange(event.target.value);
    };
    return (
        <form>
        <textarea rows="15" cols="40" onChange={onInputChange}/>
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
                <div className="col-lg-6" style={markdownStyle.md}><Editor  onChange={this.onInputChange}/></div>
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