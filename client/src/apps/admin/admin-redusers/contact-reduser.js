// in src/bitcoinRateReducer.js
import {instance} from "../../../api/api";

const SET_CONTACT = 'ADMIN_CONTACT_REDUCER';

export default (previousState = 0, { type, payload }) => {
    if (type === SET_CONTACT) {
        return payload.rate;
    }
    return previousState;
}

const action = {
    setContacts: (payload) => ({
        type: SET_CONTACT,
        payload
    })
}


export const getContacts = () => async (dispatch) => {
  const response =  await instance.get(`/api/contacts`);
    console.log(response);
};