import db from "@/db/drizzle"
import { eq } from 'drizzle-orm'
import {
  threads
} from "@/db/schema";

(async function () {
  const insert = await db.insert(threads).values({
    name: "For testing",
    photo: "https://http.cat/404", 
    created_by: "eeb96127-10f4-4010-8468-735f59242403"
  }).returning({ id: threads.id
  })
  console.log(insert)
})();