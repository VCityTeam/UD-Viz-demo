const { SharedClass } = require('@my_app_name/shared');

module.exports = class MyAppNameServer {
  constructor() {}

  start() {
    console.log('MY_APP_SERVER_ENV_VARIABLE: ', process.env.MY_ENV_VARIABLE);

    const mySharedClass = new SharedClass('SERVER');
    mySharedClass.print();
  }
};
