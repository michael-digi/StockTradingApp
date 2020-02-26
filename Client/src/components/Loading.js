import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import './css/loading.css'

const Loading = () => (
  <Segment id = 'loading'>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Segment>
)

export default Loading
