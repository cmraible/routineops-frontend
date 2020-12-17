import React from 'react';
import { Box, Layer } from 'grommet';
import { LinkPrevious } from 'grommet-icons';


const Modal = ({children, close}) => {
    return (
        <Layer
            modal={true}
            onEsc={close}
            onClickOutside={close}
            plain
            full
            animation="fadeIn"
            style={{backdropFilter: 'blur(12px) brightness(50%)', WebkitBackdropFilter: 'blur(12px) brightness(50%)'}}
        >
            <Box justify="center" fill="vertical" pad="small">
                <Box
                    style={{position: "relative"}}
                    width="large"
                    pad={{horizontal: "medium", bottom: "medium"}}
                    elevation="medium"
                    gap="medium"
                    round="small"
                    alignSelf="center"
                    justify="start"
                    flex={false}
                    background="background"
                >
                    <Box
                        style={{position: "absolute", top: 16, left: 16}}
                        round="small"
                        hoverIndicator
                        pad="small" direction="row" alignSelf="start" onClick={close}>
                        <LinkPrevious />
                    </Box>
                    {children}
                </Box>
            </Box>
        </Layer>
    )
}

export default Modal;