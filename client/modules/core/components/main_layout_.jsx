import React from 'react';
//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {Grid,Row,Col,PageHeader} from 'react-bootstrap';
import Navigation from './navigation.jsx';

const Layout = ({store,content = () => null }) => (

  <Provider store={store}>
    <div>
      <Grid>
        <PageHeader>Mantra Voice</PageHeader>
        <Row>
          <Col>
            <Navigation />
          </Col>

          <Col>
            {content()}
          </Col>
        </Row>
        <footer>
          <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> &amp; Meteor.</small>
        </footer>
      </Grid>
    </div>
  </Provider>
);

export default Layout;
