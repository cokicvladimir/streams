import  React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues, this.props.history);
    };

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }

        //initialValues prop is special property in redux-form and
        //values provided to the initialValues and then passed as prop to StreamForm
        // will be used as initial values for the form inside StreamForm component
        //
        // example: initialValues={title:'My initial title', description: 'initial desc'},
        //(title, description) are 'name' attributes for Field component, and that's how
        //they get referenced from initialValues prop
        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={{
                        title:this.props.stream.title,
                        description:this.props.stream.description
                    }}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = ( state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

const connectedEditForm = connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);


export default withRouter(connect(mapStateToProps, { fetchStream, editStream })(connectedEditForm));