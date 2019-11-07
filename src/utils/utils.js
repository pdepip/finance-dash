import React from 'react';

export const numberWithCommas = (x) => {
    if (x === null) {
        return '';
    } else if (x < 1000) {
        return x.toString();
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))\.*/g, ",");
    }
}

// Formats a number to desired string format
// Maybe want to use last char
// Flag for 1 sig fig 5 fig number 11.5k
export const numberFormatter = (num) => {
    if (!num) {
        return '0.00';
    }
    const abs = Math.abs(num);
    if (abs >= 1000000000) {
        return (num / 1000000000).toFixed(1) + ' B'
    } else if (abs >= 1000000) {
        return (num / 1000000).toFixed(1) + ' MM'
    } else if (abs >= 10000) {
        return (num / 1000).toFixed(1) + 'k'
    } else {
        return numberWithCommas(num.toFixed(2));
    }
}

export const isFiat = (ticker) => {
    return ticker === 'USD' || ticker === 'USDT';
}

export const round = (number, precision) => {
    const shift = (number, precision, reverseShift) => {
        if (reverseShift) {
            precision = -precision;
        }
        const numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };

    return shift(Math.round(shift(number, precision, false)), precision, true);
}

const isInt = (n) => {
    return n % 1 === 0;
}

export const sigFigSplit = (number, asset, precision) => {

    // Set precision based on asset
    if (!precision) {
        if (asset && isFiat(asset)) {
            precision = 2;
        } else {
            precision = 8;
        }
    }

    // Check if number is smaller than smallest possible denomination
    if (number < 1/10**precision) {
        return (
            <span className='sig-fig-value'>
                {`0.`}
                <span className='dimmed'>
                    {`${'0'.repeat(precision)}`}
                </span>
                <span className='amt-asset'>
                    {asset}
                </span>
            </span>
        )
    }

    const significant = Number(number).toFixed(precision).replace(/\.?0+$/, "");

    // Return int w/ precision amt of zeroes if number is not float
    if (isInt(significant)) {
        return (
            <span className='sig-fig-value'>
                {`${numberWithCommas(significant)}.`}
                <span className='dimmed'>
                    {`${'0'.repeat(precision)}`}
                </span>
            </span>
        )
    }

    let nonsignificant;

    try {
        nonsignificant = '0'.repeat(precision - significant.split('.')[1].length);

        return (
            <span className='sig-fig-value'>
                { numberWithCommas(significant) }
                <span className='dimmed'>
                    {nonsignificant}
                </span>
            </span>
        )
    } catch (e) {
        console.log('error w/ sigfig', e, asset, number);
    }
}
