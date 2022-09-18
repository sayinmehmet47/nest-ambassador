import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { IFormInput } from './models/interfaces';
import { schema } from './models/validatin';
import { Products } from '../components/Products';
import { useBasket } from '../zustand';
import axios from 'axios';

const fetcher = (url) => fetch(url).then((res) => res.json());

declare var Stripe;

export default function Home() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { code } = router.query;
  const baskets = useBasket((state) => state.baskets);

  const { data, error } = useSWR(
    `http://localhost:8000/api/checkout/links/${code}`,
    fetcher
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    const dataToSend = baskets.map((b) => {
      return { product_id: b.id, quantity: b.quantity };
    });
    const orders = { ...data, products: dataToSend };
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/checkout/orders',
        orders
      );
      const stripe = new Stripe(
        'pk_test_51LP6aiGCJMINMCUu3IORbXLsC0BdY227snNxLUSOcnAGk7PKfvNj9GdEkrddwqFoUc7e7VzmIaLuL1NTX6bz83hn00uJ2Lz06v'
      );
      stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  return (
    <div className="w-full grid h-screen">
      <div className="flex flex-col justify-center text-center ">
        <div className="font-bold text-2xl">Welcome</div>
        <p>has invited you to buy these products!</p>
      </div>
      <div className="max-w-7xl lg:w-10/12 md:w-11/12 w-full px-5 py-10 m-auto  mt-1 bg-white rounded-lg shadow-lg   gap-10 flex md:flex-row  flex-col-reverse">
        <form className="flex-auto " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-sky-600">Checkout Form</h1>
          <div className="flex gap-2 flex-col mt-2">
            <div className="justify-between flex md:flex-row sm:flex-col flex-col gap-2">
              <div className="flex-1 flex-col">
                <label
                  htmlFor="first_name"
                  className={clsx(
                    { 'text-red-400': errors.first_name },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  First name
                </label>
                <input
                  type="text"
                  {...register('first_name')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p className={clsx({ 'text-red-400': errors.first_name })}>
                  {errors.first_name?.message}
                </p>
              </div>
              <div className="flex-col flex-1">
                <label
                  htmlFor="last_name"
                  className={clsx(
                    { 'text-red-400': errors.last_name },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  Last name
                </label>
                <input
                  type="text"
                  {...register('last_name')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>{errors.last_name?.message}</p>
              </div>
            </div>
            {/* username */}
            <div className="flex flex-col mt-2">
              <label
                htmlFor="email"
                className={clsx(
                  { 'text-red-400': errors.email },
                  'block mb-2 text-sm font-medium text-gray-900'
                )}
              >
                Email
              </label>
              <input
                type="text"
                {...register('email')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="flex flex-col mt-2">
              <label
                htmlFor="address"
                className={clsx(
                  { 'text-red-400': errors.address },
                  'block mb-2 text-sm font-medium text-gray-900'
                )}
              >
                Address
              </label>
              <input
                type="text"
                {...register('address')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <p>{errors.address?.message}</p>
            </div>
            <div className=" flex md:flex-row sm:flex-col flex-col gap-2 mt-2">
              <div className="flex-1 flex-col ">
                <label
                  htmlFor="country"
                  className={clsx(
                    { 'text-red-400': errors.country },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  Country
                </label>
                <input
                  {...register('country')}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                />
                <p>{errors.country?.message}</p>
              </div>
              <div className="flex-col flex-1">
                <label
                  htmlFor="city"
                  className={clsx(
                    { 'text-red-400': errors.city },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  City
                </label>
                <input
                  type="text"
                  {...register('city')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>{errors.city?.message}</p>
              </div>
            </div>
            <div className=" flex md:flex-row sm:flex-col flex-col gap-2 mt-2">
              <div className="flex-1 flex-col ">
                <label
                  htmlFor="zip"
                  className={clsx(
                    { 'text-red-400': errors.zip },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  Zip
                </label>
                <input
                  {...register('zip')}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                />
                <p>{errors.zip?.message}</p>
              </div>
              <div className="flex-col flex-1">
                <label
                  htmlFor="code"
                  className={clsx(
                    { 'text-red-400': errors.code },
                    'block mb-2 text-sm font-medium text-gray-900'
                  )}
                >
                  Code
                </label>
                <input
                  type="text"
                  {...register('code')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>{errors.code?.message}</p>
              </div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </form>
        <Products products={data.products} />
      </div>
    </div>
  );
}
