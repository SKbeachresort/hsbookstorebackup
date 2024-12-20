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
          .replace(/\\r\\n/g, "\n") // Replace escaped line breaks with newlines
          .split("\n") // Split text into lines
          .map((line: string, index: number) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
              // Skip empty lines
              return null;
            }

            if (trimmedLine.startsWith("<li>") && trimmedLine.endsWith("</li>")) {
              // Handle list items with <li> tags
              const content = trimmedLine.slice(4, -5);
              return (
                <li key={`li-${block.id}-${index}`} className="list-disc ml-6 my-1">
                  <span dangerouslySetInnerHTML={{ __html: content }} />
                </li>
              );
            }

            // Default case for paragraphs or strong tags
            return (
              <p
                key={`line-${block.id}-${index}`}
                className="my-2"
                dangerouslySetInnerHTML={{ __html: trimmedLine }}
              />
            );
          })
          .filter((element): element is JSX.Element => element !== null); // Remove null values

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
