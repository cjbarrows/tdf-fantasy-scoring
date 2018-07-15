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

const Stage = ({ data, index, byTeam }) => (
  <div>
    <p>Stage <span>{index + 1}</span></p>
    {byTeam.map(team => (
      <Team
        stage={index}
        data={team}
        riderData={data}
      />
    ))}
  </div>
);

class Scoresheet2 extends Component {
  render() {
    const {
      allTeams, data, data: { byStage, byTeam },
    } = this.props;

    return data ? (
      <div>
        {byStage.map((stage, index) => (
          <Stage
            data={stage}
            byTeam={byTeam}
            index={index}
          />))}
      </div>
    ) : null;
  }
}

Scoresheet2.propTypes = {
};

export default Scoresheet2;
