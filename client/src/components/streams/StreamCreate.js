import  React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component{

    //After submitting a form, redux-form automatically pass values from form in a callback
    //as formValues.
    //We get history object from withRouter HOC and send it as argument to our
    //action creator (createStream) so that we can re-route user after he
    //successfully created new stream.
    onSubmit = formValues => {
        this.props.createStream(formValues, this.props.history)
    };

    render(){
        return(
            <div>
                <h3>Create a Stream</h3>
                <StreamForm  onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default withRouter(connect(null, {createStream})(StreamCreate));