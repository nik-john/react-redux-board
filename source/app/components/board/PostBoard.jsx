import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import PostColumn from './PostColumn';
import { fetchCols } from '../../state/board';
import style from './PostBoard.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addPost, deletePost, like, unlike, editPost } from '../../state/posts';
// import icons from '../../constants/icons';
import translate from '../../i18n/Translate';
import {
    getCurrentUser,
    getCols,
    getPosts
} from '../../selectors';

const stateToProps = state => ({
    currentUser: getCurrentUser(state),
    cols: getCols(state),
    posts: getPosts(state)
});

const actionsToProps = dispatch => ({
    addPost: (type, text) => dispatch(addPost(type, text)),
    deletePost: post => dispatch(deletePost(post)),
    like: post => dispatch(like(post)),
    unlike: post => dispatch(unlike(post)),
    edit: (post, content) => dispatch(editPost(post, content)),
    fetchCols: () => dispatch(fetchCols())
});

class PostBoard extends Component {
    constructor(props) {
        super(props);
        this.renderColumn = this.renderColumn.bind(this);
    }
    componentDidMount() {
        this.props.fetchCols();
    }
    renderColumn(postType) {
        const columns = `col-1-${this.props.cols.length}`;
        return (
            <div
              className={classNames(style.column, style[postType.type], columns)}
              key={postType.type}
            >
                <PostColumn
                  currentUser={this.props.currentUser}
                  posts={postType.posts}
                  type={postType.type}
                //   icon={postType.icon}
                  onAdd={this.props.addPost}
                  placeholder={postType.question}
                  onDelete={this.props.deletePost}
                  onLike={this.props.like}
                  onUnlike={this.props.unlike}
                  onEdit={this.props.edit}
                  className={columns}
                />
            </div>
        );
    }

    render() {
        const { cols, posts } = this.props;
        // const types = [{
        //     type: 'well',
        //     question: strings.wellQuestion,
        //     icon: icons.sentiment_satisfied,
        //     posts: wellPosts
        // }, {
        //     type: 'notWell',
        //     question: strings.notWellQuestion,
        //     icon: icons.sentiment_very_dissatisfied,
        //     posts: notWellPosts
        // }, {
        //     type: 'ideas',
        //     question: strings.ideasQuestion,
        //     icon: icons.lightbulb_outline,
        //     posts: ideasPosts
        // }];
        const types = cols.map((col) => {
            const { type, question } = col;
            return {
                type,
                question,
                posts: posts.filter(post => post.postType === type)
            };
        });
        return (
            <div className={classNames(style.board, 'grid')}>
                { types.map(this.renderColumn) }
            </div>
        );
    }
}

PostBoard.propTypes = {
    currentUser: PropTypes.string,
    addPost: PropTypes.func,
    deletePost: PropTypes.func,
    strings: PropTypes.object,
    like: PropTypes.func,
    unlike: PropTypes.func,
    edit: PropTypes.func,
    fetchCols: PropTypes.func,
    cols: PropTypes.array,
    posts: PropTypes.array
};

PostBoard.defaultProps = {
    currentUser: null,
    cols: [],
    addPost: noop,
    deletePost: noop,
    like: noop,
    fetchCols: noop,
    unlike: noop,
    edit: noop,
    posts: []
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('PostBoard')
]);

export default decorators(PostBoard);
