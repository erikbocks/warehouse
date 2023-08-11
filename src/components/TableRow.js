import { React } from 'react'

function TableRow(props) {

    console.log(props)

    return (
        props.products.map((product) => {
            return <tr key={product.item_id}>
                <td className={"tableData"}>{product.item}</td>
                <td className={"tableData"}>{product.amount}</td>
                <td className={"tableData"}>{product.added_on}</td>
                <td className={"tableData"}>{product.last_edit}</td>
                <td colSpan={2}>
                    <button className={"tableEditButton"} onClick={() => {
                        props.setOpen(true)
                        props.setProductId(product)
                    }}>Edit</button>
                    <button className={"tableRemoveButton"} onClick={() => props.setProductKey(product.item_id)}>Delete</button></td>
            </tr>
        })
    )
}

export default TableRow