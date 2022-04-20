import { useRef, useState } from 'react'
import {
    Box,
    Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Heading,
    Tag,
    Button
} from '@chakra-ui/react'
import truncate from '../utils/truncate'

const PodcastSearchItem = ({ data }: any) => {
    const [selected, setSelected] = useState<any>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)

    const selectItem = async (p: any) => {
        onOpen()
        const res = await fetch('/api/getPodcast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedUrl: p.url })
        })

        const data = await res.json()
        console.log(data.data.feed)
        setSelected(data.data.feed)
    }

    const displayCategoryTags = (categories: any) => {
        let catList = []

        for (const prop in categories) {
            catList.push(categories[prop])
        }

        return catList.map((c: any) => {
            return <Tag colorScheme={"green"} size="sm" mr={2}>{c}</Tag>
        })
    }

    const handleAddToFav = (id: number) => {
        const myList = localStorage.getItem('my-list')
        console.log(myList)
        // localStorage.setItem('my-list',)
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader><img src={selected?.image} alt={selected?.title} /></DrawerHeader>
                    <DrawerBody>
                        <Heading as="h2" size="md" mb={2}>{selected?.title}</Heading>
                        <Text fontSize="smaller" mb={5}>{selected?.author}</Text>
                        <Text>{selected?.description}</Text>
                        <Box mt={5}>
                            {displayCategoryTags(selected?.categories)}
                            <Tag size="sm" colorScheme={"red"}>{selected?.explicity ? 'NSFW' : 'SFW'}</Tag>
                        </Box>
                        <a href={selected?.link} target="_blank">
                            <Button
                                width="100%"
                                colorScheme={"yellow"}
                                mt={5}
                            >Listen Now</Button>
                            <Button width="100%" mt={5} onClick={(() => handleAddToFav(selected?.id))}>Add To Favourites</Button>
                        </a>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box m={2} maxW="115px" ref={btnRef} onClick={() => selectItem(data)}>
                <img src={data.image || data.image} alt={data.title} height="115px" width="115px" />
                <Text fontSize="smaller" mt={2} lineHeight="1.2">{truncate(data.title)}</Text>
            </Box>
        </>
    )
}

export default PodcastSearchItem