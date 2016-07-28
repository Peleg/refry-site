import React from 'react';
import Example1 from './examples/1';
import Example2 from './examples/2';
import Example3 from './examples/3';
import Header from './Header.jsx';
import { Grid, Col, Row } from '@teachers/tpt-ui';

const MainPage = () => (
  <div>
    <Header />
    <Grid className="no-padding" fluid>
      <Row>
        <Col xs={12}>
          <div className="intro">
            <h1>Refry</h1>
            <h3>React Data Fetching for the REST</h3>
          </div>
        </Col>
      </Row>
    </Grid>

      <Grid>
        <Row>
          <p>
          Refry is a <a target="_blank" href="https://facebook.github.io/react/">React</a> plugin
          which creates simple interfaces for your components to interact with your
          RESTful API. Think of Refry as the poor-man's version of&nbsp;
          <a target="_blank" href="https://facebook.github.io/relay/">Relay</a> without the overhead
          of having to make any backend changes to your existing application.
          </p>

          <p>
          Refry automatically fetches your components' data dependencies on&nbsp;
          <code>componentWillMount</code> and <code>componentDidUpdate</code> when
          relevant props are changed so you don't have to worry about when and how to
          fetch your data. To make your resources available across multiple
          components, Refry normalizes and caches your resources in its internal&nbsp;
          <a target="_blank" href="https://github.com/reactjs/react-redux">Redux</a> state.
          </p>

          <p>
          This is what your component could look like:
          </p>

          <Example1 />

          <p>
          By defining your components data dependencies with the <code> resources
          </code> decorator, you tell Refry to load your Post on <code>
          componentWillMount </code>.
          </p>

          <p>
          By default, Refry will initialize your resource's value with an empty object
          so you don't need to check if your data has been fetched successfully. Refry
          will just re-render your component when it is.
          </p>

          <hr />

          <p>
            That's good and dandy, but what about some more complex components?
          </p>

          <Example2 />

          <p>
          When you specify the <code> schema </code> option on your resource
          definition, you tell Refry to normalize and store your data in its global
          state so that other components can use it as well.
          </p>

          <p>
          If your data can be lazy loaded, as you can see in <code> comments </code>
          above, you can modify your resource to not load automatically and instead
          load it later with the <code> fetch </code> method on it.
          </p>

          <p>
          Need to mutate your data? Do some other complex actions with it that aren't
          just a GET from your API? That's what <code> actions </code> are for.
          </p>

          <p>
          By setting the <code> actions </code> property on your resource definition,
          you tell Refry to add different methods on your resource which will allow
          you to dispatch different types of requests.
          </p>

          <p>
          So what happens after an <code> action </code> is executed? Does Refry
          update the resource it has in its state?
          </p>

          <p>
          It depends. If your API returned a resource from the action you can either
          remove it from the state, append it, or replace it completely with the
          returned resource.
          </p>

          <p>
          For example, if the component above received a post resource with an ID
          after removing a comment, since we specified an <code> updateStrategy </code>
          of <code> remove </code> then Refry would attempt to remove that one post
          from the post's comments
          list.
          </p>

          <p>
          Alternatively, if our API did not return the removed comment resource, we
          could tell Refry to "force" another fetch of all of the post's comments by
          setting the <code> refetchAfter </code> property to <code> 'success'
          </code>.
          </p>

          <hr />

          <Example3 />

          <p>TODO:</p>

          <ol>
            <li>Show how User component can have same data dependency and not make additional request</li>
            <li>Show how to invalidate a resource</li>
            <li>Show how to use the meta attributes on a resource</li>
            <li>Show how all actions return a promise</li>
            <li>Show server rendering</li>
            <li>Show how changes in props make request (w/ debounce on user search?)</li>
            <li>Show more advanced normalization of data</li>
            <li>Show how to use as a Redux plugin vs a black box</li>
            <li>Centralized resource definition</li>
            <li>Full docs...</li>
          </ol>

        </Row>
      </Grid>
  </div>

);

export default MainPage;
