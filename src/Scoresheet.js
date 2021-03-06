import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

const getRider = (team, index) => team.riders[index];

const findRiderPosition = (stageIndex, results, name, category) => {
  if (!(results && results[stageIndex] && results[stageIndex][category])) {
    return undefined;
  }

  const data = results[stageIndex][category];
  const f = data.find((finisher) => {
    const fullName = `${finisher.FirstName} ${finisher.LastName}`.toLowerCase();
    if (fullName === name.toLowerCase()) return true;
    const firstLastName = finisher.LastName.split(' ')[0];
    const fullNameMinusOne = `${finisher.FirstName} ${firstLastName}`.toLowerCase();
    return fullNameMinusOne === name.toLowerCase();
  });

  return f ? f.Position : undefined;
};

const getStageResultPointsForRider = (stageIndex, rider, results) => {
  const pos = parseInt(findRiderPosition(stageIndex, results, rider, 'General'), 10) - 1;
  const points = [200, 150, 120, 100, 80, 70, 60, 50, 40, 30, 25, 20, 15, 10, 5];
  return pos < points.length ? points[pos] : 0;
};

const getOverallGeneralPointsForRider = (stageIndex, rider, results) => {
  const pos = parseInt(findRiderPosition(stageIndex, results, rider, 'General'), 10) - 1;
  const points = [25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  return pos < points.length ? points[pos] : 0;
};

const getOverallPointsPointsForRider = (stageIndex, rider, results) => {
  const pos = parseInt(findRiderPosition(stageIndex, results, rider, 'Sprint'), 10) - 1;
  const points = [10, 6, 4, 3, 2, 1];
  return pos < points.length ? points[pos] : 0;
};

const getOverallMountainPointsForRider = (stageIndex, rider, results) => {
  const pos = parseInt(findRiderPosition(stageIndex, results, rider, 'Mountain'), 10) - 1;
  const points = [10, 6, 4, 3, 2, 1];
  return pos < points.length ? points[pos] : 0;
};

const listScore = ({ points, style }) => {
  if (points > 0) {
    return (
      <span className={`mini-points ${style}`}>
        {points}
      </span>
    );
  }
  return null;
};

const ScoreCell = ({ rider, scores }) => (
  <div className="score-cell">
    <p className="rider">
      {rider}
    </p>
    <p className="scores">
      {scores.map(listScore)}
    </p>
  </div>
);

class Scoresheet extends Component {
  render() {
    const {
      allTeams, stageResults, overallResults,
    } = this.props;

    const numRiders = allTeams[0].riders.length;

    const totals = {};
    for (let i = 0; i < allTeams.length; i += 1) {
      totals[i] = { stage: 0, overall: 0 };
    }

    // eslint-disable-next-line
    const numStages =
      stageResults && Object.keys(stageResults) ? Object.keys(stageResults).length : 0;

    const htmlElements = [];
    let html = null;

    if (stageResults && overallResults) {
      html = [...Array(numStages)].map((obj, stageIndex) => (
        <div key={`stage-div${stageIndex}`}>
          <h2>
            Scoring for Stage
            <span className="points">
              {stageIndex + 1}
            </span>
          </h2>
          <div className="score-container">
            {allTeams.map((team, teamIndex) => {
              totals[teamIndex].stage = 0;
              return (
                <div
                  key={`stage${stageIndex}team${teamIndex}`}
                  className="team-container"
                >
                  <p className="team-name">
                    {team.name}
                  </p>
                  {team.riders.map((rider, index) => {
                    const scores = [
                      {
                        points: getStageResultPointsForRider(stageIndex, rider, stageResults),
                        style: 'bordered yellow',
                      },
                      {
                        points: getOverallGeneralPointsForRider(stageIndex, rider, overallResults),
                        style: 'bold-yellow',
                      },
                      {
                        points: getOverallPointsPointsForRider(stageIndex, rider, overallResults),
                        style: 'bold-green',
                      },
                      {
                        points: getOverallMountainPointsForRider(stageIndex, rider, overallResults),
                        style: 'bold-red',
                      },
                    ];

                    const riderScore = scores.reduce((sum, { points }) => sum + points, 0);
                    totals[teamIndex].stage += riderScore;
                    totals[teamIndex].overall += riderScore;

                    return (
                      <ScoreCell
                        key={`cell-stage${stageIndex}team${teamIndex}rider${index}`}
                        rider={rider}
                        scores={scores}
                      />
                    );
                  })}
                  <p className="team-total">
                    Total:
                    {totals[teamIndex].stage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ));
    }

    htmlElements.push(html);

    htmlElements.push(
      <div className="score-container">
        {allTeams.map((team, teamIndex) => (
          <p className="overall-total">
            Overall:
            {totals[teamIndex].overall}
          </p>
        ))}
      </div>
    );

    return htmlElements;
  }
}

export default Scoresheet;