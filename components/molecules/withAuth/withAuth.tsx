import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
