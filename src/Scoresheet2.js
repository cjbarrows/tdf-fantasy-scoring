import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

class Scoresheet2 extends Component {
  render() {
    const {
      allTeams, data, data: { byStage },
    } = this.props;

    return data ? (
      <div>
        <p>
          {byStage.map(({ stage }) => (
            <p>
              Stage
              {stage}
            </p>
          ))}
        </p>
      </div>
    ) : null;
  }
}

Scoresheet2.propTypes = {
  allTeams: PropTypes.shape,
  data: PropTypes.shape,
};

export default Scoresheet2;
