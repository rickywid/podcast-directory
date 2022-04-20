import { useEffect, useRef, useState } from 'react'
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


interface Props {
    data: any;
    updateMyList?: (list: []) => void
}


const PodcastItem = ({ data, updateMyList }: Props) => {
    const [selected, setSelected] = useState<any>({ id: null })
    const [isFavourite, setIsFavourite] = useState<boolean>(false)
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
        setSelected(data.data.feed)

        checkIsFavourite(data.data.feed.url)
    }

    const checkIsFavourite = (feedUrl: string) => {
        const myList = JSON.parse(localStorage.getItem('my-list')!)
        const bool = myList.indexOf(feedUrl) > -1
        setIsFavourite(bool)
    }

    const displayCategoryTags = (categories: any) => {
        let catList = []

        for (const prop in categories) {
            catList.push(categories[prop])
        }

        return catList.map((c: any, i: number) => {
            return <Tag key={i} colorScheme={"green"} size="sm" mr={2}>{c}</Tag>
        })
    }

    const handleOnClick = (selected: any, feedUrl: string) => {
        setIsFavourite(!isFavourite)
        if (isFavourite) {
            let myList = JSON.parse(localStorage.getItem('my-list')!)
            myList = myList.filter((url: string) => url !== feedUrl)
            data = data.filter((d: any) => d.url !== feedUrl)
            localStorage.setItem('my-list', JSON.stringify(myList))

            if (updateMyList) {
                updateMyList(data)
            }
            onClose()
        } else {
            let myList = JSON.parse(localStorage.getItem('my-list')!)
            myList.push(feedUrl)
            localStorage.setItem('my-list', JSON.stringify(myList))
            // data = data.push(selected)

            if (updateMyList) {
                updateMyList(data)
            }
            onClose()
        }
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
                        </Box>
                        <a href={selected?.link} target="_blank"><Button width="100%" mt={5} colorScheme="yellow">Listen Now</Button></a>
                        <Button
                            width="100%"
                            mt={5}
                            onClick={(() => handleOnClick(selected, selected?.url))}
                        >{isFavourite ? 'Remove from List' : 'Add to List'}</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {data.map((p: any, i: number) => {
                return (
                    <Box key={i} m={2} maxW="115px" ref={btnRef} onClick={() => selectItem(p)}>
                        <img src={p.image || p.feedImage} alt={p.feedTitle} height="115px" width="115px" />
                        <Text fontSize="smaller" mt={2} lineHeight="1.2">{truncate(p.title)}</Text>
                    </Box>

                )
            })}
        </>
    )
}

export default PodcastItem