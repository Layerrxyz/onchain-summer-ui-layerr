import React from 'react'

function SuccessBanner() {
  return (
    <div className="max-w-screen-xl w-full px-2 sm:px-4">
      <div className="p-2 rounded-lg bg-green-50 shadow-lg sm:p-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <img className="h-6" src="https://www.tailwindcss.cn/img/tailwind-ui-logo-on-dark.svg" alt=""/>
            <p className="ml-3 font-medium text-white truncate">
              <span className="text-gray">
                <strong className=" text-green-800 font-semibold mr-1">Success!</strong>
                <span className=" xl:inline whitespace-break-spaces">File uploaded and validated.</span>
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <div className="rounded-md shadow-sm">
              <a href="https://tailwindui.com?utm_source=tailwindcss&amp;utm_medium=footer-banner" className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-900 bg-white hover:text-gray-800 focus:outline-none focus:underline">
                Download File
              </a>
            </div>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-800">
              <svg className="h-6 w-6 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessBanner