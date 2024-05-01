import { React } from 'react'

export function PageSelector(props) {

    let { incrementPage, decrementPage, left, right, selectedPage, totalPages } = props

    return (
        <div className={"w-full h-20 mt-5"}>
            <div className={"w-full h-1/2 flex justify-center items-center"}>
                <ul className={"flex flex-row justify-evenly items-center w-1/4 text-lg sm:max-lg:w-1/6 xl:w-1/12"}>
                    <li><button className={"disabled:text-gray-400 text-xl w-6"} onClick={decrementPage} disabled={left}>&lt;</button></li>
                    <li className={"bg-neutral-200 w-6 rounded-md text-center"}><h1>{selectedPage + 1}</h1></li>
                    <li><button className={"disabled:text-gray-400 text-xl  w-6"} onClick={incrementPage} disabled={right}>&gt;</button></li>
                </ul>
            </div>
            <div className={"text-center text-lg'"}>
                <h2>Mostrando página {selectedPage + 1} de {totalPages}.</h2>
            </div>
        </div>
    )
}