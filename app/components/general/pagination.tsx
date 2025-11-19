import { useLocation, useNavigate } from "react-router";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import type { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  currentPage?: number;
  pages?: number;
  paramId?: string;
  setPages: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({
  currentPage = 1,
  pages = 1,
  paramId,
  setPages,
}: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const links: (number | string)[] = [];

  // generate page links like before
  const generatePageLinks = () => {
    if (pages > 7) {
      if (currentPage - 4 > 0) {
        if (currentPage - 7 > 2) {
          links.push(1, 2, "....");
        }
        for (let i = currentPage - 4; i < currentPage; i++) {
          links.push(i);
        }
      } else {
        for (let i = 1; i < currentPage; i++) {
          links.push(i);
        }
      }

      links.push(currentPage);

      if (currentPage + 3 < pages) {
        links.push(currentPage + 1, currentPage + 2, currentPage + 3);
      } else {
        for (let i = currentPage + 1; i <= pages; i++) {
          links.push(i);
        }
      }

      if (pages > currentPage + 7) {
        links.push("....");
        for (let i = pages - 2; i <= pages; i++) {
          links.push(i);
        }
      } else {
        for (let i = currentPage + 4; i <= pages; i++) {
          links.push(i);
        }
      }
    } else {
      for (let i = 1; i <= pages; i++) {
        links.push(i);
      }
    }
  };

  // update url query with new page number
  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber.toString());
    const newPath = paramId
      ? `${location.pathname.split("/")[0]}/${paramId}?${searchParams.toString()}`
      : `${location.pathname}?${searchParams.toString()}`;

    setPages(pageNumber); // update local state
    navigate(newPath); // update the url with page
  };

  generatePageLinks();

  return (
    <>
      {/* previous */}
      <li
        className={currentPage > 1 ? "previous" : "disabled previous"}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      >
        <a>
          <SlArrowLeft className="inline text-base" />
        </a>
      </li>

      {/* page numbers */}
      {links.map((link) => {
        if (link === "....") {
          return (
            <li key="ellipsis" className="disabled">
              <a>...</a>
            </li>
          );
        }

        return (
          <li
            key={link}
            className={link === currentPage ? "active" : ""}
            onClick={() => handlePageChange(Number(link))}
          >
            <a>{link}</a>
          </li>
        );
      })}

      {/* next */}
      <li
        className={currentPage < pages ? "next" : "disabled next"}
        onClick={() => currentPage < pages && handlePageChange(currentPage + 1)}
      >
        <a>
          <SlArrowRight className="inline text-base" />
        </a>
      </li>
    </>
  );
};
