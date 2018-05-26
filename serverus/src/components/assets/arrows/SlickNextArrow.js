import React from 'react';
import reactStyles from './react-slick.css';

const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        props.noArrow ? null : <button className={className} onClick={onClick} />
    )
}

export default SlickNextArrow;