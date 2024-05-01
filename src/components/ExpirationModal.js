import React from "react";
import { Link } from "react-router-dom";
import { BaseWhiteBoxOverlay } from "./BaseWhiteBoxOverlay";

export function ExpirationModal() {
    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col w-3/4 h-2/5 sm:max-lg:w-1/2 sm:max-lg:h-1/3 xl:w-1/5"}>
            <div className={"w-2/3 h-full flex flex-col justify-evenly items-center"}>
                <img src={'./error.png'} className={"opacity-80"} alt={"imagem de um círculo com um X no centro indicando erro"}></img>
                <h1 className={"font-bold text-center"}>Sua sessão expirou.</h1>
                <p className={"text-center text-md"}>Por favor, faça o Login novamente.</p>
                <Link className={"text-gray-500 underline text-lg"} to={"/"}>Sair</Link>
            </div>
        </BaseWhiteBoxOverlay>
    )
}