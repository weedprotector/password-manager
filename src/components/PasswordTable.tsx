import React, { FC } from "react"
import { PasswordPair } from "../types"

interface PasswordTableProps {
    pairs: PasswordPair[]
}

const PasswordTable: FC<PasswordTableProps> = ({pairs}) => {
    const body = pairs.map(pair => (
        <tr key={pair.service}>
            <td className="border border-slate-300 ...">{pair.service}</td>
            <td className="border border-slate-300 ...">{pair.password}</td>
        </tr>
    ))

    return (
        <table className="border-collapse border border-slate-400">
            <thead>
                <tr>
                    <th className="border border-slate-300">Сервис</th>
                    <th className="border border-slate-300">Пароль</th>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    )
}

export default PasswordTable