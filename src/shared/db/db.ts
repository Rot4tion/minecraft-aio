import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema/index.schema";

import { app } from "electron";
import fs from "fs";
import path from "path";

const inDevelopment = process.env.NODE_ENV === "development";

const dbPath = inDevelopment ? "sqlite.db" : path.join(app.getPath("userData"), "data.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });

function toDrizzleResult(row: Record<string, any>);
function toDrizzleResult(rows: Record<string, any> | Array<Record<string, any>>) {
    if (!rows) {
        return [];
    }
    if (Array.isArray(rows)) {
        return rows.map((row) => {
            return Object.keys(row).map((key) => row[key]);
        });
    } else {
        return Object.keys(rows).map((key) => rows[key]);
    }
}

export const execute = async (e, sqlstr, params, method) => {
    const result = sqlite.prepare(sqlstr);
    const ret = result[method](...params);
    return toDrizzleResult(ret);
};

export const runMigrate = async () => {
    const pathDrizzle = path.join(__dirname, "../../.drizzle");
    console.log("🚀 ~ runMigrate ~ pathDrizzle:", pathDrizzle);
    migrate(db, {
        migrationsFolder: pathDrizzle,
    });
};
