import React from 'react';
import reactStyles from '../../../styles/react-slick.css';

const SlickPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        props.noArrow ? null : <button className={className} onClick={onClick} />
    )
}

export default SlickPrevArrow;