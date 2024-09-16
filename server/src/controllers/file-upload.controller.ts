import {
  Request,
  Response
} from "express";
import { uploadToCloudinary } from '@/lib/cloudinary'

class FileUploadController {
  async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded"
        });
      }

      const result = await uploadToCloudinary(req.file.buffer);

      res.status(200).json({
        file_url: result.secure_url, 
        resource_type: result.resource_type, 
        format: result.format
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to upload file"
      });
    }
  }
}

export default new FileUploadController();