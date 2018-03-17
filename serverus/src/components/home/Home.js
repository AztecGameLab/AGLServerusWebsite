import React, { Component } from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Helmet} from 'react-helmet';
// import { Icon } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: gray; }'}</style>
        </Helmet>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            // icon={<Icon name='heartbeat' size='huge' />}
          >
            <h3 className="vertical-timeline-element-title">Hackathon (Coming soon!)</h3>
            <h4 className="vertical-timeline-element-subtitle">Room 410</h4>
            <p>
              Come join us in our Hackathon!
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            // icon={<Icon name='heartbeat' size='huge' />}
          >
            <h3>Title</h3>
            <h4>Subtitle</h4>
            <p>
              Come join us in our Hackathon!
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    )
  }
}

export default Home;
