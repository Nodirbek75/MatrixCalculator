import React from 'react';
import Input from '../UI/input/input';
import './MatrixBuilder.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
const matrixBuilder = (props) => {
    const matrix = props.values.map((value, index) => {
        if((index+1)%props.col === 0){
            return(
                <React.Fragment key={index}>
                    <Input 
                    value={value} 
                    index={index}
                    changeValueHandler={(event, index) => props.changeValueHandler(event, index)}/>
                    <br />
                </React.Fragment>
                )
        }else{
            return(
                <Input key={index} value={value} index={index} changeValueHandler={props.changeValueHandler}/>
            )
        }
    })
    const width = 60*props.col;
    const inputs = props.isOutput ? matrix : 
        (
        <div className={'MatrixBlock'} style={{minWidth: width+'px', margin: '20px auto'}}>
            <div className={'MatrixBlock__Col'}>
                <FontAwesomeIcon onClick={() => props.updateDim('rem', 'col')} className={'MatrixBlock__Icon'} icon={faMinusCircle}/>
                <FontAwesomeIcon onClick={() => props.updateDim('add', 'col')} className={'MatrixBlock__Icon'} icon={faPlusCircle}/>
            </div>
            <div className={'MatrixBlock__Container'}>
                <div className={'MatrixBlock__Row'}>
                    <FontAwesomeIcon onClick={() => props.updateDim('rem', 'row')} className={'MatrixBlock__Icon'} icon={faMinusCircle}/>
                    <FontAwesomeIcon onClick={() => props.updateDim('add', 'row')} className={'MatrixBlock__Icon'} icon={faPlusCircle}/>
                </div>
                <div>
                    {matrix}
                </div>
            </div>
        </div>
        );

    return inputs;
}

export default matrixBuilder;