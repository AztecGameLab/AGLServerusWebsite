import React from 'react';

const MarkdownCard = (props) => {
        return (
            <div className="card" style= {blogCard.root}>
                <div className="card-block">
                <h4 class="card-title">{props.value.title}</h4>
                <p class="card-text">{props.value.text}</p>
                <a href="#" class="btn btn-primary">Edit Me</a>
                </div>
          </div>
        );
};

var blogCard= {
    root: {
        width: "20rem"
    },
};

export default MarkdownCard;