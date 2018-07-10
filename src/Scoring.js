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

const getOverallGeneralPointsForRider = (stage, rider, results) => {
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

const getOverallPointsPointsForRider = (stage, rider, results) => {
  const pos =
    parseInt(findRiderPosition(stage, results, rider, "Sprint"), 10) - 1;
  const points = [
    10,
    6,
    4,
    3,
    2,
    1,
  ];
  return pos < points.length ? points[pos] : 0;
};

const getOverallMountainPointsForRider = (stage, rider, results) => {
  const pos =
    parseInt(findRiderPosition(stage, results, rider, "Mountain"), 10) - 1;
  const points = [
    10,
    6,
    4,
    3,
    2,
    1,
  ];
  return pos < points.length ? points[pos] : 0;
};

const ScoreCell = (props) => (
  <div className="score-cell"><p className="rider">{props.rider}</p>
    <p className="scores">{props.scores.join('+')}</p></div>
)

// eslint-disable-next-line
class Scoring extends Component {
  render = () => {
    const { allTeams, stageResults, overallResults, stage } = this.props;
    const numRiders = allTeams[0].riders.length;

    const totals = {};
    for (let i = 0; i < allTeams.length; i++) {
      totals[i] = { stage: 0, overall: 0 };
    }

    return stageResults && overallResults ? (
      [1, 2].map((stage, index) => (
        <div>
          <h2>
            Scoring for Stage<span className="points">{stage}</span>
          </h2>
          <div className="score-container">
            {allTeams.map((team, teamIndex) => {
              totals[teamIndex].stage = 0;
              return (
                <div className="team-container" key={index}>
                  <p className="team-name">{team.name}</p>
                  {team.riders.map((rider, index) => {
                    const scores = [
                      getStageResultPointsForRider(
                        stage,
                        rider,
                        stageResults
                      ),
                      getOverallGeneralPointsForRider(
                        stage,
                        rider,
                        overallResults
                      ),
                      getOverallPointsPointsForRider(
                        stage,
                        rider,
                        overallResults
                      ),
                      getOverallMountainPointsForRider(
                        stage,
                        rider,
                        overallResults
                      )
                    ];

                    const riderScore = scores.reduce((a, b) => a + b);
                    totals[teamIndex].stage += riderScore;
                    totals[teamIndex].overall += riderScore;

                    return (
                      <ScoreCell
                        rider={rider}
                        scores={scores}>
                      </ScoreCell>
                    );
                  })}
                  <p className="team-total">Total: {totals[teamIndex].stage}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))) : null;
  }
}

Scoring.propTypes = {
  stageResults: PropTypes.shape(),
  allTeams: PropTypes.arrayOf(PropTypes.shape()),
  stage: PropTypes.number
};

export default Scoring;
