import { React } from 'react'

export function TableRow(props) {

    const { product, selectProduct } = props

    return (
        <tr className={"text-center flex justify-evenly"}>
            <td className={"p-2 w-1/2 truncate"}>{product.productName}</td>
            <td className={"p-2 w-1/5"}>{product.amount}</td>
            <td className={"p-2 w-1/3 truncate md:max-lg:text-sm"}>R$ {product.value}</td>
            <td className={"p-2 w-1/4"}><button onClick={() => {
                selectProduct(product.id)
            }}
                type={"button"} className={"bg-sky-600 w-full h-7 rounded-2xl text-white xl:w-2/3"}>Ver</button></td>
        </tr>
    )
}