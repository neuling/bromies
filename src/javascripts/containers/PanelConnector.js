import React from 'react';
import Panel from 'Panel';

export default class PanelConnector extends React.Component {
  constructor() {
    super();

    chrome.storage.onChanged.addListener(({ panel }) => {
      this.setState({ ...panel.newValue });
    });

    chrome.storage.local.get(({ panel }) => {
      this.setState({ ...panel });
    });
  }

  state = {}

  render() {
    return (
      <Panel {...this.state} />
    );
  }
}
