import React from 'react'
import ReactDatePicker from 'react-datepicker';
import classnames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';

const PortalDatePicker = ({selectedDate, onChange, onClose, className, placeholder=null, isClearable=false, isOpen = false}) => (
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
                selected={selectedDate}
                isClearable={isClearable}
                onSelect={onChange}
                onClickOutside={onClose} />
                )}
    </div>
);

export default PortalDatePicker;