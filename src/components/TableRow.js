import { React } from 'react'

function TableRow(props) {

    const { product, changeOpen, selectProduct } = props

    return (
        <tr className={"text-center flex justify-evenly"}>
            <td className={"p-2 w-1/2 truncate"}>{product.product}</td>
            <td className={"p-2 w-1/5"}>{product.amount}</td>
            <td className={"p-2 w-1/3 truncate md:max-lg:text-sm"}>R$ {product.value}</td>
            <td className={"p-2 w-1/4"}><button onClick={() => {
                selectProduct(product.id)
                changeOpen()
            }}
                type={"button"} className={"bg-sky-600 w-full h-7 rounded-2xl text-white xl:w-2/3"}>Ver</button></td>
        </tr>
    )
}

export default TableRow