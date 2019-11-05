import React, {useEffect} from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'

function ShoppingList(props) {

    useEffect(() => {
        props.getItems()
     
    },[])

    const deleteItemClick = (id) => {
        props.deleteItem(id)
    }
    const { items } = props.item
    return (
        <Container>
       

            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {
                        items.map(item => (
                            
                                <CSSTransition key={item._id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={()=> deleteItemClick(item._id)}
                                        >
                                        &times;
                                        </Button>
                                        {item.name}
                                    </ListGroupItem>
                                </CSSTransition>
                            
                        ))
                    }
                </TransitionGroup>
            </ListGroup>
        </Container>
    )

}

const mapStateToProps = (state) => ({
    item: state.item
})

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        deleteItem: (id) => dispatch(deleteItem(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingList)