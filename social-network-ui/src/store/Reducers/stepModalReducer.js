import { SET_STEP_MODAL, SET_VALUE_MODAL, NEW_USER_DATA_FIRST_STEP_REGISTRATION, step4 } from "../types";

let initialState = {
  stepModal: {
    step: 1,
    valuesState: ""
  }
};

export function stepModalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STEP_MODAL:
      return {
        ...state,
        stepModal: {
          ...state.stepModal,
          step: action.step
        }
      };
      case SET_VALUE_MODAL:
        return {
          ...state,
          stepModal: {
            ...state.stepModal,
            valuesState: action.payload.valuesState
          }
        };
      case NEW_USER_DATA_FIRST_STEP_REGISTRATION:
          const step1State = {
            stepModal: {
              ...state.stepModal,
              step: 2,
              valuesState: action.payload.valuesState
            }
          };
          return {
            ...state,
            ...step1State
          };

      case step4:
        const step4State = {
          stepModal: {
            ...state.stepModal,
            step: 4,
            valuesState: action.payload.valuesState
          }
        };
        return {
          ...state,
          ...step4State
        };
    default:
      const savedStepInModal = parseInt(localStorage.getItem("stepInModal"));
      if (savedStepInModal && savedStepInModal >= 1 && savedStepInModal <= 4) {
        return {
          ...state,
          stepModal: {
            ...state.stepModal,
            step: savedStepInModal
          }
        };
      } else {
        return state;
      }
  }
};
