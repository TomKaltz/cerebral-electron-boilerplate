import React from 'react'
import ReactDOM from 'react-dom'
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'
import {Container} from 'cerebral-view-react'
import ModulesProvider from 'cerebral-provider-modules'
import Devtools from 'cerebral-module-devtools'
import Rpc from './modules/Rpc';

import App from './components/App';

const model = Model({someState:'Cerebral App!'})
const controller = Controller(model)

controller.addContextProvider(ModulesProvider);

controller.addModules({
  devtools: Devtools(),
  rpc: Rpc(),
});

import './styles/pure.gcss';
import './styles/main.css';

ReactDOM.render(<Container controller={controller}><App /></Container>, document.getElementById('main'));
