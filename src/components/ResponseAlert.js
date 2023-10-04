import { React } from 'react'

function ResponseAlert(props) {

    let { setOpen, data } = props

    function handleButtonClick() {
        setOpen(false)
    }

    return (
        <div className={'fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'}>
            <div className={'bg-white rounded-2xl w-5/6 h-3/6 flex flex-col justify-evenly items-center md:max-lg:w-1/2 md:max-lg:h-2/5 xl:w-1/6 xl:h-2/4'}>
                <div className={'w-full h-30 flex justify-center'}>
                    <img className={'opacity-80'} src={data.image.imageSrc} alt={data.image.imageAlt}></img>
                </div>
                <div className={'w-full h-6 flex justify-center items-center'}>
                    <h2 className={'font-medium text-2xl md:max-lg:text-3xl xl:text-2xl'}>{data.title}</h2>
                </div >
                <div className={'w-5/6 h-auto'}>
                    <p className={'text-center md:max-lg:text-lg'}>{data.message}</p>
                </div>
                <button onClick={handleButtonClick} className={'bg-sky-600 w-24 h-10 text-white rounded-full'}>
                    OK
                </button>
            </div>
        </div>
    )

}

export default ResponseAlert