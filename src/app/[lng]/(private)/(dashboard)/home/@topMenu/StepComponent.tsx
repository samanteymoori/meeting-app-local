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
    <div className="h-full flex mx-auto">
      <div className="self-center  [&>*]:uppercase  cursor-pointer [&>*]:self-center mx-auto [&>*]:h-10 [&>*]:py-8  [&>*]:text-center [&>*]:md:w-44  rounded-lg [&>*]:mx-auto [&>*]:px-4  [&>*]:md:px-8 w-screen md:w-auto md:ml-8 [&>*]:border  shadow-xl rounded-lg flex">
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
            className={` flex mx-auto flex-auto gap-x-4 ${
              step.selected ? "bg-neutral-600" : "bg-neutral-400"
            } text-white [&>*]:self-center gap-4  flex`}
          >
            <div className="mx-auto [&>*]:self-center flex">
              <div className="">{step.icon}</div>
              <div className="ml-2">{step.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StepComponent;
