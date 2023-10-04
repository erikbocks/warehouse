import { React } from 'react'
import { DateFormatter } from '../utils/DateFormatter'

function TableRow(props) {

    const { product, setOpen, setProductKey } = props

    return (
        <tr className={"text-center"}>
            <td className={"p-2"}>{product.product}</td>
            <td className={"p-2"}>{product.amount}</td>
            <td className={"p-2 md:max-lg:text-sm"}>R$ {product.value}</td>
            {window.innerWidth > 768 && <td className={"p-2 md:max-lg:text-sm"}>{DateFormatter(product.addedOn)}</td>}
            {window.innerWidth > 768 && <td className={"p-2 md:max-lg:text-sm"}>{DateFormatter(product.lastEdit)}</td>}
            {window.innerWidth < 768 && <td className={"p-2"}><button onClick={() => {
                setProductKey(product.id)
                setOpen(true)
            }}
                type={"button"} className={"bg-blue-600 w-3/4 h-7 rounded-2xl text-white"}>Ver</button></td>}
        </tr>
    )
}

export default TableRow