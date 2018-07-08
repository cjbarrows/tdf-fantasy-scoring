import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getRider = (team, index) => team.riders[index];

const findRiderPosition = (results, name, category) => {
  const data = results.results.data[category];
  const f = data.find((finisher) => {
    const fullName = `${finisher.FirstName} ${finisher.LastName}`.toLowerCase();
    if (fullName === name.toLowerCase()) return true;
    const firstLastName = finisher.LastName.split(' ')[0];
    const fullNameMinusOne = `${finisher.FirstName} ${firstLastName}`.toLowerCase();
    return fullNameMinusOne === name.toLowerCase();
  });

  return f ? f.Position : undefined;
};

const getTotalStagePointsForTeam = (team, results) => {
  team.riders.map(rider => parseInt(findRiderPosition(results, rider, 'General'), 10));
  return 0;
};

// eslint-disable-next-line
class Scoring extends Component {
  render = () => {
    const { allTeams, stageResults, stage } = this.props;

    let total;
    if (stageResults) {
      total = getTotalStagePointsForTeam(allTeams[0], stageResults);
    }

    return stageResults ? (
      <div>
        <h1>
          Scoring for Stage
          <span>
            {stage}
          </span>
        </h1>
        <table>
          <thead>
            <tr>
              {allTeams.map((team, index) => (
                <th key={index}>
                  {team.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((x, i) => (
              <tr>
                {allTeams.map(team => (
                  <td>
                    <span>
                      {getRider(team, i)}
                    </span>
                    <span>
15
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                Total
                {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    ) : null;
  };
}

Scoring.propTypes = {
  stageResults: PropTypes.shape(),
  allTeams: PropTypes.arrayOf(PropTypes.shape()),
  stage: PropTypes.number,
};

export default Scoring;
