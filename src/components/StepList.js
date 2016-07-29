import React, { PropTypes } from 'react';
import StepListItem from './StepListItem';

class StepList extends React.Component {

  render() {
    const steps = this.props.steps;

    return (
      <div className="steps clearfix">
        <ul role="tablist">
          {
            steps.map((step, index) => {
              const isSelected = (index == this.props.currentStep);
              const isDisabled = !isSelected && (index < steps.length);

              return (
                <StepListItem step={index + 1}
                              visible={isSelected || index > this.props.currentStep}
                              first={index == 0}
                              last={index == steps.length}
                              selected={isSelected}
                              disabled={isDisabled}
                              key={index}
                              onSelect={this.props.onSelect}
                              name={step.props.name} />
              );
            })
          }
        </ul>
      </div>
    );
  }
}

StepList.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default StepList;
