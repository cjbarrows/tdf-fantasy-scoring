import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Scoresheet2 from './Scoresheet2';

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

class ScoringManager extends Component {
  processData({ stageResults, overallResults, allTeams }) {
    const data = { stages: [], totals: [] };

    // data:
    //   stages:
    //     1:
    //       team: name, total points
    //       rider: name, points
    //   totals: [score1, score2, score3, score4]

    // eslint-disable-next-line
    const numStages =
      stageResults && Object.keys(stageResults) ? Object.keys(stageResults).length : 0;

    for (let stageIndex = 0; stageIndex < numStages; stageIndex += 1) {
      data.stages[stageIndex] = {};
      for (let teamIndex = 0; teamIndex < allTeams.length; teamIndex += 1) {
        const team = allTeams[teamIndex];
        const teamName = team.name;
        data.stages[stageIndex][teamName] = { totalPointsOnStage: 0, riders: [] };
        if (data.totals[teamIndex] === undefined) data.totals[teamIndex] = 0;
        for (let riderIndex = 0; riderIndex < team.riders.length; riderIndex += 1) {
          const rider = team.riders[riderIndex];
          const scores = [
            { name: 'Stage', points: getStageResultPointsForRider(stageIndex, rider, stageResults) },
            { name: 'GC', points: getOverallGeneralPointsForRider(stageIndex, rider, overallResults) },
            { name: 'Points', points: getOverallPointsPointsForRider(stageIndex, rider, overallResults) },
            { name: 'Mtn', points: getOverallMountainPointsForRider(stageIndex, rider, overallResults) },
          ];
          const riderScore = scores.reduce((sum, { points }) => sum + points, 0);
          data.stages[stageIndex][teamName].totalPointsOnStage += riderScore;
          data.stages[stageIndex][teamName].riders.push({ name: rider, scores });
          data.totals[teamIndex] += riderScore;
        }
      }
    }
    this.data = data;
  }

  render() {
    const { stageResults, overallResults, allTeams } = this.props;

    if (stageResults && overallResults && allTeams) {
      this.processData(this.props);
    }

    return stageResults && overallResults && allTeams ? (
      <Scoresheet2
        allTeams={allTeams}
        data={this.data}
      />
    ) : null;
  }
}

ScoringManager.propTypes = {
  stageResults: PropTypes.shape(),
  allTeams: PropTypes.arrayOf(PropTypes.shape()),
  overallResults: PropTypes.shape(),
};

export default ScoringManager;
