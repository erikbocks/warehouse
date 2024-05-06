import { React } from 'react'
import { BaseWhiteBoxOverlay } from './BaseWhiteBoxOverlay'

function ResponseAlert(props) {

    let { closeFunction, image, title, message } = props

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col justify-evenly w-3/4 h-1/2 sm:max-lg:w-1/2 sm:max-lg:h-1/3 xl:w-1/6 xl:h-1/2"}>
            <div className={'w-full h-30 flex justify-center'}>
                <img className={'opacity-80'} src={image.imageSrc} alt={image.imageAlt}></img>
            </div>
            <div className={'w-full h-6 flex justify-center items-center'}>
                <h2 className={'font-medium text-2xl md:max-lg:text-3xl xl:text-2xl'}>{title}</h2>
            </div >
            <div className={'w-5/6 h-auto'}>
                <p className={'text-center md:max-lg:text-lg'}>{message}</p>
            </div>
            <button onClick={closeFunction} className={'bg-sky-600 w-24 h-10 text-white rounded-full'}>
                Fechar
            </button>
        </BaseWhiteBoxOverlay>
    )
}

export default ResponseAlert