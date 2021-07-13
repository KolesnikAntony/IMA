import React, {useCallback} from 'react';
import {instance} from "../api/api";
import './testtt.scss'

const TestCheck =  () => {

    const base_url ='http://localhost:3000'

    const obj = {
        payumoney () {
            let data = {
                'txnid': 'lallal',
                'email': 'kolesiaaa@gmail.com',
                'amount': 100,
                'productinfo': ['lalal, lalalal, lalala'],
                'firstname': 'Anton'
            };

            let pd = {
                key: "JBZaLc",
                txnid: 'lallal',
                amount: '100',
                firstname: 'Anton',
                email: 'kolesiaaa',
                phone: '38035384862',
                productinfo: '[lalal, lalalal, lalala]',
                surl: '+38035384862',
                furl: 'http://localhost:3000',
                hash: ''
            };
            let self = this;

            instance.post('api/payumoney', JSON.stringify(data)).then(a => {
                pd.hash = a.data.hash;
                self.redirectToPayU(pd);
            });
        },
        redirectToPayU(pd:any) {
            //use window.bolt.launch if you face an error in bolt.launch
            //@ts-ignore
            window.bolt.launch(pd, {
                responseHandler: function (response:any) {
                    console.log(response,'----success resp');
                    // your payment response Code goes here
                    // fetch(base_url + 'api/payumoney/response', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify(response.response)
                    // })
                    //     .then(function (a) {
                    //         return a.json();
                    //     })
                    //     .then(function (json) {
                    //         console.log(json);
                    //     });
                },
                catchException: function (response: any) {
                    console.log(response,'----error resp');
                    // the code you use to handle the integration errors goes here
                    // Make any UI changes to convey the error to the user
                }
            });
        }

    };


    const handleSubmit = useCallback(async () => obj.payumoney(), []);

    return <div className='test'>
        <button onClick={handleSubmit}>Test</button>
    </div>

};

export default TestCheck;
