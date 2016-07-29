import React from 'react';
import { Grid, Col, Row, TopNav } from '@teachers/tpt-ui';

const Header = () => (
  <Grid fluid className="Header blue">
    <Row>
      <Col xs={12}>
        <Grid>
          <Row>
            <Col xs={6}>
              <h4>REFRY</h4>
            </Col>
            <Col xs={6}>
              <TopNav
                links={ [
                    { label: 'About', link: '#about' },
                    { label: 'Installation', link: '#install' },
                    { label: 'Usage', link: '#usage' },
                    { label: 'Examples', link: '#examples' },
                    { label: 'API', link: '#api' }
                ] }
              />
            </Col>
          </Row>
        </Grid>
      </Col>
    </Row>
  </Grid>
);

export default Header;
