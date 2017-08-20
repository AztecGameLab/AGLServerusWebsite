import React from 'react';
import ReactMarkdown from 'react-markdown';
const MarkdownCard = (props) => {
        return (
            <div style={blogCard.root}>
                <h4 className="card-title">{props.value.title}</h4>
                Created on {props.value.date}
                <div style={blogCard}>
                    <ReactMarkdown className="card-text" source={props.value.text}/>
                </div>
                <button className="btn btn-info">Edit Me</button>
            </div>
        );
};

var blogCard= {
    root: {
        color: 'black',
        width: '100%',
        height: '182px',
        overflowY: 'auto',
        display: 'block',
        backgroundColor: 'white',
        margin: '15px 0 15px 0',
        padding: '5px 0 15px 15px'
    }
};

export default MarkdownCard;