import type { Meta, StoryObj } from "@storybook/nextjs";
import { ServiceCard } from "./service-card";

const meta: Meta<typeof ServiceCard> = {
  title: "Base/ServiceCard",
  component: ServiceCard,
  parameters: {
    docs: {
      description: {
        component:
          "Numbered service block: large green indexed title, image on the left, bullet checklist on the right (via `ServiceListItem`). Used in the Business Brokerage page services section. The layout switches from stacked to side-by-side at `lg`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    title: "For African Business Sellers",
    index: 0,
    image: "/new_images/image 25.png",
    items: [
      "Reach vetted, capital-ready buyers in global markets",
      "Secure fair valuations & better exits",
      "Receive full support through negotiation to closing",
      "Maximize liquidity from your life's work",
      "Benefit from tax, legal, and compliance guidance",
    ],
  },
};

export const SecondItem: Story = {
  args: {
    title: "For Buyers of African Businesses",
    index: 1,
    image: "/new_images/image 25.png",
    items: [
      "Access curated, high-potential ventures",
      "Get support for due diligence & financing",
      "Expand confidently with trusted local expertise",
      "Acquire stable, cash-flowing businesses",
      "Benefit from end-to-end acquisition support",
    ],
  },
};
