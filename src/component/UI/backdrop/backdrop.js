import React from 'react';
import './backdrop.scss';

const backdrop = (props) => (
    props.show ? <div className={'Backdrop'} onClick={props.closed}></div> : null
)

export default backdrop;