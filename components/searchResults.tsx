import { Flex } from '@chakra-ui/react';
import PodcastSearchItem from './podcastSearchItem';

interface Props {
    results: {
        description: string;
        id: number;
        image: string;
        link: string;
        originalUrl: string;
        ownerName: string;
        title: string;
        url: string
    }[]
}

const SearchResults = ({ results }: Props) => {
    return (
        <>
            <Flex
                flexWrap={"wrap"}
                alignContent="flex-start"
                className="flex-after"
                width="100%"
            >
                {results.map((r: any, i: number) => {
                    return (
                        <PodcastSearchItem key={i} data={r} />
                    )
                })}
            </Flex>
        </>
    )
}

export default SearchResults