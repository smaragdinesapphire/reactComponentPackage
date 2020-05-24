import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import UIModal from './UIModal';

import UIButton from './components/UI/UIButton/UIButton';

const COMPONENT_LIST = {
  UIButton,
};

const appRef = React.createRef();

/**
 * @function setRoot
 * @param {object} root a html node for rander
 */
export function setRoot(root) {
  ReactDOM.render(<App ref={appRef} />, root);
}

/**
 * @function modifyComponent
 * @param {object} param parameter
 */
export function modifyComponent({
  props = {}, child = null, renderNode, id,
}) {
  const app = appRef.current;
  app.modifyComponent({
    renderNode, props, child, id,
  });
}

/**
 * @function unrenderComponent
 * @param {number} id component id
 */
export function unrenderComponent(id) {
  const app = appRef.current;
  app.unrenderComponent(id);
}

/**
 * @function renderComponent
 * @param {object} param parameter
 * @returns {number} component id
 */
export function renderComponent({
  componentName, renderNode, props, child,
}) {
  const componentJSX = COMPONENT_LIST[componentName];
  let componentId = null;
  if (componentJSX !== undefined) {
    const app = appRef.current;
    componentId = app.renderComponent({
      renderNode, props, child, componentJSX,
    });
  }
  return componentId;
}


/**
 * @function App
 * @returns {Node} JSX
 */
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      componentArr: [],
    };

    this.componentMap = new Map();
    this.componentIndex = 0;
  }

  createComponent({
    id, props = {}, child = null, renderNode, componentJSX,
  }) {
    const componentNode = React.createElement(
      UIModal, { renderNode, key: id }, React.createElement(componentJSX, props, child),
    );
    this.componentMap.set(id, { componentNode, componentJSX });
  }

  updateComponentArr() {
    const newComponentArr = [];
    this.componentMap.forEach(({ componentNode }) => {
      newComponentArr.push(componentNode);
    });

    this.setState({
      componentArr: newComponentArr,
    });
  }

  modifyComponent({
    id, props = {}, child = null, renderNode,
  }) {
    const oldComponent = this.componentMap.get(id);
    if (oldComponent) {
      const {
        componentJSX,
      } = oldComponent;
      this.createComponent({
        renderNode, props, child, componentJSX, id,
      });
      this.updateComponentArr();
    }
  }

  unrenderComponent(id) {
    this.componentMap.delete(id);
    this.updateComponentArr();
  }

  renderComponent({
    renderNode, props = {}, child = null, componentJSX,
  }) {
    const id = this.componentIndex;
    this.componentIndex += 1;

    this.createComponent({
      renderNode, props, child, componentJSX, id,
    });
    this.updateComponentArr();
    return id;
  }

  render() {
    const { componentArr } = this.state;
    return (
      <div
        className="app"
      >
        {componentArr}
      </div>
    );
  }
}
