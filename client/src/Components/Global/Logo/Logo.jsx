import React from 'react'
import { assets } from '../../../assets/assets'

const Logo = ({foot=false}) => {
  return (
    <div className="flex flex-col justify-center cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <span className="font-bold text-xl tracking-tighter">
                     <img src={assets.logo} alt="" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-bold text-${foot?"white":"gray-900"} tracking-tight leading-none`}>
                    KRJ
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider leading-tight mt-0.5">
                    Knowledge Raising Junction
                  </span>
                </div>
              </div>
            </div>
  )
}

export default Logo
