import {all} from 'redux-saga/effects';
import admin from './admin';


export default function *() {
    yield all([
        ...admin
    ])
}