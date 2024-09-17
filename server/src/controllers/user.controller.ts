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
  users, 
  otpCodes
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
        password, 
        avatar_url
      } = req.body;
      
      console.log(req.body)

      /* Let's hash password using bcryptjs */
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const [insertedUser] = await db.insert(users).values({
        username,
        firstName,
        lastName,
        email,
        authProvider: "email", 
        password: hashedPassword,
        avatar_url
      }).returning({ id: users.id });
      
      const generatedCode = Math.floor(100000 + Math.random() * 900000);
      
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

      await db.insert(otpCodes).values({
        user_id: insertedUser.id,
        otp_code: generatedCode, 
        expires_at: expiresAt
      })
      
      console.log('OTP GENERATED:', generatedCode)

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
  
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      
      const userOtp = await db.query.users.findFirst({
        columns: {
          id: true,
        }, 
        with: {
          otp_code: true
        }, 
        where: ((users, { eq }) => eq(users.email, email)),
      });
      
      if(userOtp.otp_code.otp_code == "" || userOtp.otp_code.otp_code == null) {
        return res.status(400).json({
          verified: false, 
          message: "Please regenerate otp"
        })
      }
      
      if(userOtp.otp_code.otp_code === code) {
        await db.update(users).set({
          email_verified: true
        }).where(eq(users.id, userOtp.id))
        await db.update(otpCodes).set({
          otp_code: null
        }).where(eq(otpCodes.id, userOtp.otp_code.id))
        res.status(200).json({
          verified: true, 
          message: "All goods pare"
        })
      } else {
        res.status(401).json({
          verified: false, 
          message: "Code not match"
        })
      }
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