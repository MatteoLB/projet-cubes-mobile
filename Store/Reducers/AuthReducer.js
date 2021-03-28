// Store/Reducers/AuthReducer.js

const initialState = { 
  account: {
    id: 6
  },
  isAuth: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlIjoxLCJpYXQiOjE2MTY1NzY4MjAsImV4cCI6MTYxNjY2MzIyMH0.Hs3MABGrCmXEFWGM11iLipFMaIS6ArdBsNdlWlSey1s"
};

function Auth(state = initialState, action) {
    let nextState;
    switch (action.type) {
      // case
    default:
      return state;
    }
}

export default Auth;