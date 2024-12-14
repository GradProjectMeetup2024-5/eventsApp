import { FETCH_ALL_CLUBS} from '../actionTypes';
  
  export default (club = [], action) => {
    switch (action.type) {
        //   case CREATE:
        //       return [...event,action.payload]
        //       case CREATE_EVENT:
        //         return [...event,action.payload]

                case FETCH_ALL_CLUBS:
                    console.log("DATA IN ACTION",action.payload)
                  return action.payload 

        
              
      default:
        return club;
    }
  };