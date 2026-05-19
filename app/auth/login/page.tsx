"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth-store";
import Cookies from "js-cookie";

const Login = () => {
  const { onLogin, onLogout, isAuth, data } = useAuth();

  console.log(isAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const login = await axios.post(`/api/auth/login/`, data);
      const userId = login.data._id;
      const userName = login.data.name;

      localStorage.setItem("user", userId);
      localStorage.setItem("name", userName);

      toast.success("Logged In Successfully!!");

      router.push("/auth/admin");
      onLogin();

      Cookies.set("isAuth", "true", { expires: 7 });
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="absolute inset-0  bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
              <p className="mt-2 text-gray-500">
                Sign in below to access your account{" "}
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative mt-8">
                  <div className="my-4">
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: "this is reqiured" })}
                      placeholder="Email Address"
                      className="peer mt-1 w-full  border-b-2 border-gray-300  py-2.5 placeholder:text-transparent focus:border-gray-500 focus:outline-none valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                      autoComplete="off"
                      pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <span className="mt-2 hidden text-sm text-red-400"></span>
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute top-0 left-0 py-1 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0  peer-focus:text-xs peer-focus:text-gray-800"
                    >
                      Email Address
                    </label>
                    <span className="mt-1 hidden text-xs text-red-400 ">
                      Please enter a valid email address.{" "}
                    </span>
                  </div>
                </div>
                <div className="relative mt-8">
                  <div className="my-4">
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "this is reqiured",
                      })}
                      placeholder="Password"
                      className="peer peer mt-1 w-full  border-b-2 border-gray-300  py-2.5 placeholder:text-transparent  focus:border-gray-500 focus:outline-none valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                      pattern=".{6,}"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute top-0 left-0 py-1 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-800"
                    >
                      Password
                    </label>
                    <span className="mt-1 hidden text-xs text-red-400">
                      Password must be at least six characters.{" "}
                    </span>
                  </div>
                </div>
                <div className="my-6">
                  <Button className="w-full ">
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      ""
                    )}
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
