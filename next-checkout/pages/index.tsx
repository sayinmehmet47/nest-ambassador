export default function Home() {
  return (
    <div className="w-full grid h-screen">
      <div className="flex flex-col justify-center text-center ">
        <div className="font-bold text-2xl">Welcome</div>
        <p>has invited you to buy these products!</p>
      </div>
      <div className="max-w-7xl lg:w-10/12 md:w-10/12 w-full px-5 py-10 m-auto  mt-1 bg-white rounded-lg shadow-lg   gap-10 flex md:flex-row  flex-col-reverse">
        <form className="flex-auto " action="">
          <div className="flex gap-2 flex-col mt-2">
            <div className="justify-between flex md:flex-row sm:flex-col flex-col gap-2">
              <div className="flex-1 flex-col">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex-col flex-1">
                <label
                  htmlFor="first_name"
                  className="mb-2 font-medium text-sm block text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
            {/* username */}
            <div className="flex flex-col mt-2">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-sm block text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-sm block text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className=" flex md:flex-row sm:flex-col flex-col gap-2 mt-2">
              <div className="flex-1 flex-col ">
                <label
                  htmlFor="first_name"
                  className="mb-2 font-medium text-sm block text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                />
              </div>
              <div className="flex-col flex-1">
                <label
                  htmlFor="first_name"
                  className="mb-2 font-medium text-sm block text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
            <div className="mt-2">
              <button className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </form>

        {/* products */}
        <div className="flex flex-col  flex-1">
          <div className="text-lg font-bold block text-sky-700 ">Products</div>
          <ul className=" text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
            <li className="py-4 px-4 w-full rounded-t-lg border-b border-gray-200">
              Profile
            </li>
            <li className="py-4 px-4 w-full border-b border-gray-200 ">
              Settings
            </li>
            <li className="py-4 px-4 w-full border-b border-gray-200 ">
              Messages
            </li>
            <li className="py-4 px-4 w-full rounded-b-lg">Download</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
