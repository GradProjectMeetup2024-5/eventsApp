import { EDIT_ID, CREATE,FETCH_ALL, FETCH_ID ,CREATE_EVENT,
    EDIT_SUBJECT_ID,ADD_SUBJECT_STUDENT,MY_JOINED_EVENTS} from '../actionTypes';

export default (eventUser = [], action) => {
    switch (action.type) {
          case CREATE:
              return [...eventUser,action.payload]
              case CREATE_EVENT:
                return [...eventUser,action.payload]
                case MY_JOINED_EVENTS:
                  return  action.payload 
           case FETCH_ID:
            return [action.payload]
            case EDIT_ID:
            return [...eventUser,action.payload]
            case EDIT_SUBJECT_ID:
            return [...eventUser,action.payload] 
            case ADD_SUBJECT_STUDENT:
              return [...eventUser,action.payload]   
        
              
      default:
        return eventUser;
    }
  };