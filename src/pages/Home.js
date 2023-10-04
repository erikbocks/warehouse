import { React } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'

function Home() {
    return (
        <div className={'w-screen h-screen flex flex-col overflow-hidden'}>
            <Title />
            <Table />
        </div>
    )
}

export default Home