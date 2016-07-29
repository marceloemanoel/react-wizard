import React, { PropTypes, Children } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Step from './Step';
import StepList from './StepList';

class Wizard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentStep: 0
    };

    this.hidden = { display: "none" };
    this.visible = { display: "block" };

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }

  selectStep(stepNumber) {
    this.setState(Object.assign({}, this.state, { currentStep: Number(stepNumber - 1) }));
  }

  nextStep() {
    const currentStep = this.state.currentStep;

    this.setState(Object.assign({}, this.state, { currentStep: currentStep + 1 }));
  }

  previousStep() {
    const currentStep = this.state.currentStep;

    this.setState(Object.assign({}, this.state, { currentStep: currentStep - 1 }));
  }

  renderActions(children) {
    const previousDisabled = (this.state.currentStep == 0);
    const nextHidden = (this.state.currentStep == children.length - 1);
    const finishHidden = (this.state.currentStep < children.length - 1);

    const previous = (previousDisabled ? null :
      <li><a role="menuitem" onClick={this.previousStep}>{this.props.previousLabel}</a></li>
    );

    const next = (nextHidden ? null :
      <li><a role="menuitem" onClick={this.nextStep}>{this.props.nextLabel}</a></li>
    );

    const finish = (finishHidden ? null :
      <li><a role="menuitem" onClick={this.props.onFinish}>{this.props.finishLabel}</a></li>
    );

    return (
      <ul role="menu" aria-label="Pagination">
        {previous}
        {next}
        {finish}
      </ul>
    );
  }

  render() {
    const children = Children.toArray(this.props.children);
    const currentStep = children[this.state.currentStep];

    return (
      <div className="wizard clearfix">
          <StepList
            steps={children}
            currentStep={this.state.currentStep}
            onSelect={this.selectStep}/>

          <ReactCSSTransitionGroup
            component="div"
            className="content clearfix"
            transitionName={`rag-${this.props.transitionEffect}`}
            transitionEnterTimeout={this.props.transitionEnterTimeout}
            transitionLeaveTimeout={this.props.transitionLeaveTimeout}>
            {currentStep}
          </ReactCSSTransitionGroup>

          <div className="actions clearfix">{this.renderActions(children)}</div>
      </div>
    );
  }
}

Wizard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,

  //Animation properties
  transitionEffect: PropTypes.oneOf([
    "fadeIn",
    "fadeInUp",
    "fadeInDown",
    "fadeInRight",
    "fadeInLeft",
    "fadeInUpBig",
    "fadeInDownBig",
    "fadeInRightBig",
    "fadeInLeftBig",
    "zoomBackDown"
  ]),
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,

  //I18N Properties
  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  finishLabel: PropTypes.string,

  onFinish: PropTypes.func
};

Wizard.defaultProps = {
  transitionEffect: "fadeIn",
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500,

  previousLabel: "Previous",
  nextLabel: "Next",
  finishLabel: "Finish",

  onFinish: () => {}
};

export default Wizard;
