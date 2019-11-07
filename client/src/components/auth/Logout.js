import React, {Fragment} from 'react'
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout(props) {
    return (
          <Fragment>
            <NavLink onClick={props.logout} href='#'>
               Logout
            </NavLink>
          </Fragment>
    )
}

const mapStateToProps = (state) => ({
   
  })

  const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(logout ()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout)