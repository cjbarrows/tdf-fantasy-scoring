/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
/* eslint react/prop-types: 0 */
/* eslint max-len: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

const Rider = ({ rider }) => (
  <p>Rider <span>{rider.name}</span></p>
);

const Team = ({ stage, data, riderData }) => (
  <div>
    <p>Team {data.name}</p>
    {riderData && riderData[stage] && riderData[stage].riders ? riderData[stage].riders.map(rider => (
      <Rider
        rider={rider}
      />
    )) : null}
  </div>
);

const Stage = ({ number }) => (
  <div>
    <p>Stage {number + 1}</p>
  </div>
)

class Scoresheet2 extends Component {
  render() {
    const {
      allTeams, data, data: { stages },
    } = this.props;

    return data ? (
      <div>
        {stages.map((stage, index) => (
          <Stage
            number={index}
            stageData={stage}
          />))}
      </div>
    ) : null;
  }
}

Scoresheet2.propTypes = {
};

export default Scoresheet2;
