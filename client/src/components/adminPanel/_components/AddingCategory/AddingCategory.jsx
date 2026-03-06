import { useState } from "react";
import styles from "./AddingCategory.module.css";

export default function AddingCategory(){

    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const token = localStorage.getItem("token");


    async function addCategory(){

        const res = await fetch("http://localhost:3001/admin/addcategory",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                name:category
            })
        });

        const data = await res.json();
        console.log(data);

        setCategory("");
    }


    async function addSubcategory(){

        const res = await fetch("http://localhost:3001/admin/addsubcategory",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                name:subcategory,
                parent_id:1
            })
        });

        const data = await res.json();
        console.log(data);

        setSubcategory("");
    }


    return(

        <div className={styles.container}>

            <div 
                onClick={() => setActivePage("defaultPage")} 
                className={styles.BackToLobby}
            >
                <img src="images/BackRow.png" className={styles.leftRow} alt="" />
                Додавання продукції
                
                {/* <div className={styles.searchContainer}>
                    <img src="images\Search.png" alt="search" className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Пошук..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div> */}
            </div>

            <div className={styles.row}>
                <input
                    placeholder="Додати назву категорії"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                />

                <button className={styles.saveBtn} onClick={addCategory}>
                    Зберегти
                </button>
            </div>


            <div className={styles.row}>
                <input
                    placeholder="Додати підкатегорію"
                    value={subcategory}
                    onChange={(e)=>setSubcategory(e.target.value)}
                />

                <button className={styles.saveBtn} onClick={addSubcategory}>
                    Зберегти
                </button>
            </div>

            <div className={styles.categoriesBtn}>
                <h1>Переглянути створені категорії</h1>

            <div className={styles.rowBtn}>
                <button className={styles.category_parent}>
                    Категорії
                </button>
                <button className={styles.category_child}>
                    Підкатегорії
                </button>
            </div>
            </div>
        </div>

    )
}