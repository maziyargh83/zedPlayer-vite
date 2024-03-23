"use client";
import { Section } from "@/components/section/section";
import Card from "@/components/primitives/card";
import { FiFolder } from "react-icons/fi";

export const Folder = () => {
  return (
    <Section showmore title="Folders">
      <div className="flex space-x-3 overflow-x-auto">
        <Card.Root icon={<FiFolder />} title={"folders"} theme="bg-teal-100">
          <Card.Header>
            <Card.Title />
          </Card.Header>
          <Card.Body className="py-3">
            <Card.Footer />
          </Card.Body>
        </Card.Root>
      </div>
    </Section>
  );
};
