import React from 'react';
import { Box, Layer, Heading } from 'grommet';
import { LinkPrevious } from 'grommet-icons';


const Modal = ({children, close, title}) => {
    return (
        <Layer
            modal={true}
            onEsc={close}
            onClickOutside={close}
            overflow="scroll"
            responsive={true}
            animation="fadeIn"
            cy-data="modal"
        >
            <Box
                direction="row"
                align="center"
                justify="center"
                pad="medium"
                gap="medium"
                fill="horizontal"
                round={{size: "small", corner: "top"}}
                background="background-contrast"
                style={{position: 'relative'}}
            >
                <Box
                    style={{position: "absolute", left: "8px"}}
                    round="small"
                    hoverIndicator
                    pad="small"
                    onClick={close}
                    data-cy="close-modal"
                >
                    <LinkPrevious />
                </Box>
                <Heading
                    margin="none"
                    textAlign="center"
                    fill
                    level={2}
                    size="small"
                >
                    {title}
                </Heading>
            </Box>
            <Box>
                {children}
            </Box>
        </Layer>
    )
}

export default Modal;