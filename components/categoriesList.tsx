import { Text } from '@chakra-ui/react'
import Skeleton from './skeleton'

interface Props {
    categoriesList: any;
    skeletonItems: number[];
}

const CategoriesList = ({ categoriesList, skeletonItems }: Props) => {
    return categoriesList ? (
        <>
            {categoriesList.map((c: any, i: number) => {
                return <Text key={i} fontSize="smaller">{c.name}</Text>
            })}
        </>
    ) : (
        <>
            {skeletonItems.map((n: number, i: number) => <Skeleton key={i} type="categoryList" />)}
        </>
    )
}

export default CategoriesList