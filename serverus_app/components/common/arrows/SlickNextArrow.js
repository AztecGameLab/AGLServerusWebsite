import React from 'react';
import reactStyles from '../../../styles/react-slick.css';

const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        props.noArrow ? null : <button className={className} onClick={onClick} />
    )
}

export default SlickNextArrow;