import React, { useEffect, useState } from 'react'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3'

function App(props) {
  const config = {
    public_key: 'FLWPUBK_TEST-9ac1a2fc0ffd173140059633e0251637-X',
    tx_ref: Date.now(),
    amount: props.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'okwuchiedozie@gmail.com',
      phone_number: '070********',
      name: 'Okwu chiedozie',
    },
    customizations: {
      title: 'Digital Boost',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

  const fwConfig = {
    ...config,
    text: 'Pay now',
    callback: (response) => {
      console.log(response)
      closePaymentModal() // this will close the modal programmatically
      props.finishedtrans()
    },
    onClose: () => {},
  }

  return (
    <div className='App'>
      <FlutterWaveButton
        {...fwConfig}
        className='bg-softRed px-4 md:px-4 py-2  rounded-md text-white  text-xs md:text-base'
      />
    </div>
  )
}
export default App
