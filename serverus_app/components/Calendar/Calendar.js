import React from 'react';

//Randomly displays games submitted from the past 30 days.
const Calendar = (props) => {
    return (
        <div style = {{textAlign: 'center'}}>
            <br /><br /><br />
            <iframe src="https://calendar.google.com/calendar/embed?showNav=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23c0c0c0&amp;src=aztecgamelab%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles" style={{border:"solid 1px #777", width:"800", height:"600", frameborder:"0", scrolling:"no"}}></iframe>
            <br/> <br/> <br/>
        </div>
    );
}
export default Calendar;