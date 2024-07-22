"use client";
import { useContext } from "react";
import { FaQuestion, FaCalendar, FaSearch, FaWalking } from "react-icons/fa";
import homepageActions, { meetingStep } from "../contexts/homepageActions";
import { HomePageContext } from "../contexts/HomePageContext";
import { HomePageContextType } from "../contexts/HomePageContextType";

const StepComponent: React.FC = () => {
  const { editableProfiles, dispatch } =
    useContext<HomePageContextType>(HomePageContext);
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

      selected: editableProfiles?.step === meetingStep.meet,
      icon: <FaWalking />,
    },
  ];
  return (
    <div className="flex mx-auto">
      <div className="h-10  [&>*]:uppercase  cursor-pointer [&>*]:self-center mt-2 mx-auto [&>*]:h-10 [&>*]:py-4 [&>*]:w-44 [&>*]:text-center rounded-lg [&>*]:mx-auto [&>*]:px-8 ml-8 [&>*]:border  shadow-xl rounded-lg bg-white flex">
        {steps.map((step) => (
          <div
            key={step.title}
            onClick={() => {
              if (
                editableProfiles?.step &&
                editableProfiles?.step > step.step
              ) {
                dispatch?.({
                  type: homepageActions.setStep,
                  payload: step.step,
                });
              }
            }}
            className={` flex ${
              step.selected ? "bg-neutral-600" : "bg-neutral-400"
            } text-white [&>*]:self-center gap-4  flex`}
          >
            <div>{step.icon}</div>
            <div className="ml-2">{step.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StepComponent;
