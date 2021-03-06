window.onload = function () {
  var app = document.querySelector('#app');
  var modalRoot = document.querySelector('#modal-root');
  var child = document.createElement('div');
  child.classList.add('child');
  child.innerText = 'Click';
  myModule.setRoot(modalRoot);
  var clickButtonId = null;

  function createClickButton() {
    var count = 0;
    function getConfig() {
      return {
        componentName: 'UIButton',
        renderNode: app,
        props: {
          onClick: function onClick() {
            count += 1;
            var newConfig = getConfig();
            myModule.modifyComponent(newConfig);
          }
        },
        id: clickButtonId,
        child: "Click " + count
      };
    }
    clickButtonId = myModule.renderComponent(getConfig());
  }
  function removeClickButton() {
    myModule.unrenderComponent(clickButtonId);
    clickButtonId = null;
  }
  var MODE_LIST = {
    ADD: 'Add',
    REMOVE: 'Remove',
  };
  function createEditButton() {
    var editButtonId = null;
    var mode = MODE_LIST.ADD;
    function getRemoveConfig() {
      return {
        componentName: 'UIButton',
        renderNode: app,
        props: {
          onClick: function onClick() {
            if (clickButtonId !== null) {
              removeClickButton();
              mode = MODE_LIST.ADD;
            } else {
              createClickButton();
              mode = MODE_LIST.REMOVE;
            }
            var newConfig = getRemoveConfig()
            myModule.modifyComponent(newConfig);
          }
        },
        id: editButtonId,
        child: mode,
      };
    }
    editButtonId = myModule.renderComponent(getRemoveConfig());
  }
  createEditButton();
};