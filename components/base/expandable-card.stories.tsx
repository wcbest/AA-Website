import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { ExpandableCard } from "./expandable-card";

const meta: Meta<typeof ExpandableCard> = {
  title: "Base/ExpandableCard",
  component: ExpandableCard,
  parameters: {
    docs: {
      description: {
        component:
          "The expandable card shell shared by `ConsultingCard` and `LeadershipCard`. Owns the `rounded-[20px]` wrapper, the `md:col-span-2 lg:col-span-3` grid expand behaviour, and the `animate-fadeIn flex-col md:flex-row` layout switch. Content slots: `collapsedContent`, `expandedLeft` (fixed `md:w-96`), `expandedRight` (flex-1).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableCard>;

const InteractiveDemo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <ExpandableCard
        isExpanded={isExpanded}
        collapsedContent={
          <div className="flex flex-col bg-[#026B20] p-6">
            <div className="mb-4 h-32 bg-[#739F46]/30" />
            <h3 className="mb-2 font-bold text-white text-xl">Collapsed State</h3>
            <p className="mb-4 text-[#F7FAFE] text-sm">Click the button to expand this card.</p>
            <button
              onClick={() => setIsExpanded(true)}
              className="w-fit rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm text-white"
            >
              Read More
            </button>
          </div>
        }
        expandedLeft={
          <div className="flex h-full flex-col bg-[#026B20] p-6">
            <div className="mb-4 h-48 bg-[#739F46]/30" />
            <h3 className="mb-2 font-bold text-white text-xl">Expanded Left</h3>
            <p className="mb-6 text-[#F7FAFE] text-sm">Fixed at md:w-96.</p>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-fit rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm text-white"
            >
              Close
            </button>
          </div>
        }
        expandedRight={
          <div className="space-y-3">
            <p className="text-[#636466] text-sm leading-relaxed">
              This is the expanded right panel. It takes up the remaining width (flex-1)
              and typically shows detailed content, descriptions, or bullet points.
            </p>
            {["Detail one", "Detail two", "Detail three"].map((d) => (
              <div key={d}>
                <h4 className="font-semibold text-[#739F46]">{d}</h4>
                <p className="text-[#000] text-sm">Supporting description for this detail.</p>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const Collapsed: Story = {
  args: {
    isExpanded: false,
    collapsedContent: (
      <div className="flex flex-col bg-[#026B20] p-6">
        <div className="mb-4 h-32 bg-[#739F46]/30" />
        <h3 className="font-bold text-white text-xl">Generalized Consulting</h3>
        <p className="mt-2 text-[#F7FAFE] text-sm">Build strong systems and structures.</p>
      </div>
    ),
    expandedLeft: <div />,
    expandedRight: <div />,
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-3 gap-6">
        <Story />
      </div>
    ),
  ],
};
