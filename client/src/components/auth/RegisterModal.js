import React, {useState,useEffect} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
  } from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux'


function RegisterModal (props) {

    const [state, setState] = useState({
        modal:false,
        name:'',
        email:'',
        password:'',
        msg:null
    })
 

    useEffect(()=>{
            // Check for register error
            if (props.error.id === 'REGISTER_FAIL') {
                setState({...state, msg: props.error.msg.msg });
            } else {
                setState({...state, msg: null });
            }

    },[props.error])
 
    useEffect(()=>{
          // If authenticated, close modal
            if (state.modal) {
                if (props.isAuthenticated) {
                    toggle();
                }
            }

    },[props.isAuthenticated])


    const toggle = () => {
        props.clearErrors()
        setState({...state,modal:!state.modal})
    }
    const onChange = e => {
        setState({...state, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {

        e.preventDefault()
        const { name, email, password } = state
        // Create user object
        const newUser = {
          name,
          email,
          password
        }
          // Attempt to register
          props.register(newUser);
    }

    return (
        <div>
          
            <NavLink onClick={toggle} href='#'>
               Register
            </NavLink>


            <Modal isOpen={state.modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Register User</ModalHeader>
            <ModalBody>
            {state.msg ? (
              <Alert color='danger'>{state.msg}</Alert>
            ) : null}
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Name'
                        className='mb-3'
                        onChange={onChange}
                        />

                        <Label for='email'>Email</Label>
                        <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        className='mb-3'
                        onChange={onChange}
                        />

                        <Label for='password'>Password</Label>
                        <Input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        className='mb-3'
                        onChange={onChange}
                        />
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                        Register
                        </Button>
                    </FormGroup>
                </Form>

            </ModalBody>
            </Modal>

        </div>
    )
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error:state.error
  })


  const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => dispatch(register(data)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterModal)