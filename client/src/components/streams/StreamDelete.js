import React from 'react';
import Modal from '../modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchStream, deleteStream } from "../../actions";


class StreamDelete  extends React.Component{

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        const { history } = this.props;
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={ () => this.props.deleteStream(id, history)} className='ui button negative'>Delete</button>
                <Link to='/' className='ui button'>Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        const { stream } = this.props

        if(!stream){
            return 'Are you sure you want to delete this stream';
        }
        return `Are you sure you want to delete stream - ${stream.title}?`;
    };

    render(){
        const { history } = this.props;
        return(
            <Modal
                title='Delete Stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={ () => history.push('/') }
            />
        );
    }
}

const mapStateToProps = ( state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(withRouter(StreamDelete));