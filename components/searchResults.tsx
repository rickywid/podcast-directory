import { Flex } from '@chakra-ui/react';
import PodcastSearchItem from './podcastSearchItem';

interface Props {
    results: {
        description: "Join each week as geeky friends break down what's happening in their lives, geek culture, and the new comic books that came out.";
        id: 1030112;
        image: "https://ssl-static.libsyn.com/p/assets/7/0/a/3/70a3777cb0d81fae/02.png";
        link: "http://www.radraptor.com";
        originalUrl: "https://radraptor.libsyn.com/rss";
        ownerName: "Jeff Conolly";
        title: "Rad Raptor Radio: The World's Best Comic Book Podcast";
        url: "https://radraptor.libsyn.com/rss"
    }[]
}

const SearchResults = ({ results }: Props) => {
    return (
        <>
            <Flex
                flexWrap={"wrap"}
                alignContent="flex-start"
            >
                {results.map((r: any, i:number) => {
                    return (
                        <PodcastSearchItem key={i} data={r} />
                    )
                })}
            </Flex>
        </>
    )
}

export default SearchResults