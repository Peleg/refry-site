import React from 'react';
import CodePlayground from '../CodePlayground';

const Example1 = () => (
  <CodePlayground component="PostPage" id="3">
{`
  import React from 'react';
  import { defineResources } from 'refry';

  @defineResources((state, ownProps) => ({
    post: {
      url: \`https://api.com/posts/\${ownProps.id}/\`
    }
  }))
  class PostPage extends React.Component {
    render() {
      const { post } = this.props;
      return post.meta.isFetching
        ? <p>Loading ...</p>
        : <div>
            <h2>{ post.value.title }</h2>
            <p>{ post.value.body }</p>
            <button onClick={ post.fetch }>Reload!</button>
          </div>;
    }
  }
`}
  </CodePlayground>
);

export default Example1;
