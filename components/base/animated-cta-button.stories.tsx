import type { Meta, StoryObj } from "@storybook/nextjs";
import { AnimatedCTAButton } from "./animated-cta-button";

const meta: Meta<typeof AnimatedCTAButton> = {
  title: "Base/AnimatedCTAButton",
  component: AnimatedCTAButton,
  parameters: {
    docs: {
      description: {
        component:
          "The yellow pill CTA button with a continuously bouncing arrow. Used in `BottomCTASection` (renders as an `<a>` when `href` is provided) and `BottomHero` (renders as a `<button>`). Hover to see the scale + background transition. The arrow loops every 2 seconds.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedCTAButton>;

export const AsButton: Story = {
  args: {
    children: "Leave us a message",
  },
};

export const AsLink: Story = {
  args: {
    children: "Come talk to Us",
    href: "https://forms.fillout.com/t/oEtePaNuxSus",
  },
};

export const ContactUs: Story = {
  args: {
    children: "Contact Us",
    href: "https://forms.fillout.com/t/oEtePaNuxSus",
  },
};
