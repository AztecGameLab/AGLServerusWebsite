import React from 'react';
import reactStyles from './react-slick.css';

const SlickPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        props.noArrow ? null : <button className={className} onClick={onClick} />
    )
}

export default SlickPrevArrow;