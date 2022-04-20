import { useRef } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Box, Flex, Input, Button, Container, Text, Heading, Divider } from "@chakra-ui/react";
import Head from 'next/head'
import { useEffect, useState } from 'react'
import CategoriesList from '../components/categoriesList';
import PodcastItem from '../components/podcastItem';
import SearchResults from '../components/searchResults';
import { CloseIcon, Search2Icon } from '@chakra-ui/icons';
import SkeletonPodcastList from '../components/skeletonPodcastList';
import { AiFillHeart, AiOutlineHeart, AiOutlineSearch, AiTwotoneHeart } from 'react-icons/ai'

const Home: NextPage = () => {

    const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    const [searchResults, setSearchResults] = useState<any>([])
    const [data, setData] = useState<any>()
    const [showAll, setShowAll] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [showMyList, setShowMyList] = useState<boolean>(false)
    const [myList, setMyList] = useState<[]>([])
    const inputRef = useRef<any>(null)

    useEffect(() => {

        if (!localStorage.getItem('my-list')) {
            localStorage.setItem('my-list', '[]')
        }

        fetch('/api/hello').then(res => {
            return res.json()
        }).then(data => {
            setData({
                categories: data.categories.feeds,
                trending: data.trending.feeds,
                random: data.randomEps.episodes,
                recent: data.recentEps.feeds
            })
        })
    }, [])

    const handleSearch = async () => {

        setShowMyList(false)
        let keyword

        if (inputRef.current) {
            keyword = inputRef.current.value
        }

        const res = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword })
        })

        const data = await res.json()
        setSearchResults(data.data.feeds)
        setSearchTerm(inputRef.current.value)
        inputRef.current.value = ""
    }

    const displayContent = () => {
        if (showMyList) {
            return <Box>
                <Heading as="h2" size="sm" mb={5}>My Podcasts</Heading>
                <Flex
                    flexWrap={"wrap"}
                    alignContent="flex-start"
                    className="flex-after"
                    width="100%"
                >
                    <PodcastItem
                        data={myList}
                        updateMyList={updateMyList}
                    />
                </Flex>
            </Box>
        }

        if (searchResults.length) {
            return (
                <Box>
                    <Heading as="h2" size="sm" mb={5}>
                        Search Results for {searchTerm}
                        <Button
                            leftIcon={<CloseIcon fontSize={"xx-small"} />}
                            colorScheme='teal'
                            variant='solid'
                            size="xs"
                            onClick={() => setSearchResults([])}
                            ml={5}
                        >
                            clear search
                        </Button>
                    </Heading>
                    <SearchResults results={searchResults} />
                </Box>
            )
        } else {
            if (!data) {
                return (
                    <Box>
                        <SkeletonPodcastList />
                        <SkeletonPodcastList />
                        <SkeletonPodcastList />
                    </Box>
                )
            } else {
                return (
                    <Box>
                        <Heading as="h2" size="sm" mb={5}>Popular & Trending</Heading>
                        <Flex
                            flexWrap={"wrap"}
                            alignContent="flex-start"
                            className="flex-after"
                            width="100%"
                            justifyContent={{
                                base: "space-between",
                                md: "initial"
                            }}
                        >
                            <PodcastItem data={data.trending} />
                        </Flex>
                        <Divider mt={5} mb={5} />
                        <Heading as="h2" size="sm" mb={5}>Sports</Heading>
                        <Flex
                            flexWrap={"wrap"}
                            alignContent="flex-start"
                            className="flex-after"
                            width="100%"
                            justifyContent={{
                                base: "space-between",
                                md: "initial"
                            }}
                        >
                            <PodcastItem data={data.random} />
                        </Flex>
                        <Divider mt={5} mb={5} />
                        <Heading as="h2" size="sm" mb={5}>Latest Podcasts</Heading>
                        <Flex
                            flexWrap={"wrap"}
                            alignContent="flex-start"
                            className="flex-after"
                            width="100%"
                        >
                            <PodcastItem data={data.recent} />
                        </Flex>
                    </Box>
                )
            }
        }
    }

    const handleOnClick = async () => {
        setShowMyList(true)
        const res = await fetch('/api/my-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list: localStorage.getItem('my-list') })
        })
        const data = await res.json()
        setMyList(data.data)
    }

    const updateMyList = (list: []) => {
        setMyList(list)
    }

    return (
        <Container maxW={"container.xl"}>
            <Head>
                <title>Podcast Directory</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex
                display={{
                    base: 'block',
                    md: 'flex'
                }}
            >
                <Box
                    flexBasis={"15%"}
                    mr={{
                        base: 0,
                        md: 10
                    }}
                >
                    <Heading mb={5} as="h1" size="md" onClick={() => {
                        setShowMyList(false)
                        setSearchResults([])
                    }}>Podcast Directory</Heading>
                    <Box>
                        <Input
                            placeholder="Search"
                            mb={2}
                            variant="filled"
                            ref={inputRef}
                        />
                        <Button
                            size="sm"
                            color="gradient"
                            width="100%"
                            colorScheme={"yellow"}
                            onClick={handleSearch}
                            leftIcon={<Search2Icon />}
                            mb={5}
                        >Search</Button>
                        <Button
                            width={{
                                base: "100%",
                                md: "auto"
                            }}
                            leftIcon={<AiTwotoneHeart fill='red' />}
                            onClick={handleOnClick}>My List</Button>
                    </Box>
                    <Divider mt={5} mb={5} />
                    <Box display={{
                        base: 'none',
                        md: "block"
                    }}>
                        <Heading as="h2" size="sm" mb={5}>Categories</Heading>
                        <CategoriesList
                            categoriesList={showAll ? data?.categories : data?.categories.slice(0, 50)}
                            skeletonItems={skeletonItems}
                        />
                        {showAll ? <Text onClick={() => setShowAll(!showAll)}>Show less</Text> : <Text onClick={() => setShowAll(!showAll)}>Show all</Text>}
                    </Box>
                </Box>
                <Box flexBasis={"85%"}>
                    {displayContent()}
                </Box>
            </Flex>
        </Container >
    )
}

export default Home



/**
 * 
 * Search by keyword
 * https://api.podcastindex.org/api/1.0/search/byterm?q=<raptor></raptor>s
 * 
 * List all categories
 * https://api.podcastindex.org/api/1.0/categories/list?pretty
 * 
 * Search by Category
 * https://api.podcastindex.org/api/1.0/search/byterm?cat=Technology&q="software"
 * 
 * Trending Podcasts
 * https://api.podcastindex.org/api/1.0/podcasts/trending
 */