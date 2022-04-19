
import { Box, Flex } from "@chakra-ui/react"
import Skeleton from "./skeleton"

const SkeletonPodcastList = () => {
    return (
        <Box>
            <Skeleton type="title" />
            <Flex
                flexWrap="wrap"
            >
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
                <Skeleton type="thumbnail" />
            </Flex>
        </Box>
    )
}

export default SkeletonPodcastList