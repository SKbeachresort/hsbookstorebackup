import React from "react";

interface CollectionPageProps {
  params: { categoryslug: string; channel: string; locale: string };
};

const CollectionsPage: React.FC<CollectionPageProps> = async ({
  params,
}: CollectionPageProps) => {

  return (
    <div>
        <h1 className="text-md text-center">This is a Collection Page</h1>
    </div>
  );
};

export default CollectionsPage;