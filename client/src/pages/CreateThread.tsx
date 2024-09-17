import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_UPLOAD_API = `${API_BASE}/file-api`;

const threadSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  isPrivate: z.boolean().default(false),
  photo: z.string().optional(),
});

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileloading, setFileLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
      photo: "",
    },
  });

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${BASE_UPLOAD_API}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload the file");
        }

        const result = await response.json();
        setPhotoPreview(result.file_url);
        form.setValue("photo", result.file_url);
      } catch (error) {
        toast.error("Error uploading file");
      } finally {
        setFileLoading(false);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof threadSchema>) {
    try {
      setLoading(true);
      const token = Cookies.get("authtoken");
      await axios.post(`${API_BASE}/new-thread`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast("✅ Thread created successfully.");
      setTimeout(() => {
        navigate("/chat");
      }, 3000);
    } catch (error) {
      toast("❌ Failed to create thread " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-3">
        <CardHeader>
          <CardTitle>Create a New Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="photo"
                render={() => (
                  <FormItem>
                    <FormLabel>Thread Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        disabled={fileloading}
                      />
                    </FormControl>
                    {fileloading && (
                      <p className="text-xs text-gray-600 mt-1 animate-pulse">
                        Uploading...
                      </p>
                    )}
                    <FormMessage />
                    {photoPreview && (
                      <div className="mt-2">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thread Name</FormLabel>
                    <FormControl>
                      <Input placeholder="General" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A general-purpose thread."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Private Checkbox */}
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          id="isPrivate"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                      </FormControl>
                      <FormLabel htmlFor="isPrivate">
                        Make this thread private
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full font-mono font-semibold"
                disabled={loading || fileloading}
              >
                {loading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <span>Create Thread</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
