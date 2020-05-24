import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './UIButton.scss';

export default class UIButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      mouseEnter: false,
    };

    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e) {
    const { onMouseDown, value, disable } = this.props;

    this.setState({
      mouseDown: true,
    });
    if (disable) return;

    window.addEventListener('mouseup', this.handleMouseUp);

    if (onMouseDown) {
      onMouseDown({
        event: e,
        value,
      });
    }
  }

  handleMouseUp(e) {
    const { onMouseUp, value, disable } = this.props;

    this.setState({
      mouseDown: false,
    });
    if (disable) return;

    window.removeEventListener('mouseup', this.handleMouseUp);

    if (onMouseUp) {
      onMouseUp({
        event: e,
        value,
      });
    }
  }

  handleClick(e) {
    const { onClick, value, disable } = this.props;
    if (disable) return;

    if (onClick) {
      onClick({
        event: e,
        value,
      });
    }
  }

  handleMouseEnter(e) {
    const { onMouseEnter, value, disable } = this.props;

    this.setState({
      mouseEnter: true,
    });
    if (disable) return;

    if (onMouseEnter) {
      onMouseEnter({
        event: e,
        value,
      });
    }
  }

  handleMouseLeave(e) {
    const { onMouseLeave, value, disable } = this.props;
    this.setState({
      mouseEnter: false,
    });
    if (disable) return;

    if (onMouseLeave) {
      onMouseLeave({
        event: e,
        value,
      });
    }
  }

  handleContextMenu(e) {
    const { onContextMenu, value, disable } = this.props;
    if (disable) return;
    if (onContextMenu) {
      onContextMenu({
        event: e,
        value,
      });
    }
  }

  render() {
    const { mouseDown, mouseEnter } = this.state;
    const {
      className: propClassName,
      children,
      disable,
      used,
    } = this.props;

    const stateList = [];
    if (disable) stateList.push('disable');
    if (mouseDown) stateList.push('mouse-down');
    if (mouseEnter) stateList.push('mouse-enter');
    if (used) stateList.push('used');
    const className = ['button', propClassName].concat(stateList.map((state) => `button--${state}`)).join(' ');
    return (
      <div
        className={className}
        onClick={(e) => { this.handleClick(e); }}
        onMouseDown={(e) => { this.handleMouseDown(e); }}
        onMouseUp={(e) => { this.handleMouseUp(e); }}
        onMouseEnter={(e) => { this.handleMouseEnter(e); }}
        onMouseLeave={(e) => { this.handleMouseLeave(e); }}
        onContextMenu={(e) => { this.handleContextMenu(e); }}
      >
        {children}
      </div>
    );
  }
}

UIButton.propTypes = {
  className: PropTypes.string,
  disable: PropTypes.bool,
  used: PropTypes.bool,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
};

UIButton.defaultProps = {
  className: '',
  disable: false,
  used: false,
  value: '',
  children: '',
  onClick: null,
  onMouseDown: null,
  onMouseUp: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onContextMenu: null,
};
