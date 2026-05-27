import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartnerBanner } from "./partner-banner";

const meta: Meta<typeof PartnerBanner> = {
  title: "Base/PartnerBanner",
  component: PartnerBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-width dark split banner: image/logo on the left, headline + copy on the right. Used on the home page (solid `bg-[#004714]`) and the business-brokerage page (`bg-gradient-to-r from-black to-[#739F46]`). The background is controlled by `backgroundClassName`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PartnerBanner>;

export const HomeVariant: Story = {
  args: {
    backgroundClassName: "bg-[#004714]",
    leftContent: (
      <img
        src="/new_images/TBALogo_origin.webp"
        alt="Transworld Logo"
        className="z-10 w-[260px] object-contain md:w-[400px]"
      />
    ),
    rightContent: (
      <>
        <h2 className="font-bold text-xl leading-snug md:text-xl" style={{ fontFamily: "Inter" }}>
          Our partnership with the world's largest business brokerage — Transworld Business Advisors (TBA)
        </h2>
        <p className="mt-4 font-light text-[#F5F5F5A6] text-base leading-relaxed md:text-[20px]">
          We operate Transworld Business Advisors Ghana to connect African enterprises with global opportunity.
        </p>
      </>
    ),
  },
};

export const BrokerageVariant: Story = {
  args: {
    backgroundClassName: "bg-gradient-to-r from-[#000000] via-[#000] to-[#739F46]",
    leftContent: (
      <img
        src="/new_images/Group.png"
        alt="Group"
        className="z-10 h-full w-full object-contain"
      />
    ),
    rightContent: (
      <>
        <h2 className="font-bold text-xl leading-snug md:text-[30px]" style={{ fontFamily: "Inter" }}>
          We are building a{" "}
          <span className="font-medium text-[#8FDC40B2]">Pan-African marketplace</span>{" "}
          for businesses, connected to the rest of the world
        </h2>
        <p className="mt-4 font-light text-[#FFFFFF] text-base leading-relaxed md:text-[24px]">
          African Aspirations helps you understand your company's true value.
        </p>
      </>
    ),
  },
};
