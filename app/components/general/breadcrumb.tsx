import { useLocation } from "react-router";
import { Paragraph } from "../ui/paragraph";

interface BreadcrumbProps {
  includeRootPrefix?: boolean; // include "Admin" or "Lecturer"
}

const Breadcrumb = ({ includeRootPrefix = false }: BreadcrumbProps) => {
  const location = useLocation();
  const { pathname } = location;

  // split and clean path
  let parts = pathname.split("/").filter(Boolean); // removes empty ""

  // remove the first part if it’s a prefix (like admin/lecturer) based on props
  if (
    !includeRootPrefix &&
    ["admin", "lecturer", "student"].includes(parts[0])
  ) {
    parts = parts.slice(1);
  }

  const isSingle = parts.length === 1;

  // convert each segment to Title Case for display
  const breadcrumbs = parts.map((part, index) => {
    const isLast = index === parts.length - 1;
    const name = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // for single-level routes
    if (isSingle) {
      return (
        <Paragraph
          key={index}
          className="font-bold text-xl !font-Inter-Bold text-(--color-texts-neutral)"
        >
          {name}
        </Paragraph>
      );
    }

    // for multi-level breadcrumb
    return (
      <Paragraph
        key={index}
        className={`text-[16px] font-normal !font-Inter-Regular ${
          isLast
            ? "text-(--color-texts-neutral)"
            : "text-(--color-text-secondary)"
        }`}
      >
        {name}
      </Paragraph>
    );
  });

  return (
    <div className="flex items-center gap-2">
      {breadcrumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-2">
          {crumb}
          {i < breadcrumbs.length - 1 && (
            <span className="text-(--color-text-secondary)">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
