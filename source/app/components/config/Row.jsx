import React, { PropTypes, Component } from 'react';
// import Dropdown from 'react-toolbox/lib/dropdown';
import noop from 'lodash/noop';
// import Input from 'react-toolbox/lib/input';
import { EditableField } from '../editableField';
import Button from 'react-toolbox/lib/button';
import { ChromePicker } from 'react-color';
// TODO: create index file
// import colors from '../../constants/colors';
import defaultTheme from '../../theme.scss';

class RowComponent extends Component {
    constructor(props) {
        super(props);
        const { question, color, type } = props;
        this.state = {
            question,
            color,
            type,
            displayColorPicker: false
        };
    }

    bubbleUpRow() {
        const { question, color, type } = this.state;
        this.props.setConfig({
            question,
            color,
            type
        });
    }
    render() {
        const { question, color } = this.state;
        const defaultColors = [defaultTheme.notWell, defaultTheme.well, defaultTheme.ideas];
        const handleColorPick = () => {
            this.setState({ displayColorPicker: !this.state.displayColorPicker });
        };

        const handleClose = () => {
            this.setState({ displayColorPicker: false });
        };
        const handleColorChange = (c) => {
            this.setState({ color: c.hex });
            this.bubbleUpRow();
        };
        const handleQuestionChange = (q) => {
            this.setState({ question: q });
            this.bubbleUpRow();
        };

        const handleDelete = () => {
            this.props.deleteConfig(this.props.type);
        };

        // If passed color is not a color choose from among default colors
        const processedColor = (/^#[0-9A-F]{6}$/i.test(color)) ? color :
            defaultColors[Math.floor(Math.random() * defaultColors.length)];

        // TODO: Move to scss
        const popover = {
            position: 'absolute',
            zIndex: '2',
            // TODO: Fix this
            margin: '1% 50%'
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        };

        // TODO: Move to scss
        const preview = {
            backgroundColor: processedColor,
            width: '10px',
            height: '10px',
            display: 'inline-block',
            borderRadius: '10px',
            border: '1px solid black',
            marginLeft: '5px'
        };

        return (
            <div className="grid grid-pad">
                <EditableField
                  label="Question"
                  val={question}
                  ref="question"
                  className="col-1-3"
                  rename={ handleQuestionChange }
                />
                <Button onClick={ handleColorPick } className="col-1-3">
                    Pick Color
                    <div style={ preview } />
                </Button>
                <Button onClick={ handleDelete } className="col-1-3">Delete</Button>
                { this.state.displayColorPicker ?
                    <div style={ popover }>
                        <div style={ cover } onClick={ handleClose } />
                        <ChromePicker color={ processedColor }
                          onChange={ handleColorChange }
                        />
                    </div> : null }
            </div>
        );
    }
}

RowComponent.propTypes = {
    question: PropTypes.string,
    color: PropTypes.string,
    setConfig: PropTypes.func,
    deleteConfig: PropTypes.func,
    type: PropTypes.string
};

RowComponent.defaultProps = {
    question: '',
    color: '',
    setConfig: noop,
    deleteConfig: noop,
    type: ''
};

export default RowComponent;
