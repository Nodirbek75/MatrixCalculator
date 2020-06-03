import React from 'react';
import './input.scss';

const input = (props) => (
    <input 
    type={'number'}
    className={props.disable ? 'InputOutput' : 'Input'} 
    value={props.value} 
    onChange={(event) => props.changeValueHandler(event, props.index)}
    disabled={props.disable}/>
)

export default input;