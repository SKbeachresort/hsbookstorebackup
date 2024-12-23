"use client";
import React,{useMemo} from 'react';
import { authorFilter } from '@/utils/authorFilter';
import Link from 'next/link';

interface ProductAuthorSectionProps {
    authorName: string
}

const ProductAuthorSection:React.FC<ProductAuthorSectionProps> = ({authorName}) => {

  const { arrayOfNames, total } = useMemo(() => authorFilter(authorName), [authorName]);  

  return (
    <div>
        {arrayOfNames.map((name, index) => {
            return (
              <React.Fragment key={`${name}-${index}`}>
                {index === 0 ? "By " : null}
                <Link
                  href={`/search?author=${name}`}
                  prefetch={false}
                  className="text-sm text-textColor"
                >
                  <span className="font-bold text-secondary">{name}</span>
                </Link>
                {index < total - 1 ? <span>{" & "}</span> : null}
              </React.Fragment>
            )
          })}
    </div>
  )
};

export default ProductAuthorSection;