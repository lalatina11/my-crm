import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().defaultRandom().primaryKey()

export const timeStamps={
    createdAt: timestamp("created_at",{mode:"date"}).$defaultFn(() => new Date(Date.now())).notNull(),
    updatedAt: timestamp("updated_at",{mode:"date"})
      .$defaultFn(() => new Date(Date.now()))
      .$onUpdate(() => /* @__PURE__ */ new Date(Date.now()))
      .notNull(),
}

