// import React from 'react'
// import { SiMarketo } from 'react-icons/si'
// import { Link } from 'react-router-dom'

// export default function Footer() {
//   return (
//     <div className='md:px-[110px] px-2 flex my-6 justify-between gap-3'>
//       <div className="">
//         <div className="text-white p-2 rounded-sm bg-[#B6349A]">
//                   <SiMarketo size={25} />
//                 </div>
//       </div>
//       <div className="">
//         <h1>About</h1>
//         <p><Link to='#'>About Us</Link></p>
//         <p><Link to='#'>Our Branches</Link></p>
//         <p><Link to='#'>Changelog</Link></p>

//       </div>
//       <div className="">
//         <h1>Quick Links</h1>
//         <p>FAQs</p>
//         <p>Recipes</p>
//         <p>Contact Us</p>
//       </div>
//       <div className="">
//         <h1>Help & support</h1>
//         <p>Teams of privacy</p>
//         <p>Privacy policy</p>
//         <p>security</p>
//       </div>
//       <div className="">
//         <h1>Company</h1>
//         <p>Blog</p>
//         <p>Contact</p>
//       </div>
//       <div className="">
//         <h1>social</h1>
//         <p>FaceBook</p>
//         <p>Instagram</p>
//         <p>Twitter</p>
//       </div>

//       <p>all Right reserve {`now.fullyear()`} EmaStudio</p>
//     </div>
//   )
// }

import React from "react";
import { SiMarketo } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto md:px-[110px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <div className="text-white p-3 rounded-md bg-[#B6349A] w-fit">
              <SiMarketo size={25} />
            </div>
          </div>

          {/* About Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 mb-2">About</h3>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                About Us
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Our Branches
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Changelog
              </Link>
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                FAQs
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Recipes
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Contact Us
              </Link>
            </p>
          </div>

          {/* Help & Support Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 mb-2">Help & Support</h3>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Terms of Privacy
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Security
              </Link>
            </p>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 mb-2">Company</h3>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Blog
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Contact
              </Link>
            </p>
          </div>

          {/* Social Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 mb-2">Social</h3>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Facebook
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Instagram
              </Link>
            </p>
            <p>
              <Link to="#" className="text-gray-600 hover:text-[#B6349A]">
                Twitter
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            All Rights Reserved © {currentYear} EmaStudio
          </p>
        </div>
      </div>
    </footer>
  );
}
