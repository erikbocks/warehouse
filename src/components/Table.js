import { React } from 'react'
import { TableRow } from '../components/TableRow'

function Table(props) {
    const { products, selectProduct } = props

    return (
        <div className={'w-full h-2/5 flex justify-center items-center sm:max-lg:h-2/6 overflow-y'}>
            <table className={"w-11/12 h-full flex flex-col justify-evenly overflow-auto rounded-2xl table-auto border-1 drop-shadow-md bg-white sm:max-lg:w-5/6 xl:w-1/2"} >
                <thead>
                    <tr className={"w-full flex shadow-md"}>
                        <th className={"p-2 w-1/2"}>Produto</th>
                        <th className={"p-2 w-1/5"}>Qtd</th>
                        <th className={"p-2 w-1/3"}>Valor</th>
                        <th className={"p-2 w-1/4"}>Mais</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => {
                        return <TableRow key={product.id} product={product} selectProduct={selectProduct} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table