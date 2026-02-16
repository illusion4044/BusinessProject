import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './CatalogueMain.module.css'
import MainPageCon1 from './_components/MainPageCon1/MainPageCon1'
import MainPageCon2 from './_components/MainPageCon2/MainPageCon2'
import MainPageCon3 from './_components/MainPageCon3/MainPageCon3'
import MainPageCon4 from './_components/MainPageCon4/MainPageCon4'

export default function CatalogueMain () {

    return (
        <>
            <Header/>
            <MainPageCon1/>
            <MainPageCon2/>
            <MainPageCon3/>
            <MainPageCon4/>
            <Footer/>
        </>
    )
}

