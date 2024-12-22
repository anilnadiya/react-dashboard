import React from "react";
import Modal from 'react-modal'
import PropTypes from 'prop-types';

Modal.setAppElement("#root");

const GlobalModal = ({ isOpen, onClose, children, customStyles }) => {
    const defaultStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            position: 'relative',
            background: 'white',
            borderRadius: '4px',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
            outline: 'none',
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles || defaultStyles} >
            <button style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
            }}
                onClick={onClose}
            >
                ✕
            </button>
            {children}
        </Modal>
    )

}

GlobalModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    customStyles: PropTypes.object 
}

export default GlobalModal;