import {
  Request,
  Response
} from "express";
import db from "@/db/drizzle";
import {
  threads
} from "@/db/schema";
import {
  getTokenFromRequestHeaders,
  getUserFromToken
} from "@/utils";
class ThreadController {
  async createThread(req: Request, res: Response) {
    try {
      const {
        name, 
        photo, 
        description, 
        isPrivate
      } = req.body;
      const token: string | null = getTokenFromRequestHeaders(req);
      const user: User | null = await getUserFromToken(token);

      if (user) {
        await db.insert(threads).values({
          name,
          photo,
          isPrivate, 
          description, 
          created_by: user.id
        });
        res.status(200).json({
          message: "Thread created successfully",
        });
      } else {
        res.status(401).json({
          message: "Unauthorized access, please check Authorization token",
        });
      }
    } catch (error: any) {
      console.log(error)
      res.status(500).send({
        message: "Something went wrong"
      });
    }
  }
  async getAllThread(req: Request, res: Response) {
    try {
      const result = await db.query.threads.findMany({
        columns: {
          name: true,
          photo: true,
          id: true,
        }
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Something went wrong."
      })
    }
  }
  async getThreadInfo(req: Request, res: Response) {
    const {
      threadID
    } = req.params;
    try {
      const result = await db.query.threads.findMany({
        with: {
          messages: {
            orderBy: (messages, {
              asc
            }) => [asc(messages.created_at)],
            with: {
              user: {
                columns: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatar_url: true,
                  status: true
                }
              },
            }
          }
        },
        where: ((threads, {
          eq
        }) => eq(threads.id, threadID)),
      });
      return res.status(200).send(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Something went wrong."
      })
    }
  }
}

export default new ThreadController();