import React from 'react';
import ReactMarkdown from 'react-markdown';
const MarkdownCard = (props) => {
        return (
            <div className="card" style= {blogCard.root}>
                <div className="card-block">
                <h4 className="card-title">{props.value.title}</h4>
                <ReactMarkdown className="card-text" source={props.value.text}/>
                <a href="#" className="btn btn-primary">Edit Me</a>
                </div>
          </div>
        );
};

var blogCard= {
    root: {
        width: "20rem"
    }
};

export default MarkdownCard;