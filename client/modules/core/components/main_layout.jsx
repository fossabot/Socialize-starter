import React from 'react';
import Helmet from 'react-helmet';
import Footer from './footer.jsx';
import Navigation from '../containers/navigation.js';

const Layout = props => (
  <div id="app">

    <Helmet
      titleTemplate="Socialize - %s"
      meta={[
        { name: 'description', content: 'Meteor starter app with social features.' },
        { name: 'author', content: 'Jan Dvorak IV.' },
      ]}
    />

    <Navigation />
    <div id="contentView" className="container">
      <div className="row">
        <div className="col s12">
          <main className="card-panel">
            {props.children}
          </main>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Layout;

Layout.propTypes = {
  children: React.PropTypes.object.isRequired,
};
