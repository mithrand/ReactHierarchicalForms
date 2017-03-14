import * as React from 'react';
import {CoursesSelect} from './components/CoursesSelectComponent';

class App extends React.Component<null, null> {
  render() {
    return (
        <div>
            <h2>My hierarchical React App</h2>
            <CoursesSelect />
        </div>
    );
  }
}

export default App;
