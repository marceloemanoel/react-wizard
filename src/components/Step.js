import React, { PropTypes } from 'react';

class Step extends React.Component {
  render() {
    return (
      <div className="step">{this.props.children}</div>
    );
  }
}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]).isRequired
};

export default Step;
