import React from 'react';
import './modal.scss';
import Backdrop from '../backdrop/backdrop';

const modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} closed={props.modalClosed}/>
        <div 
        className={'Modal'}
        style={{
            transform: props.show ? 'translate(-50%, -50%)' : 'translate(-250vh, -50%)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>
    </React.Fragment>
)

export default modal;