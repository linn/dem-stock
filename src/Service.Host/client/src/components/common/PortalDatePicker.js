import React from 'react'
import ReactDatePicker from 'react-datepicker';
import classnames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';

const displayFormat = (display) => {
    switch (display) {
    case 'date':
        return 'DD MMM YYYY';
    case 'month':
        return 'MMMM YYYY';
    }
    return display ? display : 'DD MMM YYYY';
};

const PortalDatePicker = ({selectedDate, onChange, display, className, placeholder=null, isClearable=false, isOpen = false}) => (
    <div>
        {isOpen && (
            <ReactDatePicker
                className={classnames(className, 'form-control')}
                showYearDropdown
                withPortal
                inline
                autoFocus
                fixedHeight
                todayButton={"Today"}
                dateFormat={displayFormat(display)}
                selected={selectedDate}
                isClearable={isClearable}
                onChange={onChange}
                onSelect={onChange}
                onClickOutside={onChange} />
                )}
    </div>
);

export default PortalDatePicker;