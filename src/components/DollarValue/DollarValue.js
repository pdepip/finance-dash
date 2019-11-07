import React from 'react';
import classNames from 'classnames';
import PropTypes from "prop-types";

import './styles.scss';

import { numberWithCommas, numberFormatter } from "../../utils/utils";

const DollarValue = (props) => {

    let sign = '';
    if (props.signMatters) {
        sign = parseFloat(props.value) < 0 ? 'negative': 'positive';
    }

    let firstChar = props.bitcoin ? '\u0E3F' : '$';
    if (props.noSign) {
        firstChar = '';
    }

    if (props.bitcoin) {
        return (
            <div
                className={classNames('dollar-value', props.className, sign, props.showArrow ? 'show-arrow': '', props.className)}
                style={props.style}>

                <span className={classNames('arrow')}></span>

                <span className='value'>
                    <span className="first-char">₿</span>
                    <span>{numberWithCommas(props.value)}</span>
                </span>

                { props.postfix ? <span className='last-char'>{props.postfix}</span> : null}

            </div>
        )
    }

    if (props.percentage) {
        return (
            <div
                className={classNames('dollar-value', props.className, sign, props.showArrow ? 'show-arrow': '', props.className)}
                style={props.style}>

                {props.parenthesis ? '(' : null}

                <span className={classNames('arrow')}></span>

                <span className='value'>
                    {numberFormatter(Math.abs(props.value))}
                </span>

                <span className="last-char">%</span>

                {props.parenthesis ? ')' : null}

            </div>
        )
    } else if (props.prettyFormat) {
        return (
            <div
                className={classNames('dollar-value', props.className, sign, props.showArrow ? 'show-arrow': '', props.className)}
                style={props.style}>

                <span className='arrow'></span>

                <span className="first-char">{firstChar}</span>
                <span className='value'>
                    {numberFormatter(Math.abs(props.value))}
                </span>

                { props.postfix ? <span className='last-char'>{props.postfix}</span> : null}

            </div>
        );
    } else {
        return (
            <div
                className={classNames('dollar-value', props.className, sign, props.showArrow ? 'show-arrow': '', props.className)}
                style={props.style}>

                <span className={classNames('arrow')}></span>

                <span className='value'>
                    <span className="first-char">{firstChar}</span>
                    {numberWithCommas(props.value)}
                </span>

                { props.postfix ? <span className='last-char'>{props.postfix}</span> : null}

            </div>
        )
    }
}

DollarValue.propTypes = {
	signMatters: PropTypes.bool,
    showArrow: PropTypes.bool,
    percentage: PropTypes.bool,
    parenthesis: PropTypes.bool,
    prettyFormat: PropTypes.bool,
    bitcoin: PropTypes.bool,
    postfix: PropTypes.string
};

DollarValue.defaultProps = {
	signMatters: false,
    showArrow: false,
    percentage: false,
    parenthesis: false,
    prettyFormat: false,
    bitcoin: false,
    postfix: '',
};

export default DollarValue;
