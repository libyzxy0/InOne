import {
  Request,
  Response
} from "express";
import {
  getTokenFromRequestHeaders,
  getUserFromToken
} from "@/utils";
import * as bcryptjs from 'bcryptjs';
import db from "@/db/drizzle";
import {
  users
} from "@/db/schema";
import {
  or,
  eq
} from 'drizzle-orm';
import * as jwt from "jsonwebtoken";
import type {
  User
} from '@/types'

class UserController {
  constructor() {}

  async register(req: Request, res: Response) {
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        password
      } = req.body;

      /* Let's hash password using bcryptjs */
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      await db.insert(users).values({
        username,
        firstName,
        lastName,
        email,
        authProvider: "email", 
        password: hashedPassword,
      });

      res.status(200).json({
        message: "User created successfully",
      });
    } catch (error: any) {
      console.log(error)
      res.status(500).send({
        message: "Something went wrong"
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const {
        username,
        password
      } = req.body;

      const user: User[] = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, username)));

      /* Check if user exists on database */
      if (user.length <= 0) {
        return res.status(404).json({
          message: "User not found",
          jwt_token: null,
        });
      }
      
      if(!user[0].password) return res.status(401).json({ success: false, message: 'Incorrect password [11002]', jwt_token: null });
    
      /* Compare hashed password using bcryptjs */
      const isCorrectPass = await bcryptjs.compare(password, user[0].password);
    
      /* Check if password match */
      if (!isCorrectPass) {
        return res.status(401).json({
          message: "Incorrect password",
          jwt_token: null,
        });
      }
      
      const token = jwt.sign({
        id: user[0].id
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
      });

      res.status(200).json({
        message: "Login successful",
        jwt_token: token,
      });
    } catch (error: any) {
      console.log(error)
      res.status(500).send({
        message: "Something went wrong"
      });
    }
  }

  async getSession(req: Request, res: Response) {
    const token: string | null = getTokenFromRequestHeaders(req);
    const user: User | null = await getUserFromToken(token);
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(401).json({
        message: "Unauthorized access, please check Authorization token",
      });
    }
  }
}

export default new UserController();