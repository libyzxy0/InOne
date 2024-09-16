import db from "@/db/drizzle"
import {
  threads, 
  users
} from "@/db/schema";

(async function () {
  const usr = await db.select().from(users);
  const d = await db.insert(threads).values({
    name: "Mga Pogi", 
    photo: "https://www.iconpacks.net/icons/1/free-icon-network-team-308.png", 
    created_by: usr[0].id
  }).returning({ insertedId: threads.id });
  console.log(d)
})();