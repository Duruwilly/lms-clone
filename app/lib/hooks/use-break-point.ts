import { useState, useEffect } from "react";

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width >= 768 && width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
};

// ssage in components:
// const breakpoint = useBreakpoint();
// const isMobile = breakpoint === 'mobile';
