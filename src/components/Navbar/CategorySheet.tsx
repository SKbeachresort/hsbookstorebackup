"use client";
import React, { useState, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useFetchAllCategoriesQuery,
  useFetchAllSubCategoryByIdQuery,
} from "../../../gql/graphql";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

export const CategorySheet = () => {
  const { getRegionUrl } = useRegionUrl();

  const { data: categoriesData } = useFetchAllCategoriesQuery();
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(
    null
  );

  const categories = categoriesData?.categories?.edges ?? [];

  const { data: childrenData, loading: childrenLoading } =
    useFetchAllSubCategoryByIdQuery({
      variables: { id: activeSubCategoryId || "" },
      skip: !activeSubCategoryId,
      fetchPolicy: "network-only",
    });

  const currentChildrenData = React.useMemo(() => {
    return (
      childrenData?.category?.children?.edges?.sort((a, b) => {
        if (a.node.name < b.node.name) {
          return -1;
        }
        if (a.node.name > b.node.name) {
          return 1;
        }
        return 0;
      }) ?? []
    );
  }, [childrenData]);

  const handleSubCategoryExpand = (subcategoryId: string) => {
    setActiveSubCategoryId((prevId) =>
      prevId === subcategoryId ? null : subcategoryId
    );
  };

  useEffect(() => {
    // console.log("Children Data", childrenData);
  }, [childrenData]);

  return (
    <>
      <ScrollArea className="w-full h-[90vh] py-6 border p-2">
        <div>
          <Accordion type="single" collapsible>
            {categories.map((category, index) => (
              <AccordionItem key={category.node.id} value={`category-${index}`}>
                <Link href={getRegionUrl(`category/${category.node.slug}`)}>
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
                            <Link href={getRegionUrl(`category/${category.node.slug}/${subCategory.node.slug}`)}>
                              <AccordionTrigger2
                                onClick={() => {
                                  // e.stopPropagation();
                                  handleSubCategoryExpand(subCategory.node.id);
                                }}
                              >
                                {subCategory.node.name}
                              </AccordionTrigger2>
                            </Link>

                            <AccordionContent2>
                              {activeSubCategoryId === subCategory.node.id &&
                              childrenLoading ? (
                                <p className="text-sm text-muted-foreground">
                                  Loading children...
                                </p>
                              ) : activeSubCategoryId === subCategory.node.id &&
                                currentChildrenData.length > 0 ? (
                                <ul className="ml-4 list-disc">
                                  {currentChildrenData.map((child: any) => (
                                    <li key={child.node.id} className="text-sm mt-1 text-textColor">
                                      <Link
                                        href={getRegionUrl(
                                          `category/${category.node.slug}/${subCategory.node.slug}/${child.node.slug}`
                                        )}
                                      >
                                        {child.node.name}
                                      </Link>
                                    </li>
                                  ))}
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
      </ScrollArea>
    </>
  );
};
