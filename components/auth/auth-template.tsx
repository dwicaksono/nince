import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';

const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
  return (
    // <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    // 	<div className="h-full lg:flex flex-col items-center justify-center px-4">
    // 		<div className="text-center space-y-4 pt-16">
    // 			<h1 className="font-bold text-3xl text-[#2e2a47]">Welcome back!</h1>
    // 			<p className="text-base tex-[#7e8cca0]">
    // 				Log in or Create account to get back to your dashboard!
    // 			</p>
    // 		</div>
    // 		<div className="flex items-center justify-center mt-8">{children}</div>
    // 	</div>
    // 	<div className="h-full bg-blue-500 hidden lg:flex items-center justify-center flex-col">
    // 		<Image src="/logo.svg" alt="logo" width={100} height={100} />
    // 		<p className="text-white text-xs mt-2">Simplify, Amplify, Succeed.</p>
    // 	</div>
    // </div>
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-center bg-blue-600 bg-gradient-to-t from-blue-800 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="logo"
            src="/icons/logo-1.svg"
            width={100}
            height={100}
            className="absolute inset-0 h-full w-full object-cover opacity-10 blur-lg"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <Image
              alt="logo"
              src="/icons/logo-1.svg"
              width={100}
              height={100}
            />

            <h2 className="mt-3 text-2xl text-white sm:text-3xl md:text-4xl">
              Welcome to Mocksya 🎁
            </h2>

            <p className="mt-3 text-sm leading-tight text-white/50">
              Mocksya is a powerful tool to help you level up your job game.
              Practice for your next interview, build a standout CV, and get
              ready to impress! Try Mocksya today!
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-20 block lg:hidden">
              <Image
                alt="logo"
                src="/icons/logo-1.svg"
                width={100}
                height={100}
                className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
              />

              <h1 className="mt-2 text-2xl text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Nince 🎁
              </h1>

              <p className="mt-3 text-sm leading-tight text-white/50">
                Mocksya is a powerful tool to help you level up your job game.
                Practice for your next interview, build a standout CV, and get
                ready to impress! Try Mocksya today!
              </p>
            </div>
            {children}
            {/* 
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  for="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Email{' '}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {' '}
                  Password{' '}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label for="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {' '}
                    terms and conditions{' '}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form> */}
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthTemplate;
