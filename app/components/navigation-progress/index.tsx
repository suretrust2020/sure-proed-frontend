// NavigationProgress.tsx
import { useEffect } from "react";
import { useNavigation } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress.css";
NProgress.configure({ showSpinner: false });

export function NavigationProgress() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    if (isNavigating) {
      NProgress.start();
    }

    return () => {
      NProgress.done();
    };
  }, [isNavigating]);

  return null;
}
