import React from "react";

interface BlockData {
  text: string;
}

interface Block {
  id: string;
  data: BlockData;
  type: string;
}

interface DescriptionJSON {
  time: number;
  blocks: Block[];
  version: string;
}

interface FormattedTableofContentsProps {
  description: string;
}

const FormattedTableofContents: React.FC<FormattedTableofContentsProps> = ({
  description,
}) => {
  const parseDescription = (jsonString: string) => {
    try {
      const parsed: DescriptionJSON = JSON.parse(jsonString);

      return parsed.blocks.map((block) => {
        const formattedText = block.data.text
          .replace(/\\r\\n/g, "\n") 
          .replace(/<\/b>/g, "</b>\n")
          .replace(/<b>/g, "\n<b>")
          .replace(/(\d+)(?=\s?[A-Za-z])/g, "\n$1") 
          .split("\n") 
          .map((line: string, index: number) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
              return null;
            }

            if (trimmedLine.startsWith("<b>") && trimmedLine.endsWith("</b>")) {
              return (
                <React.Fragment key={`section-${block.id}-${index}`}>
                  <br />
                  <strong className="text-lg font-bold">
                    <span dangerouslySetInnerHTML={{ __html: trimmedLine }} />
                  </strong>
                  <br/>
                </React.Fragment>
              );
            }
            return (
              <p
                key={`line-${block.id}-${index}`}
                className="my-2"
                dangerouslySetInnerHTML={{ __html: trimmedLine }}
              />
            );
          })
          .filter((element): element is JSX.Element => element !== null); 

        return (
          <div key={`block-${block.id}`} className="prose max-w-none">
            {formattedText}
          </div>
        );
      });
    } catch (error) {
      console.error("Error parsing description:", error);
      return <p className="text-red-500">Error displaying description</p>;
    }
  };

  return <div className="space-y-4">{parseDescription(description)}</div>;
};

export default FormattedTableofContents;