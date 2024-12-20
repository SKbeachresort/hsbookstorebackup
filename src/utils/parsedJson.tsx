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

// FormattedDescription.tsx
import React from "react";

interface FormattedDescriptionProps {
  description: string;
}

const FormattedDescription: React.FC<FormattedDescriptionProps> = ({
  description,
}) => {
  const parseDescription = (jsonString: string) => {
    try {
      const parsed: DescriptionJSON = JSON.parse(jsonString);

      return parsed.blocks.map((block) => {
        const formattedText = block.data.text
          .split("\\r\\n")
          .map((line: string, index: number) => {
            if (line.startsWith("*")) {
              return (
                <li
                  key={`line-${block.id}-${index}`}
                  className="ml-6 list-disc my-1"
                >
                  {line.substring(1).trim()}
                </li>
              );
            }

            return line ? (
              <p key={`line-${block.id}-${index}`} className="my-2">
                {line}
              </p>
            ) : null;
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

export default FormattedDescription;
