import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import style from './EditableField.scss';
import Input from 'react-toolbox/lib/input';
import FontIcon from 'react-toolbox/lib/font_icon';
import icons from '../../constants/icons';

class EditableField extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    onKeyPress(e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.setState({ editMode: false });
        }
    }

    renderViewMode() {
        const { val, className } = this.props;

        return (
            <div
              className={`${style.editableField} ${className}`}
              onClick={() => this.setState({
                  editMode: true })}
            >
                <span className={style.name}>
                    { val }&nbsp;
                    <FontIcon className={style.editIcon} value={icons.create} />
                </span>
            </div>
        );
    }

    renderEditMode() {
        const { val, rename, className, label } = this.props;
        return (
            <div className={`${style.editableField} ${className}`}>
                <div className={style.edit} >
                    <Input
                      ref="input"
                      maxLength={30}
                      icon={icons.create}
                      value={val}
                      onBlur={() => {
                          this.setState({ editMode: false });
                      }}
                      onKeyPress={e => this.onKeyPress(e.nativeEvent)}
                      onChange={rename}
                      label={label}
                      autoFocus
                    />
                </div>
            </div>
        );
    }

    render() {
        if (this.state.editMode) {
            return this.renderEditMode();
        }
        return this.renderViewMode();
    }
}

EditableField.propTypes = {
    val: PropTypes.string,
    rename: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string
};

EditableField.defaultProps = {
    val: null,
    rename: noop,
    type: 'input',
    className: '',
    label: ''
};

export default EditableField;
