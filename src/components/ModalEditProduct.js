import { React, useState } from 'react'
import { Box, Modal } from '@mui/material';
import { updateProduct } from '../api/axios';
import '../styles/ModalEditProduct.css'

function ModalEditProduct(props) {

    const [modalFormData, setModalFormData] = useState({
        product: props.productBeingEdited.item,
        amount: props.productBeingEdited.amount
    })

    // estiliza o modal
    const style = (theme) => ({
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 10,
        p: 4,

        [theme.breakpoints.down('sm')]: {
            width: 350,
            height: 260,
            p: 4,
        }
    })

    // fecha o modal
    const handleClose = () => {
        props.setOpen(false)
    }

    // lida com a mudança do input
    const handleInputChange = (e) => {

        const fieldName = e.target.getAttribute('name')
        const fieldValue = e.target.value

        setModalFormData({
            ...modalFormData,
            [fieldName]: fieldValue
        })
    }

    //lida com o envio do formulário
    async function handleSubmit(e) {
        e.preventDefault()

        const data = {
            product: modalFormData.product,
            amount: modalFormData.amount,
            last_edit: new Date().toLocaleString(),
            item_id: props.productBeingEdited.item_id
        }

        await updateProduct(data)

        await props.setOpen(false)

        props.setForceUpdate(true)
    }

    return (
        <>
            <Modal open={props.open} onClose={handleClose}>
                <Box sx={style}>
                    <div className='modalFormContainer'>
                        <div className={"modalTitle"}>
                            <h1>Novos Dados</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={"modalInputs"}>
                                <input type={"text"} placeholder={"Nome do Produto"} className={"modalText"} required minLength={1} maxLength={50} name={"product"} value={modalFormData.product} onChange={handleInputChange} ></input>

                                <input type={"number"} placeholder={"Quantidade"} className={"modalAmount"} required min={1} max={9999} name={"amount"} value={modalFormData.amount} onChange={handleInputChange}></input>

                                <button className={"modalButton"}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalEditProduct