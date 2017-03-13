import * as React from 'react';

class App extends React.Component<null, null> {
  render() {
    return (
        <div className="right_col" role="main">
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Plain Page</h3>
                    </div>
                </div>
                <div className="clearfix"/>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Plain Page</h2>
                            </div>
                            <div className="x_content"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
