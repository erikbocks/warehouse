import { React } from 'react'

function ResponseAlert(props) {

    if (!props.visible) return null

    function handleButtonClick() {
        props.setOpen(false)
    }

    return (
        <div className={'fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'}>
            <div className={'bg-white rounded-2xl w-5/6 h-80 flex flex-col justify-evenly items-center xl:w-1/6'}>
                <div className={'w-full h-30 flex justify-center'}>
                    <img className={'opacity-80'} src={props.data.image.imageSrc} alt={props.data.image.imageAlt}></img>
                </div>
                <div className={'w-full h-6 flex justify-center items-center'}>
                    <h2 className={'font-medium text-3xl '}>{props.data.title}</h2>
                </div >
                <div className={'w-72 h-50 h-8'}>
                    <h2 className={'text-center'}>{props.data.message}</h2>
                </div>
                <button onClick={handleButtonClick} className={'bg-sky-600 w-20 h-8 text-white rounded-full'}>
                    OK
                </button>
            </div>
        </div>
    )

}

export default ResponseAlert