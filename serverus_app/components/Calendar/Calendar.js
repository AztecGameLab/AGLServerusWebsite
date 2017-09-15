import React from 'react';

//Randomly displays games submitted from the past 30 days.
const Calendar = (props) => {
    return (
        <div className="container-fluid">
            <br /><br /><br />
            <iframe className="timelineCalendar" src="https://calendar.google.com/calendar/embed?title=Aztec%20Game%20Lab%20Schedule&amp;showNav=0&amp;showTabs=0&amp;height=500&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=aztecgamelabweb%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles"
            style={{ borderWidth: 0 }} width="100%" height="500" frameBorder="0" scrolling="no"></iframe>
        </div>
    );
}
export default Calendar;