import React, {Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Login.module.scss';

class Login extends Component{
    state = {
        controls: {
            email: {
                labelName: 'Email',
                elementConfig: {
                    type: 'email',
                    id: 'email',
                    name: 'email',
                    placeholder: 'E-Mail',
                },
                validation: {
                    minLength: 5,
                    maxLength: 50,
                    required: true,
                    isEmail: true
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                labelName: 'Password',
                elementConfig: {
                    type: 'password',
                    id: 'password',
                    name: 'password',
                    placeholder: 'Password',
                },
                validation: {
                    minLength: 8,
                    maxLength: 20,
                    required: true,
                    isPassword: true
                },
                value: '',
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };
        let formIsValid = true;
        for (let controlName in updatedControls){
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isPassword) {
            const pattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                labelName={formElement.config.labelName}
                id={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Default" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
            </div>
        )
        
    }
}

export default Login;
