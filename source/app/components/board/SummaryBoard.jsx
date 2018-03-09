import React, { PropTypes, Component } from 'react';
import flow from 'lodash/flow';
import translate from '../../i18n/Translate';
import { connect } from 'react-redux';
import {
    getCols,
    getPosts
} from '../../selectors';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import style from './SummaryBoard.scss';

const stateToProps = state => ({
    cols: getCols(state),
    posts: getPosts(state)
});

class SummaryBoard extends Component {
    renderType(label, cardStyle, posts) {
        if (!posts.length) {
            return null;
        }
        const columns = `col-1-${this.props.cols.length}`;
        return (
            <div style={{ margin: 30 }} key={posts[0].postType} className={columns}>
                <Card>
                    <CardTitle style={cardStyle}>{ label }</CardTitle>
                    <CardText>
                        <ul style={{ marginLeft: 0, marginTop: 20, listStyleType: 'none' }}>
                            { posts.map(this.renderPost.bind(this)) }
                        </ul>
                    </CardText>
                </Card>
            </div>
        );
    }

    renderPost(post) {
        return (
            <li key={post.id}>
                <span className={style.like}>+{post.likes.length}</span>&#9;
                <span className={style.dislike}>-{post.dislikes.length}</span>&#9;
                {post.content}
            </li>
        );
    }

    render() {
        const { posts, cols, strings } = this.props;

        if (!posts.length) {
            return (
                <div className={style.summary}>
                    <h4 style={{ textAlign: 'center', marginTop: 50 }}>{strings.noPosts}</h4>
                </div>
            );
        }
        const summaryContent = cols.map(col =>
            this.renderType(col.question,
                { backgroundColor: col.color },
                posts.filter(post => post.postType === col.type)));
        return (
            <div className={style.summary}>
                { summaryContent }
            </div>
        );
    }
}

SummaryBoard.propTypes = {
    strings: PropTypes.object,
    posts: PropTypes.array,
    cols: PropTypes.array
};

SummaryBoard.defaultProps = {
    wellPosts: [],
    notWellPosts: [],
    ideasPosts: [],
    strings: {
        vote: 'vote',
        votes: 'votes',
        noPosts: 'There are no posts to display'
    },
    posts: [],
    cols: []
};

const decorators = flow([
    connect(stateToProps),
    translate('PostBoard'),
    translate('SummaryBoard'),
    translate('Post')
]);

export default decorators(SummaryBoard);
