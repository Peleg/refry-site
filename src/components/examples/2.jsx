import React from 'react';
import CodePlayground from '../CodePlayground';

const Example2 = () => (
  <CodePlayground component="PostPage" id="3">
{`
  import React from 'react';
  import { defineResources, Schema, arrayOf } from 'refry';
  const postSchema = new Schema('post');

  @defineResources((state, ownProps) => ({
    post: {
      url: \`https://myapi.com/posts/\${ownProps.id}/\`,
      schema: postSchema,
      actions: {
        delete: {
          method: 'DELETE'
        }
      }
    },

    comments: {
      url: \`https://myapi.com/posts/\${ownProps.id}/comments/\`,
      schema: arrayOf(postSchema), // allows Refry to normalize your data
                                   // and store it with the rest of users
      auto: false,
      actions: {
        remove: (commentId) => ({
          url: \`https://myapi.com/posts/\${commentId}/\`,
          method: 'DELETE',
          updateStrategy: 'remove'
        })
      }
    }
  }))
  class PostPage extends React.Component {

    deletePost() {
      const { post } = this.props;
      if (confirm(\`Delete Post \${post.value.id}?\`)) {
        post.delete();
      }
    }

    renderComments() {
      const { comments } = this.props;
      return comments.meta.isFetching
        ? <p>Loading ...</p>
        : comments.value.map((commentProps, idx) => (
          <div key={ idx }>
            <p>{ idx + 1 }. { commentProps.body }</p>
            <button onClick={ () => comments.remove(commentProps.id) }>
              Remove Comment
            </button>
          </div>));
    }

    render() {
      const { post, comments } = this.props;
      return post.meta.isFetching
        ? <p>Loading ...</p>
        : <div>
            <h2>{ post.value.title }</h2>
            <p>{ post.value.body }</p>
            <button onClick={ post.fetch }>Reload!</button>
            <button onClick={ this.deletePost.bind(this) }>Delete Post</button>
            <button onClick={ comments.fetch }>Load Post's Comments</button>
            { this.renderComments() }
          </div>;
    }
  }
`}
  </CodePlayground>
);

export default Example2;
