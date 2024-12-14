import { FETCH_ALL_CLUBS,FETCH_ONE_CLUB} from '../actionTypes';
  
  export default (club = [], action) => {
    switch (action.type) {
          case FETCH_ALL_CLUBS:
            return  { ...club, clubs: action.payload };
          case FETCH_ONE_CLUB:
            return { ...club,club:action.payload }
      default:
        return club;
    }
  };