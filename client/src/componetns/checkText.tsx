import React, {useCallback} from 'react';
import {instance} from "../api/api";
import './testtt.scss'

const TestCheck = () => {
    let data = {
        'txnid': 'lallal',
        'email': 'kolesiaaa@gmail.com',
        'amount': 100,
        'productinfo':['lalal, lalalal, lalala'],
        'firstname':'Anton'
    };

    const handleSubmit = useCallback(async () => {
        const res = await instance.post('api/',  JSON.stringify(data));
        console.log(res);
    }, []);

    return <div className='test'> <button onClick={handleSubmit}>Test</button></div>

};

export default TestCheck;
