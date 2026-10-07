import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("morrow_inventory.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);

  // Auto-seed initial data on first launch if table is empty
  const countRow: any = db.getFirstSync(
    "SELECT COUNT(*) as count FROM products;"
  );
  if (countRow.count === 0) {
    db.runSync(
      "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?);",
      [
        "Atomic Habits", "Ideas & growth", 18.5, 42,
        "Deep Work", "Ideas & growth", 16.0, 27,
        "Orbital", "Fiction", 15.25, 15,
        "Braiding Sweetgrass", "Culture", 21.0, 19,
      ]
    );
  }
}
