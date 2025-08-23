"use client";
import HamburgerMenu from "@/components/HamburgerMenu/HamburgerMenu";
import { useContext, useState } from "react";
import { FaQuestion, FaCalendar, FaSearch, FaWalking } from "react-icons/fa";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const StepComponent: React.FC = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
  const [offcanvas, setOffcanvas] = useState<boolean>(false);
  const steps = [
    {
      title: "Find",
      step: meetingStep.find,
      selected: editableProfiles?.step === meetingStep.find,
      icon: <FaSearch />,
    },
    {
      title: "Book",
      step: meetingStep.book,

      selected: editableProfiles?.step === meetingStep.book,
      icon: <FaCalendar />,
    },
    {
      title: "Meet",
      step: meetingStep.meet,

      selected:
        editableProfiles?.step === meetingStep.meet ||
        editableProfiles?.step === meetingStep.detail,
      icon: <FaWalking />,
    },
  ];
  return (
    <div className="h-full flex mx-auto">
      <div className="self-center  [&>*]:uppercase  cursor-pointer [&>*]:self-center mx-auto [&>*]:h-10 [&>*]:py-8  [&>*]:text-center [&>*]:md:w-44   [&>*]:mx-auto [&>*]:px-4  [&>*]:md:px-8 w-[calc(100vw-1rem)] ml-2 md:w-auto md:ml-8 [&>*]:border  flex">
        {steps.map((step) => (
          <div
            key={step.title}
            onClick={() => {
              if (
                editableProfiles?.step &&
                editableProfiles?.step > step.step &&
                editableProfiles.step !== meetingStep.detail
              ) {
                dispatch?.({
                  type: homepageActions.setStep,
                  payload: step.step,
                });
              }
            }}
            className={` flex mx-auto flex-auto gap-x-4 ${
              step.selected ? "bg-neutral-600" : "bg-neutral-400"
            } text-white  [&>*]:self-center gap-4  flex`}
          >
            <div className="mx-auto  [&>*]:self-center flex">
              <div className="">{step.icon}</div>
              <div className="ml-2 hidden md:block">{step.title}</div>
            </div>
          </div>
        ))}
        <div className="flex-auto flex border-none">
          <HamburgerMenu
            className={`tw-pl-5 ml-auto flex  mx-auto flex-auto gap-x-4 ${"bg-neutral-600"} text-white  [&>*]:self-center gap-4  flex  xl:tw-hidden`}
            onClick={() => setOffcanvas(!offcanvas)}
            color={"light"}
            label="Toggle Menu"
            isOpen={offcanvas}
            variant="animated"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
export default StepComponent;
