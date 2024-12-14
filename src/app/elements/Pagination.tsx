import Link from "next/link";
import BackDropLoader from "./BackdropLoader";

interface PaginationProps {
  categoryslug?: string;
  totalPages: number;
  currentPage: number;
  path: string;
  safeEndCursor: string;
  safeStartCursor: string;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  categoryslug,
  totalPages,
  currentPage,
  path,
  safeEndCursor,
  safeStartCursor,
  loading,
}) => {
  const pageItems = [];

  if (currentPage > 1) {
    pageItems.push(
      <Link
        key="prev"
        href={`${path}?page=${currentPage - 1}&before=${encodeURIComponent(
          safeStartCursor
        )}`}
      >
        <button className="px-3 py-2 text-textColor font-medium rounded-full">
          Previous
        </button>
      </Link>
    );
  }

  pageItems.push(
    <Link key="1" href={`${path}?page=1`}>
      <button
        className={`px-3 py-1 border rounded-full ${
          currentPage === 1 ? "bg-secondary text-white" : ""
        }`}
      >
        1
      </button>
    </Link>
  );

  if (currentPage > 3) {
    pageItems.push(
      <span key="start-ellipsis" className="px-3 py-2">
        ...
      </span>
    );
  }

  if (currentPage > 2) {
    pageItems.push(
      <Link
        key={currentPage - 1}
        href={`${path}?page=${currentPage - 1}&before=${encodeURIComponent(
          safeStartCursor
        )}`}
      >
        <button className="px-3 py-1 border rounded-full">
          {currentPage - 1}
        </button>
      </Link>
    );
  }

  if (currentPage !== 1 && currentPage !== totalPages) {
    pageItems.push(
      <span
        key={currentPage}
        className="px-3 py-1 border rounded-full bg-secondary text-white"
      >
        {currentPage}
      </span>
    );
  }

  if (currentPage < totalPages - 1) {
    pageItems.push(
      <Link
        key={currentPage + 1}
        href={`${path}?page=${currentPage + 1}&after=${encodeURIComponent(
          safeEndCursor
        )}`}
      >
        <button className="px-3 py-1 border rounded-full">
          {currentPage + 1}
        </button>
      </Link>
    );
  }

  if (currentPage < totalPages - 2) {
    pageItems.push(
      <span key="end-ellipsis" className="px-3 py-2">
        ...
      </span>
    );
  }

  pageItems.push(
    <Link
      key={totalPages}
      href={`${path}?page=${totalPages}&after=${encodeURIComponent(
        safeEndCursor
      )}`}
    >
      <button
        className={`px-3 py-1 border rounded-full ${
          currentPage === totalPages ? "bg-secondary text-white" : ""
        }`}
      >
        {totalPages}
      </button>
    </Link>
  );

  if (currentPage < totalPages) {
    pageItems.push(
      <Link
        key="next"
        href={`${path}?page=${currentPage + 1}&after=${encodeURIComponent(
          safeEndCursor
        )}`}
      >
        <button className="px-3 py-2 font-medium text-textColor">Next</button>
      </Link>
    );
  }

  return (
    <>
      {loading && <BackDropLoader open={loading}/>}
      <div className="flex justify-center items-center space-x-1">
        {pageItems}
      </div>
      ;
    </>
  );
};

export default Pagination;
