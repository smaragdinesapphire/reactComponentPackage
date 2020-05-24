import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class UIModal extends PureComponent {
  constructor(props) {
    super(props);
    this.pvtEl = document.createElement('div');
  }

  componentDidMount() {
    const { renderNode } = this.props;
    renderNode.appendChild(this.pvtEl);
  }

  componentWillUnmount() {
    const { renderNode } = this.props;
    renderNode.removeChild(this.pvtEl);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      children,
      this.pvtEl,
    );
  }
}
UIModal.propTypes = {
  children: PropTypes.node,
  renderNode: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ])).isRequired,
};
UIModal.defaultProps = {
  children: null,
};
