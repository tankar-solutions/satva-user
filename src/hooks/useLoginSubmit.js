import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

// Internal imports
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useLoginSubmit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password, phone }) => {
    setLoading(true);

    try {
      if (router.pathname === "/auth/signup") {
        // Custom sign-up method
        const res = await CustomerServices.verifyEmailAddress({
          name,
          email,
          password,
        });

        notifySuccess(res.message);
        return setLoading(false);
      } else if (router.pathname === "/auth/forget-password") {
        // Forget password API for reset password
        const res = await CustomerServices.forgetPassword({
          email,
        });

        notifySuccess(res.message);
        return setLoading(false);
      } else if (router.pathname === "/auth/phone-signup") {
        // Phone-based sign-up
        const res = await CustomerServices.verifyPhoneNumber({
          phone,
        });

        notifySuccess(res.message);
        return setLoading(false);
      } else {
        // Standard login using NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/user/dashboard",
        });

        if (result?.error) {
          notifyError(result?.error);
          console.error("Error during sign-in:", result.error);
        } else if (result?.ok) {
          // Save login details to local storage
          const user = {
            email,
          };
          const token = "dummyAuthToken"; // Replace with your actual token logic if available
          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(user));

          const url = redirectUrl || result?.url || "/user/dashboard";
          router.push(url); // Navigate to the target page
        }

        setLoading(false);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error(
        "Error in submitHandler:",
        error?.response?.data?.message || error?.message
      );
      setLoading(false);
      notifyError(error?.response?.data?.message || error?.message);
    }
  };

  return {
    register,
    errors,
    loading,
    control,
    handleSubmit,
    submitHandler,
  };
};

export default useLoginSubmit;
