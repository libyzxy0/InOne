import {
  Button
} from "@/components/ui/button"
import {
  Link
} from 'react-router-dom'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  useForm
} from "react-hook-form"
import {
  z
} from "zod"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your username or email.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
})

export default function Login() {
  const form = useForm < z.infer < typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer < typeof formSchema >) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="max-w-md w-full px-7">
        <div className="text-center">
          <h1 className="text-2xl font-mono font-semibold">Login | InOne</h1>
        </div>

        <div className="mt-16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username / Email</FormLabel>
                    <FormControl>
                      <Input placeholder="libyzxy0 / janlibydelacosta@gmail.com" {...field}/>
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
                      <Input type="password" placeholder="Mypassword@123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-mono font-semibold">Login</Button>
            </form>
          </Form>
          <p className="text-sm pt-5 text-center">Don't have an account? <Link to="/new-account" className="text-green-400 hover:underline">{"Let's Create"}</Link></p>
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
  )
}
