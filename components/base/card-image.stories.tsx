import type { Meta, StoryObj } from "@storybook/nextjs";
import { CardImage } from "./card-image";

const meta: Meta<typeof CardImage> = {
  title: "Base/CardImage",
  component: CardImage,
  parameters: {
    docs: {
      description: {
        component:
          "The standard card image: fills its container, crops with `object-cover`, and zooms on hover (`group-hover:scale-105`). Used in ConsultingCard, LeadershipCard, ProductCard, and the brokerage service cards. Changing the zoom speed or scale here affects all of them.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardImage>;

export const Default: Story = {
  args: {
    src: "/new_images/image 19.png",
    alt: "Card image example",
    heightClass: "h-48",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const TallVariant: Story = {
  args: {
    src: "/new_images/image 19.png",
    alt: "Leadership card tall image",
    heightClass: "h-80",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const SquareVariant: Story = {
  args: {
    src: "/new_images/image 19.png",
    alt: "Square product card image",
    heightClass: "aspect-square h-64",
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};
