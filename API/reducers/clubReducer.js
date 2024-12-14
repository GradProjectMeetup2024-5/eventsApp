import { FETCH_ALL_CLUBS} from '../actionTypes';
  
  export default (event = [], action) => {
    switch (action.type) {
        //   case CREATE:
        //       return [...event,action.payload]
        //       case CREATE_EVENT:
        //         return [...event,action.payload]

                case FETCH_ALL_CLUBS:
                  
                  return action.payload 

        
              
      default:
        return event;
    }
  };