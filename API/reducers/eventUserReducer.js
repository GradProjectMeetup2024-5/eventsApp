import { 
    CREATE,CREATE_EVENT,
    MY_CREATED_EVENT,JOIN_EVENT,
    MY_JOINED_EVENTS,
    CHECK_IF_USER_JOINED_EVENT,
    LEAVE_EVENT
    } from '../actionTypes';

export default (eventUser = [], action) => {
  switch (action.type) {
        case CREATE:
            return [...eventUser,action.payload]
            case CREATE_EVENT:
              return [...eventUser,action.payload]
              case MY_CREATED_EVENT:
                return action.payload
              case JOIN_EVENT :
                return {...eventUser,joinEvent:action.payload} 
              case MY_JOINED_EVENTS:
                return {...eventUser,myJoinedEvents:action.payload}
              case CHECK_IF_USER_JOINED_EVENT:
                return {...eventUser,checkIfUserJoinedEvent:action.payload}
                case LEAVE_EVENT:
                  return {...eventUser,leaveEvent:action.payload}       
    default:
      return eventUser;
  }
};