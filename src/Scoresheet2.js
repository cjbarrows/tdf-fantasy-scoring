/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
/* eslint react/prop-types: 0 */
/* eslint max-len: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

const Rider = ({ name }) => (
  <p>{name}</p>
);

const Team = ({ name, totalPointsOnStage, riders }) => (
  <div>
    <p>{name}</p>
    {riders.map(({ name: riderName }) => (
      <Rider
        name={riderName}
      />
    ))}
    <p>Total: {totalPointsOnStage}</p>
  </div>
);

const Stage = ({ number, stageData }) => (
  <div>
    <p>Stage {number + 1}</p>
    {Object.entries(stageData).map(([name, { totalPointsOnStage, riders }]) => (
      <Team
        name={name}
        totalPointsOnStage={totalPointsOnStage}
        riders={riders}
      />
    ))}
  </div>
);

class Scoresheet2 extends Component {
  render() {
    const {
      data, data: { stages },
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
