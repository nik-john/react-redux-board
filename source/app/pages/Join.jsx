import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { createSession } from '../state/session';
import { fetchCols, updateCols } from '../state/board';
import translate from '../i18n/Translate';
import { Card, CardMedia, CardText } from 'react-toolbox/lib/card';
import { List } from 'react-toolbox/lib/list';
import { Tab, Tabs } from 'react-toolbox';
import backgroundImage from '../components/images/logo.png';
import LanguagePicker from '../components/LanguagePicker';
import LogoutButton from '../components/LogoutButton';
import ConfigRow from '../components/config/Row';
import { getSavedSessionsByDate, getCols } from '../selectors';
import SessionTile from '../components/SessionTile';
import { push } from 'react-router-redux';
import style from './Join.scss';

const stateToProps = state => ({
    previousSessions: getSavedSessionsByDate(state),
    cols: getCols(state)
});

const actionsToProps = dispatch => ({
    createSession: () => dispatch(createSession()),
    goToSession: session => dispatch(push(`/session/${session.id}`)),
    fetchCols: () => dispatch(fetchCols()),
    updateCols: (cols) => dispatch(updateCols(cols))
});

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0, customSessionName: '', cols: [] };
    }
    componentDidMount() {
        this.props.fetchCols();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cols: nextProps.cols
        });
    }
    renderTabs() {
        const { previousSessions } = this.props;
        if (previousSessions.length) {
            return [
                this.renderStandardTab(),
                this.renderPreviousSessionsTab(),
                this.renderAdvancedTab(),
                this.renderConfigureBoardTab()
            ];
        }
        return [this.renderStandardTab(), this.renderAdvancedTab(), this.renderConfigureBoardTab()];
    }

    renderStandardTab() {
        const { strings } = this.props;
        return (
            <Tab label={ strings.standardTab.header } key="standard">
                <h5>{ strings.welcome }</h5><br />
                { strings.standardTab.text }<br /><br />
                <Button
                  label={ strings.standardTab.button }
                  accent
                  raised
                  onClick={ this.props.createSession }
                />
            </Tab>
        );
    }

    renderPreviousSessionsTab() {
        const { strings, previousSessions, goToSession } = this.props;
        return (
            <Tab label={ strings.previousTab.header } key="previous">
                <List selectable ripple>
                    { previousSessions.map(session =>
                        <SessionTile
                          key={session.id}
                          session={session}
                          onClick={() => goToSession(session)}
                        />
                    )}
                </List>
            </Tab>
        );
    }

    renderAdvancedTab() {
        const { strings } = this.props;
        return (
            <Tab label={ strings.advancedTab.header } key="advanced">
                <div style={{ maxWidth: 200 }}>
                    <LanguagePicker />
                    <LogoutButton />
                </div>
            </Tab>
        );
    }


    renderConfigureBoardTab() {
        const { strings } = this.props;
        const { cols } = this.state;
        const setConfig = config => {
            this.setState({
                cols: cols.map((col) => {
                    let item = col;
                    if (col.type === config.type) {
                        const { question, color, type } = config;
                        item = {
                            question,
                            color,
                            type
                        };
                    }
                    return item;
                })
            });
        };
        const saveConfig = () => {
            this.props.updateCols(this.state.cols);
        };
        const addConfig = () => {
            this.setState({
                cols: [...cols, {
                    question: 'Add a question',
                    color: '#000000',
                    type: ''
                }]
            });
        };
        const deleteConfig = (type) => {
            this.setState({
                cols: cols.filter(col => col.type !== type)
            });
        };
        return (
            <Tab label={ strings.configureBoardTab.header } key="configureBoard">
                <div>
                    {cols.map((row, i) => (
                        <ConfigRow key={i}
                          type={row.type}
                          question={row.question}
                          color={row.color}
                          setConfig={setConfig}
                          deleteConfig={deleteConfig}
                        />
                    ))}
                    <Button
                      label={ strings.configureBoardTab.save }
                      accent
                      raised
                      onClick={ saveConfig }
                    />
                    <Button
                      label={ strings.configureBoardTab.add }
                      raised
                      onClick={ addConfig }
                    />
                </div>
            </Tab>
        );
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <Card raised className={style.join}>
                    <CardMedia style={{ backgroundColor: '#EEE' }}>
                        <img
                          src={ backgroundImage }
                          style={{ objectFit: 'contain', width: '100%',
                              backgroundSize: 'contain', maxHeight: 150 }}
                          role="presentation"
                        />
                    </CardMedia>
                    <CardText>
                        <Tabs
                          index={this.state.tabIndex}
                          onChange={tabIndex => this.setState({ tabIndex })}
                        >
                            { this.renderTabs() }
                        </Tabs>
                    </CardText>
                </Card>
            </div>
        );
    }
}

Join.propTypes = {
    previousSessions: PropTypes.array,
    cols: PropTypes.array,
    createSession: PropTypes.func,
    fetchCols: PropTypes.func,
    createCustomSession: PropTypes.func,
    goToSession: PropTypes.func,
    strings: PropTypes.object,
    updateCols: PropTypes.func
};

Join.defaultProps = {
    previousSessions: [],
    cols: [],
    createSession: noop,
    fetchCols: noop,
    createCustomSession: noop,
    goToSession: noop,
    updateCols: noop,
    strings: {
        welcome: 'Welcome to Retrospected',
        standardTab: {
            header: 'Create a Session',
            text: 'Click below and start retrospecting:',
            button: 'Create a new session'
        },
        advancedTab: {
            header: 'Advanced'
        },
        previousTab: {
            header: 'Previous sessions',
            rejoinButton: 'Rejoin'
        },
        configureBoardTab: {
            header: 'Configure Board',
            save: 'Save',
            add: 'Add Column'
        }
    }
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Join')
]);

export default decorators(Join);
