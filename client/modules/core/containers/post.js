import Post from '../components/post.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = (props, onData) => {
  let {context, params:{postId}} = props;
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('posts.single', postId).ready()) {
    const post = Collections.Posts.findOne(postId);
    onData(null, {post});
  } else {
    const post = Collections.Posts.findOne(postId);
    if (post) {
      onData(null, {post});
    } else {
      onData();
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Post);
