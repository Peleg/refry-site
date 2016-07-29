import React from 'react';
import CodePlayground from '../CodePlayground';

const Example0 = () => (
  <CodePlayground noPreview component="PostPage" id="3">
{`import React from 'react';
import { defineResources } from 'refry';

@defineResources((state, ownProps) => ({
  post: {
    url: \`https://api.com/posts/\${ownProps.id}/\`
  }
}))
class PostPage extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <h2>{ post.value.title }</h2>
    );
  }
}`}
  </CodePlayground>
);

export default Example0;
