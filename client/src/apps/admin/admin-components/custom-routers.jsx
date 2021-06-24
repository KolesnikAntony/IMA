import * as React from "react";
import { Route } from 'react-router-dom';
import Contacts from "./contacts";
import ContactsEdit from "./contacts-edit";

export default [
    <Route exact path="/contacts" component={Contacts} />,
    <Route exact path="/contacts/edit" component={ContactsEdit} />,
];