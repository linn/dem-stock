import { connect } from 'react-redux';
import Callback from '../components/Callback';
import { loadUser } from 'redux-oidc';
import store from '../configureStore';
import userManager from '../helpers/userManager';
import history from '../history';

function mapDispatchToProps(dispatch) {
    return {
        onSuccess: user => {
            // TODO: This is a hack and should't be requried.  User isn't being loadded in reduc state on initial load in new browser.
            //loadUser(store, userManager);

            history.push(user.state.redirect);
        },
    };
}

export default connect(null, mapDispatchToProps)(Callback);
