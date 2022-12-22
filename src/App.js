import logo from './images/apple.png'
import briefcase from './images/briefcase.png'
import dress from './images/dress.png'
import headphone from './images/headphone.png'
import laptop from './images/laptop.png'
import speaker from './images/speaker.png'
import tv from './images/tv.png'
import { AiOutlineShopping } from 'react-icons/ai'
import { AiFillShopping } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { BsBagCheck } from 'react-icons/bs'
import { BsBagCheckFill } from 'react-icons/bs'
import { Profiler, useEffect, useState } from 'react'
import { TbShoppingCartOff } from 'react-icons/tb'
import { useFlutterwave } from 'flutterwave-react-v3'
import Flutterwave from './Flutterwave'
import { GrStatusGood } from 'react-icons/gr'

function App() {
  const [amount, setAmount] = useState('')
  const [processpay, setProcesspay] = useState(false)

  const config = {
    public_key: 'FLWPUBK_TEST-9ac1a2fc0ffd173140059633e0251637-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

  useFlutterwave(config)

  const data = [
    {
      id: 1,
      product: `Samsung Tv`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 300,
      image: tv,
    },
    {
      id: 2,
      product: `Leather briefcase`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 450,
      image: briefcase,
    },
    {
      id: 3,
      product: `Hp laptop`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 3000,
      image: laptop,
    },
    {
      id: 4,
      product: `Beats by Dr. Dre`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 380,
      image: headphone,
    },
    {
      id: 5,
      product: `JBL Speaker`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 750,
      image: speaker,
    },
    {
      id: 6,
      product: `Prada Gown`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque magnam itaque consequatur? Excepturi accusamus fugiat reprehenderit magnam est dolore nihil!',
      price: 1200,
      image: dress,
    },
  ]
  const [productcount, setProductcount] = useState([])
  const [cart, setCart] = useState(data)
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(false)
  const [paystatus, setPaystatus] = useState(false)
  const [payable, setPayable] = useState([])

  const handlecart = (item) => {
    setProducts([...products, item])
  }

  useEffect(() => {
    products.map((item) => {
      return setPayable([...payable, item.price])
    })
  }, [products])

  const handleremove = (item) => {
    setProducts([...products.filter((content) => content !== item)])
  }
  useEffect(() => {
    setProductcount(products.length)
    totalprice()
  }, [products])
  // calculating total price
  const totalprice = () => {
    let sum = 0
    products.forEach((item) => {
      sum += item.price
    })

    setAmount(sum)
    return sum
  }
  const handlepayment = () => {
    setProducts([])
    setModal(false)
    setPaystatus(!paystatus)
  }
  const finishedtrans = () => {
    setPaystatus(true)
  }

  let props = {
    amount,
    finishedtrans,
  }

  return (
    <>
      <div className=''>
        {/* header */}
        <nav className=' bg-white px-4 py-6 lg:px-20 lg:py-8 shadow-md shadow-veryLightGray fixed w-full  '>
          <div className='relative flex justify-between items-center'>
            {/* image */}
            <div className=''>
              <img src={logo} alt='' />
            </div>
            {/* shopping */}
            <div className='relative'>
              <div onClick={() => setModal(!modal)} className='cursor-pointer'>
                {products.length > 0 ? (
                  <AiFillShopping className='  text-4xl sm:text-4xl md:text-5xl text-veryLightGray' />
                ) : (
                  <AiOutlineShopping className='text-4xl sm:text-4xl md:text-5xl' />
                )}
              </div>
              {productcount > 0 ? (
                <h1 className='bg-softRed text-white text-center  rounded-full w-4 h-4 lg:w-5 lg:h-5  absolute -top-2  right-0 text-xs lg:text-sm'>
                  {productcount}
                </h1>
              ) : (
                ''
              )}
            </div>
          </div>
          {/* display products */}
          {modal ? (
            <div className='absolute bg-black opacity-100  top-0 bottom-0 right-0 left-0 min-h-screen  flex justify-center items-center z-40'>
              {products.length > 0 ? (
                <div className='bg-white shadow-sm shadow-white w-auto   px-10 py-4  rounded-md font-sans flex flex-col justify-center items-center space-y-8 list-inside  '>
                  <div className='font-sans flex justify-between w-full items-center gap-28 '>
                    <h1 className='text-xl font-bold '>Items</h1>
                    <h1 className='  text-xl font-bold '>Price</h1>
                  </div>
                  {products.map((item) => {
                    const { id, product, price, image } = item
                    return (
                      <div className='font-sans flex justify-between  items-center  w-full'>
                        <h1 className=' '>{product}</h1>
                        <h1 className=' text-red-500 font-bold '>
                          <span>$ </span>
                          {price}
                        </h1>
                      </div>
                    )
                  })}
                  <div className='border-t-2 border-softRed border-b-2 flex justify-between items-center w-full py-2'>
                    <h1>Total </h1>
                    <h1 className=' text-red-500 font-bold text-xl '>
                      <span>$ </span>
                      {amount}{' '}
                    </h1>
                  </div>
                  <div className='flex justify-between w-full items-center gap-2 md:gap-10'>
                    <Flutterwave {...props} />
                    <button
                      onClick={() => setModal(!modal)}
                      className='bg-blue px-4 md:px-4 py-2  rounded-md text-white  text-xs md:text-base'
                    >
                      Keep shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className='bg-white shadow-sm shadow-white max-w-xs md:max-w-sm xl:max-w-md  px-10 py-4  rounded-md font-sans flex flex-col justify-center items-center space-y-8'>
                  <TbShoppingCartOff className='text-8xl md:text-9xl' />
                  <h1>There is no item in you cart</h1>
                  <button
                    onClick={() => setModal(!modal)}
                    className='bg-softRed px-4 py-2 font-bold rounded-md'
                  >
                    shop now
                  </button>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
          {paystatus ? (
            <div className='absolute bg-black opacity-100  top-0 bottom-0 right-0 left-0 min-h-screen  flex justify-center items-center z-40'>
              <div className='bg-white shadow-sm shadow-white max-w-xs md:max-w-sm xl:max-w-md  px-10 py-4  rounded-md font-sans flex flex-col justify-center items-center space-y-8'>
                <GrStatusGood className='text-8xl md:text-9xl' />
                <h1>Thanks for your purchase</h1>
                <button
                  onClick={() => handlepayment()}
                  className='bg-softRed px-4 py-2 font-bold rounded-md'
                >
                  Return
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </nav>

        {/* products */}
        <div className='font-sans px-4 py-6  lg:px-20 lg:py-8 space-y-10 pt-24 sm:pt-28 lg:pt-36  xl:px-4 '>
          {/* header */}
          <div>
            <h1 className='font-bold text-lg sm:text-center'>All Products</h1>
          </div>
          {/* items */}
          <div className='space-y-8'>
            {/* item 1 */}
            {cart.map((item) => {
              const { price, description, product, id, image } = item
              return (
                <div
                  key={id}
                  className='bg-white space-y-8 flex flex-col justify-center items-center shadow-md  py-8 shadow-veryLightGray max-w-xs px-4 mx-auto rounded-md  sm:flex-row  sm:max-w-2xl sm:gap-6'
                >
                  {/* image */}
                  <div className='max-w-xs sm:w-1/2 '>
                    <img src={image} alt='' className='w-44 sm:w-60 mx-auto ' />
                  </div>
                  {/* text $ button */}
                  <div className='space-y-8 sm:w-1/2'>
                    {/* text */}
                    <div className='space-y-3 '>
                      <h1 className=''>
                        Product:
                        <span className='font-bold text-lg'>
                          {' '}
                          {product}
                        </span>{' '}
                      </h1>
                      <p className='max-w-xs text-sm'>
                        <span className='font-bold text-lg'>Description</span>{' '}
                        <br />
                        {description}
                      </p>
                      <p className='font-sans'>
                        Price :{' '}
                        <span className='font-bold text-lg'>{price}</span>
                      </p>
                    </div>
                    {/* button */}
                    <div className='flex justify-start gap-4 items-center '>
                      {/* btn1 */}

                      <div
                        onClick={() =>
                          products?.includes(item)
                            ? handleremove(item)
                            : handlecart(item)
                        }
                        className='flex items-center justify-center gap-2 bg-blue text-white px-4 py-2 rounded-md shadow-md cursor-pointer hover:-translate-y-2 duration-1000 hover:bg-veryLightGray'
                      >
                        <AiOutlineShoppingCart className='' />
                        <h1 className='text-sm'>
                          {products?.includes(item) ? 'Remove' : 'Add cart'}
                        </h1>
                      </div>

                      {/* btn2 */}
                      <div
                        className='flex items-center justify-center gap-2 bg-softRed text-white px-4 py-2 rounded-md shadow-md cursor-pointer hover:-translate-y-2 duration-1000 hover:bg-veryLightGray'
                        onClick={() => setModal(!modal)}
                      >
                        <BsBagCheck className='text-base' />
                        <h1 className='text-sm'>Check out</h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* payment */}
    </>
  )
}

export default App
