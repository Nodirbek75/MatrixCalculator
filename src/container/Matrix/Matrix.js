import React, { Component } from 'react';
import MatrixJs from 'matrix-js';
import MatrixBuilder from '../../component/MatrixBuilder/MatrixBuilder';
import Button from '../../component/UI/button/button';
import './Matrix.scss'
import Modal from '../../component/UI/modal/modal';
import logo from '../../assets/logo.png';
import logoMain from '../../assets/logo1.png';

class Matrix extends Component {

    state={
        matrixA:{
            col: 3,
            row: 3,
            values: new Array(3*3).fill('')
        },
        matrixB:{
            col: 3,
            row: 3,
            values: new Array(3*3).fill('')
        },
        output: {
            col: 0,
            row: 0,
            values: null
        },
        showOutput: false,
        error: null,
        scroll: false,
        inputX: ''
    }

    changeValueHandler = (e, index, matrix) => {
        if(matrix === 'A'){
            const matrixA = {
                ...this.state.matrixA,
            }
            matrixA.values[index] = e.target.value;
            this.setState({matrixA: matrixA})
        }else if(matrix === 'B'){
            const matrixB = {
                ...this.state.matrixB,
            }
            matrixB.values[index] = e.target.value;
            this.setState({matrixB: matrixB})
        }
    }

    setOutput(output){
        const outputValues = [];
        output.values.forEach(row => {
           row.forEach(val => {    
               outputValues.push(val)
            })
        })
        output = {
            ...output,
            values: outputValues
        }

        this.setState({output: output, showOutput: true});
    }

    transferToMatrix = (matrix) => {
        const values = matrix.values.map(val => parseInt(val));
        
        const arrValues = [];
        while(values.length) arrValues.push(values.splice(0,matrix.col));

        return MatrixJs(arrValues);
    }

    matrixOperation =(operation) => {
       
        if(operation === 'swap'){
            const tempA = {...this.state.matrixA}
            const tempB = {...this.state.matrixB}
            this.setState({matrixA: tempB, matrixB: tempA});
        }
        else if(operation === 'mulBy'){
            if(this.state.inputX !== ''){
                const matrix = {...this.state.matrixA};
                const result = [];
                matrix.values.forEach(el => {
                    result.push(el*this.state.inputX);
                })

                this.setState({
                    output: {
                        col: matrix.col,
                        row: matrix.row,
                        values: result,
                    },
                    showOutput: true
                });
            }else{
                this.setState({error: 'Enter the X'})
            }
        }

        else{
            const matrixA = this.transferToMatrix({...this.state.matrixA})
            const matrixB = this.transferToMatrix({...this.state.matrixB})
            let output = null;

            switch(operation){
                case'add':
                    if(this.state.matrixA.col === this.state.matrixB.col && this.state.matrixA.row === this.state.matrixB.row){
                        output ={
                            values: matrixA.add(matrixB),
                            col: this.state.matrixA.col,
                            row: this.state.matrixA.row
                        }
                        this.setOutput(output);
                    }else{
                        this.setState({error: "Both matrix must have same dimensions to be added"});
                    }
                    break;
                case'sub':
                    if(this.state.matrixA.col === this.state.matrixB.col && this.state.matrixA.row === this.state.matrixB.row){
                        output ={
                            values: matrixA.sub(matrixB),
                            col: this.state.matrixA.col,
                            row: this.state.matrixA.row
                        }
                        this.setOutput(output);
                    }else{
                        this.setState({error: "Both matrix must have same dimensions to be subtracted"});
                    }
                    break;
                case'mul':
                    if(this.state.matrixA.col === this.state.matrixB.row){
                        output ={
                            values: matrixA.prod(matrixB),
                            col: this.state.matrixB.col,
                            row: this.state.matrixA.row
                        }
                        this.setOutput(output);
                    }else{
                        this.setState({error: "The number of columns of the 1st matrix must equal the number of rows of the 2nd matrix"});
                    }
                    break;
                case'powOf':
                    if(this.state.inputX !== ''){
                        let outputValues = matrixA;
                        for(let i = 1; i < this.state.inputX; i++ ){
                            if(Array.isArray(outputValues)){
                                outputValues = MatrixJs(outputValues)
                            }
                            outputValues = matrixA.prod(outputValues);
                            
                        }
                        output={
                            values: outputValues,
                            col: this.state.matrixA.col,
                            row: this.state.matrixA.row
                        }
                        this.setOutput(output)
                    }else{
                        this.setState({error: "Enter the X"});
                    }
                    break;
                default:
            }
        }
    }

    updateMatrixDimension = (matrix, operation, side) => {
        let updatedMatrix = {...this.state[matrix]}
        if(operation === 'add'){
            updatedMatrix[side] = updatedMatrix[side]+1;
            updatedMatrix.values = new Array(updatedMatrix.col * updatedMatrix.row).fill('');
            this.setState({[matrix]: updatedMatrix})
        }else{
            if(updatedMatrix[side] > 2){
                updatedMatrix[side] = updatedMatrix[side]-1;
                updatedMatrix.values = new Array(updatedMatrix.col * updatedMatrix.row).fill('');
                this.setState({[matrix]: updatedMatrix})
            }else{
                this.setState({error: "You can't remove column anymore!"})
            }
        }
    }

    resetHandler = () => {
        const {matrixA, matrixB, output} = {...this.state};
        matrixA.values.fill('');
        matrixB.values.fill('');
        output.values.fill('');

        this.setState({matrixA: matrixA, matrixB: matrixB, output: output, showOutput: false, error: null, inputX: ''});
    }

    closeModalHandler = () => {
        this.setState({error: null});
    }


    render(){
        
        const width = 60*this.state.matrixA.col + 60*this.state.matrixB.col;
        const attachedClass = width >=  window.innerWidth-100 ? 'Container__DisplayColumn' : null;
        const output = this.state.showOutput ? 
            <MatrixBuilder
            isOutput={true}
            show={this.state.showOutput}
            values={this.state.output.values} 
            col={this.state.output.col}
            changeValueHandler={(event, index) => this.changeValueHandler(event, index, 'C')}
            /> : null;
            
        return (
            <div className={'Container'}>
                
                <img src={logoMain} className={'Container__LogoMainImg'} alt={'Logo'}/>
                <img src={logo} className={'Container__LogoImg'} alt={'Logo'}/>
                
                <h1 className={'Container__Heading'}>Matrix Calculator</h1>
                <Modal show={this.state.error} modalClosed={this.closeModalHandler}>
                    <div className={'Container__Error'}>{this.state.error}</div>
                </Modal>
                <div className={['Container__Matrix', attachedClass].join('')}>
                    <MatrixBuilder
                    updateDim={(operation, side) => this.updateMatrixDimension('matrixA', operation, side)}
                    isOutput={false}
                    values={this.state.matrixA.values} 
                    col={this.state.matrixA.col}
                    changeValueHandler={(event, index) => this.changeValueHandler(event, index, 'A')}/>

                    <MatrixBuilder 
                    updateDim={(operation, side) => this.updateMatrixDimension('matrixB', operation, side)}
                    values={this.state.matrixB.values} 
                    col={this.state.matrixB.col}
                    changeValueHandler={(event, index) => this.changeValueHandler(event, index, 'B')}/>
                </div>
                <div className={'Container__InputBox'}>
                    <input 
                    type={'number'} 
                    className={'Container__Input'} 
                    placeholder={'Enter X'} 
                    value={this.state.inputX}
                    onChange={(event) => this.setState({inputX: event.target.value})}/>
                    <label className={'Container__Label'}>Enter X</label>
                </div>
                <div className={'Container__Buttons'}>
                    <Button clicked={() => this.matrixOperation('add')}>Add</Button>
                    <Button clicked={() => this.matrixOperation('sub')}>Sub</Button>
                    <Button clicked={() => this.matrixOperation('mul')}>mul</Button>
                    <Button clicked={() => this.matrixOperation('swap')}>swap</Button>
                    <Button clicked={() => this.matrixOperation('mulBy')}>mul by X</Button>
                    <Button clicked={() => this.matrixOperation('powOf')}>Power of X</Button>
                    <Button clicked={this.resetHandler}>res</Button>
                </div>
                <div 
                    className={'Container__Output'}
                    style={{
                        transform: this.state.showOutput ? 'translatey(0)' : 'translatey(-250vh)',
                        opacity: this.state.showOutput ? '1' : '0'
                    }}>
                    {output}
                </div>
            </div>
        );
    }
}

export default Matrix;