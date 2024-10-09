import React, { Dispatch, FC, SetStateAction } from 'react'

interface TogglerProps {
    isChecked: boolean
    onChange: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

const Toggler: FC<TogglerProps> = ({isChecked, onChange, children}) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={() => onChange(prev => !prev)}></input>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
        </label>
    )
}

export default Toggler