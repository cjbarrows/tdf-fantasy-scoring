/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
/* eslint react/prop-types: 0 */
/* eslint max-len: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

// eslint-disable-next-line
const Score = ({ points, type }) => {
  return (points > 0) ? (
    <span className={`mini-points ${type}`}>{points}</span>
  ) : null;
};

const Rider = ({ name, scores }) => (
  <div>
    <p>{name}</p>
    {scores.map(({ points, name: type }) => (
      <Score
        points={points}
        type={type}
      />
    ))}
  </div>
);

const Team = ({ name, totalPointsOnStage, riders }) => (
  <div className="team-container">
    <p className="team-name">{name}</p>
    {riders.map(({ name: riderName, scores }) => (
      <Rider
        name={riderName}
        scores={scores}
      />
    ))}
    <p className="team-total">Total: {totalPointsOnStage}</p>
  </div>
);

const Stage = ({ number, stageData }) => (
  <div>
    <p className="stage-name">Stage {number + 1}</p>
    <div className="score-container">
      {Object.entries(stageData).map(([name, { totalPointsOnStage, riders }]) => (
        <Team
          name={name}
          riders={riders}
          totalPointsOnStage={totalPointsOnStage}
        />
      ))}
    </div>
  </div>
);

const Totals = ({ totals }) => {
  return (
    <div className="score-container">
      {totals.map(total => (
        <p className="total-score">{total}</p>
      ))}
    </div>
  );
};
class Scoresheet2 extends Component {
  render() {
    const {
      data, data: { stages }, data: { totals }
    } = this.props;

    return data ? (
      <div>
        {stages.map((stage, index) => (
          <Stage
            number={index}
            stageData={stage}
          />))}
        <Totals
          totals={totals}
        />
      </div>
    ) : null;
  }
}

Scoresheet2.propTypes = {
};

export default Scoresheet2;
