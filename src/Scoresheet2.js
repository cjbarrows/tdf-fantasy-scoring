/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Scoresheet.css';

const Stage = ({ index }) => (
  <p>Stage<span>{index + 1}</span></p>
);

class Scoresheet2 extends Component {
  render() {
    const {
      allTeams, data, data: { byStage },
    } = this.props;

    console.log(byStage.length);

    return data ? (
      <div>
        {byStage.map((stage, index) => (
          <Stage
            data={stage}
            index={index}
          />))}
      </div>
    ) : null;
  }
}

Scoresheet2.propTypes = {
  allTeams: PropTypes.shape,
  data: PropTypes.shape,
};

export default Scoresheet2;
