import { React } from 'react'
import Title from '../Title'
import Table from '../Table'


function Home() {
    return (
        <div className={'w-screen h-screen flex flex-col justify-center overflow-hidden'}>
            <Title/>
            <Table />
        </div>
    )
}

export default Home