import { EDIT_ID, CREATE,FETCH_ALL, FETCH_ID ,CREATE_EVENT,
    EDIT_SUBJECT_ID,ADD_SUBJECT_STUDENT} from '../actionTypes';

export default (event = [], action) => {
    switch (action.type) {
          case CREATE:
              return [...event,action.payload]
              case CREATE_EVENT:
                return [...event,action.payload]
          case FETCH_ALL:
              return action.payload
          case FETCH_ID:
            return [action.payload]
            case EDIT_ID:
            return [...event,action.payload]
            case EDIT_SUBJECT_ID:
            return [...event,action.payload] 
            case ADD_SUBJECT_STUDENT:
              return [...event,action.payload]   
        
              
      default:
        return event;
    }
  };