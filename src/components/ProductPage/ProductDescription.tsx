import xss from "xss"

export type TProductDescriptionProps = {
  blocks: {
    id: string
    data: {
      text: any
    }
    type: string
  }[]
}

const ProductDescription = ({ blocks }: TProductDescriptionProps) => {
  return (
    <div className="flex grid-cols-2 flex-col gap-6 md:grid product-variant-size:grid-cols-product-page">
      <div className="col-span-2">
        {blocks.map((block) => (
          <article
            key={`A-${block.id}`}
            className={`lg:prose-s prose max-w-full dark:prose-invert`}
            dangerouslySetInnerHTML={{ __html: xss(block.data.text) }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductDescription
