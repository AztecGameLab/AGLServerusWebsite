import React from 'react';
import ReactMarkdown from 'react-markdown';
const MarkdownCard = (props) => {
        return (
            <div>
            <div style={blogCard.root}>
                <h2 className="card-title">{props.value.title}</h2>
                <h4>Created by {props.value.author}</h4>
                <h4>{props.value.date}</h4>
                <hr/>
                <ReactMarkdown className="card-text" source={props.value.text}/>
            </div>
                <button className="btn btn-info">Edit Me</button>
            </div>
        );
};

var blogCard= {
    root: {
        textAlign: 'left',
        color: 'black',
        width: '100%',
        height: '300px',
        overflowY: 'auto',
        display: 'block',
        backgroundColor: 'white',
        margin: '15px 0 15px 0',
        padding: '5px 0 15px 15px'
    }
};

export default MarkdownCard;