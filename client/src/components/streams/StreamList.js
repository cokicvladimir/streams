import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component{

    componentDidMount() {
        //get streams from api
        this.props.fetchStreams();
    }

    //show Edit and Delete buttons on stream if user is logged in
    renderAdmin(stream)  {
        if( (stream.userId === this.props.currentUserId) && (this.props.currentUserId !== null)){
            return (
                <div className='right floated content'>
                    <Link to={`streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                    <Link to={`streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
                </div>
            );
        }
    }

    //show 'create stream' button if user is logged in
    renderCreate = () => {
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to='/streams/new' className='ui button primary'>Create Stream</Link>
                </div>
            );
        }
    };

    //show list of all streams
    renderList = () => {
        return this.props.streams.map( stream => {
            return (
                <div className='item' key={stream.id}>
                    { this.renderAdmin(stream) }
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        <Link to={`/streams/${stream.id}`} className='header'>
                            {stream.title}
                        </Link>
                    </div>
                    <div className='description'>{stream.description}</div>
                </div>

            );
        });
    };

    render(){
        return(
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    { this.renderList() }
                </div>
                { this.renderCreate() }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export  default connect(mapStateToProps, {fetchStreams})(StreamList);