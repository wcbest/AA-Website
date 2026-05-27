import type { Meta, StoryObj } from "@storybook/nextjs";
import { ServiceListItem } from "./service-list-item";

const meta: Meta<typeof ServiceListItem> = {
  title: "Base/ServiceListItem",
  component: ServiceListItem,
  parameters: {
    docs: {
      description: {
        component:
          "Info circle icon + text row. Used on the home page ('Why African Aspirations Matters') and the brokerage services section. The icon colour is `currentColor`, so it inherits from the parent.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceListItem>;

export const Default: Story = {
  args: {
    children: (
      <p className="text-[#000000] text-lg leading-relaxed" style={{ fontFamily: "Inter" }}>
        80% of African SMEs never reach their full growth potential due to lack of access to capital and advisory support.
      </p>
    ),
  },
};

export const List: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      {[
        "Reach vetted, capital-ready buyers in global markets",
        "Secure fair valuations & better exits",
        "Receive full support through negotiation to closing",
        "Maximize liquidity from your life's work",
        "Benefit from tax, legal, and compliance guidance",
      ].map((item) => (
        <ServiceListItem key={item}>
          <span className="text-[#000000] text-lg leading-relaxed" style={{ fontFamily: "Inter" }}>
            {item}
          </span>
        </ServiceListItem>
      ))}
    </div>
  ),
};
