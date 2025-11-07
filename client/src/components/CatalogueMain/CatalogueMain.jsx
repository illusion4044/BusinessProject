import Header from './_components/Header/Header'
import styles from './CatalogueMain.module.css'
import MainPageCon1 from './_components/mainPageCon1/mainPageCon1'
import MainPageCon2 from './_components/MainPageCon2/MainPageCon2'
import MainPageCon3 from './_components/MainPageCon3/MainPageCon3'

export default function CatalogueMain () {

    return (
        <>
            <Header/>
            <MainPageCon1/>
            <MainPageCon2/>
            <MainPageCon3/>
        </>
    )
}