"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AccordionContent2,
  AccordionItem2,
  AccordionTrigger2,
} from "@/components/ui/accordion2";
import {
  useFetchAllCategoriesQuery,
  useFetchAllSubCategoryByIdQuery,
} from "../../../gql/graphql";
import Link from "next/link";

export const CategorySheet = () => {
  const { data: categoriesData } = useFetchAllCategoriesQuery();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { data: subCategoriesData, loading: subCategoriesLoading } =
    useFetchAllSubCategoryByIdQuery({
      variables: { id: activeCategoryId ?? "" },
      skip: !activeCategoryId,
    });

  const categories = categoriesData?.categories?.edges ?? [];

  const handleCategoryExpand = (categoryId: string) => {
    setActiveCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  return (
    <div>
      <div className="mt-6">
        <Accordion type="single" collapsible>
          {categories.map((category, index) => (
            <AccordionItem key={category.node.id} value={`category-${index}`}>
              <Link href={`/category/${category.node.slug}`}>
                <AccordionTrigger>{category.node.name}</AccordionTrigger>
              </Link>
              <AccordionContent>
                {category.node.children?.edges?.length ? (
                  <Accordion type="single" collapsible>
                    {category.node.children.edges.map(
                      (subCategory, subIndex) => (
                        <AccordionItem2
                          key={subCategory.node.id}
                          value={`subcategory-${index}-${subIndex}`}
                        >
                          <Link
                            href={`/category/${category.node.slug}/${subCategory.node.slug}`}
                          >
                            <AccordionTrigger2>
                              {subCategory.node.name}{" "}
                            </AccordionTrigger2>
                          </Link>

                          <AccordionContent2>
                            {subCategory.node.children?.totalCount ? (
                              <ul className="ml-4 list-disc">
                                <li>Subcategory Content Here</li>
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No further subcategories available.
                              </p>
                            )}
                          </AccordionContent2>
                        </AccordionItem2>
                      )
                    )}
                  </Accordion>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No subcategories available.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
