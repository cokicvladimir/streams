import  React from 'react';
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component{

    renderError({error, touched}){
        if(touched && error){
            return(
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    }

    //renders all input fields inside form
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </div>

        );
    }

    //We get formValues from Redux-Form
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };


    render(){
        return(
            <div>
                <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name='title' component={this.renderInput} label='Enter Title'/>
                    <Field name='description' component={this.renderInput} label='Enter Description'/>
                    <button className='ui button primary'>Submit</button>
                </form>
            </div>
        );
    }

}

const validate = formValues => {
    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title'
    }
    if(!formValues.description){
        errors.description = 'You must enter a description'
    }

    return errors;
};

//component wrapped in redux-form
export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
