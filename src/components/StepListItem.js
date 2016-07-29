import React, { PropTypes } from 'react';

class StepListItem extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.hidden = { display: "none" };
    this.visible = { display: "block" };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    this.props.onSelect(this.props.step);
  }

  render() {
    const className = `${(this.props.first ? "first " : "")}${(this.props.last ? "last " : "")}${(this.props.disabled ? "disabled " : "")}${(this.props.selected ? "current" : "")}`.trim();
    const visibility = (this.props.visible ? this.visible : this.hidden );

    return (
      <li role="tab" className={className} aria-disabled={this.props.disabled} aria-selected={this.props.selected} style={visibility} >
        <a onClick={this.onSelect}>
          <span className="current-info audible">current step:</span>
          <span className="number">{this.props.step}.</span> {this.props.name}
        </a>
      </li>
    );
  }
}

StepListItem.propTypes = {
  step: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default StepListItem;
