import db from "./db.js";

async function updateUnits() {
    try {
        const result = await db.query("UPDATE products SET unit = 'кг' WHERE name LIKE '%Балик%' OR name LIKE '%Апельсин%'");
        console.log('✅ Продукти оновлені');
        console.log('Affected rows:', result[0].affectedRows);
        process.exit(0);
    } catch (err) {
        console.error('❌ Помилка:', err.message);
        process.exit(1);
    }
}

updateUnits();
