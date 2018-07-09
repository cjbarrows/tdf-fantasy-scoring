import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Scoring.css";

const getRider = (team, index) => team.riders[index];

const findRiderPosition = (stage, results, name, category) => {
  if (!(results && results[stage] && results[stage][category]))
    return undefined;

  const data = results[stage][category];
  const f = data.find(finisher => {
    const fullName = `${finisher.FirstName} ${finisher.LastName}`.toLowerCase();
    if (fullName === name.toLowerCase()) return true;
    const firstLastName = finisher.LastName.split(" ")[0];
    const fullNameMinusOne = `${
      finisher.FirstName
      } ${firstLastName}`.toLowerCase();
    return fullNameMinusOne === name.toLowerCase();
  });

  return f ? f.Position : undefined;
};

const getStageResultPointsForRider = (stage, rider, results) => {
  const pos =
    parseInt(findRiderPosition(stage, results, rider, "General"), 10) - 1;
  const points = [
    200,
    150,
    120,
    100,
    80,
    70,
    60,
    50,
    40,
    30,
    25,
    20,
    15,
    10,
    5
  ];
  return pos < points.length ? points[pos] : 0;
};

const getOverallResultPointsForRider = (stage, rider, results) => {
  const pos =
    parseInt(findRiderPosition(stage, results, rider, "General"), 10) - 1;
  const points = [
    25,
    22,
    20,
    18,
    16,
    15,
    14,
    13,
    12,
    11,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ];
  return pos < points.length ? points[pos] : 0;
};

const getTotalStagePointsForTeam = (stage, team, stageResults, overallResults) => {
  const scores = team.riders.map(rider =>
    parseInt(getStageResultPointsForRider(stage, rider, stageResults), 10) +
    parseInt(getOverallResultPointsForRider(stage, rider, overallResults), 10)
  );
  return scores.reduce((total, val) => total + val);
};

// eslint-disable-next-line
class Scoring extends Component {
  render = () => {
    const { allTeams, stageResults, overallResults, stage } = this.props;
    const numRiders = allTeams[0].riders.length;

    return stageResults && overallResults ? (
      <div>
        <h1>
          Scoring for Stage
          <span className="points">{stage}</span>
        </h1>
        <table>
          <thead>
            <tr>
              {allTeams.map((team, index) => <th key={index}>{team.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {[...Array(numRiders)].map((x, i) => (
              <tr>
                {allTeams.map(team => (
                  <td>
                    <span>{getRider(team, i)}</span>
                    <span className="points">
                      {getStageResultPointsForRider(
                        stage,
                        getRider(team, i),
                        stageResults
                      )}+
                      {getOverallResultPointsForRider(
                        stage,
                        getRider(team, i),
                        overallResults
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {allTeams.map(team => (
                <td>
                  Total
                  <span className="points">
                    {getTotalStagePointsForTeam(stage, team, stageResults, overallResults)}
                  </span>
                </td>
              ))}
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
  stage: PropTypes.number
};

export default Scoring;
