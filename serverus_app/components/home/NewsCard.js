import React from 'react';

const NewsCard = (props) => {
    return(
        <div>
            <h4 className='card-title'>{props.value.title}</h4>
            Published on {props.value.date}
            <div>
                Content
            </div>
            <div>
                <h6>tags here.</h6>
            </div>
        </div>
    );
};

//TODO Define the CSS.

export default NewsCard;