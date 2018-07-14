import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

class Scoresheet2 extends Component {
  render() {
    const {
      allTeams, data,
    } = this.props;

    return data ? (
      <div>
        <p>
          {data[0][0].riders[0].name}
          {data[0][0].riders[0].scores.map(score => (
            <p>
              {score.name}
              {score.points}
            </p>
          ))}
        </p>
      </div>
    ) : null;
  }
}

export default Scoresheet2;
