import React, { Component } from 'react';
import { Grid, Col, Row, TopNav } from '@teachers/tpt-ui';

const Header = () => (
	<Grid fluid className="blue Header">
		<Row>
			<Col xs={6}>
				<h4> REFRY </h4>
			</Col>
			<Col xs={6}>
				<TopNav 
					links={
						[
  						{ label: "title1", link: '#title1' },
  						{ label: "title2", link: '#title2' },
  						{ label: "title3", link: '#title3' },
  						{ label: "title4", link: '#title4' },
  						{ label: "title5", link: '#title5' }
						]
					}
				/>
			</Col>
		</Row>
	</Grid>


)

export default Header;