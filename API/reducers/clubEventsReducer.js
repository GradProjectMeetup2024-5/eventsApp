import {FETCH_CLUB_EVENTS} from '../actionTypes';
  
  export default (clubEvent = [], action) => {
    switch (action.type) {
          case FETCH_CLUB_EVENTS:
            console.log("form reducer",action.payload)
            return  { ...clubEvent, clubEvent: action.payload };
      default:
        return clubEvent;
    }
  };