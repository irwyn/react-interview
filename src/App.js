import { Provider } from 'react-redux';

import Cerberus from './Cerberus';
import Store from './store';

const App = () => {
  return (
    <Provider store={Store}>
      <Cerberus />
    </Provider>
  );
};

export default App;
