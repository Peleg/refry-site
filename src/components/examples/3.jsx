import React from 'react';
import CodePlayground from '../CodePlayground';

const Example3 = () => (
  <CodePlayground component="PostsSearch">
{`
  import React from 'react';
  import { defineResources } from 'refry';

  @defineResources((state, ownProps) => ({
    posts: {
      url: \`https://myapi.com/posts/\`,
      params: { q: ownProps.query },
      debounce: 500
    }
  }))
  class PostsPage extends React.Component {
    renderPost(postProps) {
      return (
        <div key={ postProps.id }>
          <h2>{ postProps.title }</h2>
          <p>{ postProps.body }</p>
        </div>
      );
    }

    renderResults() {
      const { posts, query } = this.props;
      if (!posts.meta.isSuccess) { return null; }
      return posts.value.length
        ? <div>{ posts.value.map(this.renderPost) }</div>
        : <p>No Results for { query }</p>
    }

    render() {
      const { posts } = this.props;
      return posts.meta.isFetching
        ? <p>Loading ...</p>
        : this.renderResults()
    }
  }

  class PostsSearch extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        query: ''
      };
    }

    handleChange(e) {
      this.setState({
        query: e.target.value
      });
    }

    render() {
      const { query } = this.state;
      return (
        <div>
          <input
            placeholder="Search Posts"
            value={ query }
            onChange={ this.handleChange.bind(this) }
          />
          <PostsPage query={ query } />
        </div>
      );
    }
  }

`}
  </CodePlayground>
);

export default Example3;
