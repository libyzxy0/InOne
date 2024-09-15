import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Enter your First Name.",
  }),
  lastName: z.string().min(1, {
    message: "Enter your Last Name.",
  }),
  username: z
    .string()
    .min(1, {
      message: "Enter your desired username.",
    })
    .regex(/^\S*$/, {
      message: "Username must not contain spaces.",
    }),
  email: z
    .string()
    .min(1, {
      message: "Please enter your email.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter.",
    })
    .regex(/\d/, {
      message: "Password must include at least one number.",
    })
    .regex(/[\W_]/, {
      message: "Password must include at least one special character.",
    }),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { register, user } = useAuth();

  async function onSubmit(v: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await register(v.firstName, v.lastName, v.username, v.email, v.password);
      toast("✅ Successfully created account!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast("❌ Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center w-full bg-white">
      <div className="max-w-md w-full px-7 pt-16 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-mono font-semibold">
            Create Account | InOne
          </h1>
        </div>

        <div className="mt-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 grid grid-cols-1"
            >
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jan Liby" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dela Costa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="libyzxy0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label>Profile Picture</Label>
                <div>
                  <Input type="file" />
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="janlibydelacosta@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mypassword@123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-mono font-semibold">
                {loading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <span>Create My Account</span>
                )}
              </Button>
            </form>
          </Form>
          <p className="text-sm py-4 text-center">
            By continuing, you confirm that you have read and agreed to our{" "}
            <Link to="/terms" className="underline text-green-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline text-green-400">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-sm pt-4 text-center">
            Have an account?{" "}
            <Link to="/" className="text-green-400 hover:underline">
              {"Let's Login"}
            </Link>
          </p>
          <div className="flex items-center flex-col w-full mt-8">
            <h1 className="text-xl font-mono mb-8">OR</h1>

            <Button
              type="button"
              className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 flex justify-center items-center space-x-2 shadow-sm font-mono"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20190923152039%21Google_%22G%22_logo.svg"
                alt="Google logo"
                className="h-5 w-5"
              />
              <span>Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
