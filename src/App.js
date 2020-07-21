import React from 'react';
import {createBrowserHistory} from 'history';

import RoutingHolder from './Route/route'
const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
      <RoutingHolder history={history}/>
    </div>
  );
}
 
export default App;
