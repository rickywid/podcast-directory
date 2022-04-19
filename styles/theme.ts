// theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    components: {
        Text: {
            // 1. We can update the base styles
            baseStyle: {
                color: 'grey'
            }
        },
    },
})

export default theme