import { withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import "./App.css";
import style from "./style";
import React from 'react';
import Result from "./Result/Result";
import classNames from 'classnames';
import ButtonBase from './ButtonBase/ButtonBase';
import { isEmpty } from "../utils/commons";
import { DIV, PLUS, MULT, SUB, ERROR, EQUALS, REMOVE, MATHS_OPERATORS } from "../constants/constants";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display:'0',
            left: null,
            operator: null,
            numbers: ['9','8','7','6','5','4','3','2','1','0']
        }
    }

    handleNumber = (value) => {
        const { display } = this.state;
        if( !isEmpty(display) && MATHS_OPERATORS.includes(display) ) {
            this.setState({
                operator: display,
                display: value
            })
        }else if(display != ERROR){
            this.setState({
                display: display === '0' ? value : `${display}${value}`
            })
        }
    }

    handleClears = (value) => {
        const { display } = this.state;
        if(value === REMOVE && display !== "0" && display !== ERROR){
            this.setState({
                display: this.state.display.slice(0, -1)
            });
        }else{
            this.setState({
                display: '0'
            })
        }
    }

    handleMaths = async (value) => {
        const { left, operator, display } = this.state;
        if(value === EQUALS) {
            if (!isEmpty(left) && !MATHS_OPERATORS.includes(display) && !isEmpty(operator)){
                this.doOperation(this.state.display);
            }else{ /* DO NOTHING */ }
        }else if(!MATHS_OPERATORS.includes(display) && display !== ERROR){
            this.setState({
                left: this.state.display,
                operator: value,
                display: value
            })
        }
    }

    doOperation = (right) => {
        const { left, operator } = this.state;
        let result;
        switch(operator){ 
            case PLUS: {
                result = Number(left) + Number(right);                
                break;
            }
            case SUB: {
                result = Number(left) - Number(right);
                break;
            }
            case MULT: {
                result = Number(left) * Number(right);
                break;
            }
            case DIV: {
                if(right === '0') result = ERROR;
                else
                    result = Number(left) / Number(right);
                break;
            }
            default: {
                result = ERROR;
                break;
            }
        } 
        this.setState({
            display: result.toString(),
            left: result === ERROR ? null : result.toString(),
            operator: null,
            right: null
        })
    }

    render() {
        const { classes } = this.props
        const { display, numbers } = this.state;
        return(
            <Grid container className={classes.reactCalculator}>
                <Result result={display}/>
                <Grid item container>
                    <Grid item xs={10} ms={10}
                        className={classes.buttonsContainer}
                    >
                        <Grid item className={classes.buttons}
                        container
                        justify='center'
                        >
                            { numbers.map(number =>
                                <ButtonBase
                                    key={number}
                                    className={classNames(classes.button, classes.numbers)}
                                    onClick={this.handleNumber}
                                    value={number}
                                />
                            )}
                        </Grid>
                        <Grid item className={classes.operators}>
                            <ButtonBase
                                onClick={this.handleClears}
                                className={classNames(classes.button, classes.numbers)}
                                value='clear'
                            />
                            <ButtonBase
                                onClick={this.handleClears}
                                className={classNames(classes.button, classes.numbers)}
                                value={REMOVE}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={2} ms={2}
                        className={classes.mathsContainer}
                        container
                        justify='center'
                    >
                        <ButtonBase 
                            onClick={this.handleMaths} className={classes.button}
                            value={PLUS}
                        />
                        <ButtonBase 
                            onClick={this.handleMaths}  className={classes.button}
                            value={SUB}
                        />
                        <ButtonBase 
                            onClick={this.handleMaths}  className={classes.button}
                            value={MULT}
                        />
                        <ButtonBase 
                            onClick={this.handleMaths}  className={classes.button}
                            value={DIV}
                        />
                        <ButtonBase
                            onClick={this.handleMaths}  className={classes.button}
                            value={EQUALS}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(style)(App);
