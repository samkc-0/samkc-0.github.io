import { JSX, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { TbBinaryTree, TbMatrix } from "react-icons/tb";

export default function App() {
  return (
    <div className="min-h-screen bg-grid text-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 md:px-8">
      <div className="max-w-2xl w-full flex-grow p-6 sm:p-8 bg-white border border-gray-400 shadow-sm rounded-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Sam<span style={{ opacity: 0.6 }}>s</span> notebook
        </h1>
        <p className="mt-4 text-lg text-gray-500 text-center">[index]</p>
        <ul className="mt-6 space-y-2 text-lg text-blue-500 flex flex-col items-center text-center">
          <Link href="https://matmulworkbook.netlify.app/">
            <TbMatrix className="text-2xl" />
            &nbsp;linear algebra workbook
          </Link>
          <Link href="./pages/binary-search-trees.html">
            <TbBinaryTree className="text-2xl" />
            &nbsp;binary search trees
          </Link>
          <Link href="https://github.com/samkc-0">
            <FaGithub className="text-2xl" />
            &nbsp;github
          </Link>
        </ul>
      </div>
    </div>
  );
}

function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <li>
      <a
        href={href}
        className="hover:underline flex items-center space-x-2 text-lg text-blue-500"
      >
        {children}
      </a>
    </li>
  );
}
