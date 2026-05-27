import type { Meta, StoryObj } from "@storybook/nextjs";
import { FooterLink } from "./footer-link";

const meta: Meta<typeof FooterLink> = {
  title: "Base/FooterLink",
  component: FooterLink,
  parameters: {
    docs: {
      description: {
        component:
          "Animated underline link used throughout the footer. Hover to see the `#007426` green underline slide in from left. Used 10+ times in the footer — changing the hover colour or animation here updates all footer links.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FooterLink>;

export const Default: Story = {
  args: {
    href: "/business-brokerage",
    children: "For Sellers",
  },
};

export const Bold: Story = {
  args: {
    href: "/our-specialties",
    bold: true,
    children: "Stakeholders",
  },
};

export const External: Story = {
  args: {
    href: "https://tworld.com.gh/",
    external: true,
    children: "TBA Ghana",
  },
};

export const NoHref: Story = {
  args: {
    children: "Privacy Policy",
  },
};

export const AllVariants: Story = {
  render: () => (
    <ul className="space-y-4">
      <li><FooterLink href="/" bold>Section Heading</FooterLink></li>
      <li><FooterLink href="/business-brokerage">For Sellers</FooterLink></li>
      <li><FooterLink href="/business-funding">For Buyers</FooterLink></li>
      <li><FooterLink href="https://tworld.com.gh/" external>TBA Ghana (external)</FooterLink></li>
      <li><FooterLink>Privacy Policy (no href)</FooterLink></li>
    </ul>
  ),
};
