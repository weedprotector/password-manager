import React, { FC } from "react"
import { PasswordPair } from "../types"

interface PasswordTableProps {
    pairs: PasswordPair[]
}

const PasswordTable: FC<PasswordTableProps> = ({pairs}) => {
    const body = pairs.map(pair => (
        <tr key={pair.service}>
            <td className="border border-indigo-600">{pair.service}</td>
            <td className="border border-indigo-600">{pair.password}</td>
        </tr>
    ))

    return (
        <table className="border-collapse border border-indigo-600 w-2/3 mx-auto mt-5">
            <thead>
                <tr>
                    <th className="border border-indigo-600">Сервис</th>
                    <th className="border border-indigo-600">Пароль</th>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    )
}

export default PasswordTable