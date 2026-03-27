import { pgTable, serial, varchar, boolean ,json} from "drizzle-orm/pg-core";
import { jsonb } from "drizzle-orm/pg-core";

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name: varchar('name' ).notNull(),
    email: varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
})



export const VideoData = pgTable('videoData', {
  id: serial('id').primaryKey(),
  script: jsonb('script').notNull(),
  audioFileUrl: varchar('audioFileUrl').notNull(),
  captions: jsonb('captions').notNull(),
  imageList: jsonb('imageList').notNull(),
  createdBy: varchar('createdBy').notNull()
})