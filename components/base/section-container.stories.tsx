import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionContainer } from "./section-container";

const meta: Meta<typeof SectionContainer> = {
  title: "Base/SectionContainer",
  component: SectionContainer,
  parameters: {
    docs: {
      description: {
        component:
          "The universal page-width wrapper: `mx-auto max-w-[90rem] px-4 md:px-8`. Used on every section across every page. Change padding or max-width here and it updates everywhere.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionContainer>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded bg-gray-100 p-4 text-center text-sm text-gray-600">
        Content constrained to max-w-[90rem] with responsive horizontal padding
      </div>
    ),
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    className: "bg-[#F1FBE6] py-12",
    children: (
      <p className="font-semibold text-[#739F46] text-xl">
        Rendered as a &lt;section&gt; element with a background colour applied to the outer wrapper
      </p>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "bg-[#004714] py-16",
    children: (
      <p className="font-bold text-4xl text-white">Custom background via className prop</p>
    ),
  },
};
