import { Link } from "react-router-dom";

export function Home() {

    const arr: string[] = 'Publish your passions, your way'.split('');
  
    return (
      <div className='flex justify-center items-center bg-hero-pattern bg-no-repeat bg-cover h-screen'>
        <div className="flex flex-col items-center">
          <div className="text-[3rem] text-yellow-400 mb-3">
            <HoverLine str={arr}/>
          </div>
          <div className="text-white text-2xl mb-10 uppercase">
            <p>Create a unique and beautiful blog easily.</p>
          </div>
          <div className='text-xl w-fit text-white rounded-md px-5 py-3 bg-orange-400 transition delay-100 ease-in-out duration-500 shadow-sm shadow-white hover:shadow-white hover:shadow-yellow hover:-translate-y-1 hover:text-black hover:bg-yellow-400'>
            <Link to={'/signin'}>Start Now</Link>
          </div>
        </div>
      </div>
    )
  }

  function HoverLine ({str}: {str: string[]}) {

    return (
        <div>
            {
              str.map((item, index) => {
                  return <span key={index} className='hover:text-yellow-100 cursor-default'>{item}</span>
              })
            }
        </div>
    )
  }