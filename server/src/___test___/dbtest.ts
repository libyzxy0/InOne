import db from "@/db/drizzle"
import { eq } from 'drizzle-orm'
import {
  threads
} from "@/db/schema";

(async function () {
  const insert = await db.insert(threads).values({
    name: "General",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3B0KCeygLprFQitE_I1cqAd8tnXcg2nq37HdeyhgFvZoNBJFTUj_6FCV&s=10", 
    isPrivate: false, 
    description: "A general purpose thread.", 
    created_by: "f595dfa0-fb7f-45fe-95b6-b66a22a768c9"
  }).returning({ id: threads.id
  })
  console.log(insert)
})();