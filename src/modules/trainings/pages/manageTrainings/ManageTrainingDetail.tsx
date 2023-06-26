import { useParams } from "react-router-dom";
import { ManageTrainingApplicants } from "./applicants";

type manageTrainingTabId = "info" | "applicants" | "settings";
export const ManageTrainingDetail = () => {
  const { tabId: tId } = useParams();
  const tabId = tId as manageTrainingTabId | undefined;

  switch (tabId) {
    case "applicants":
      return <ManageTrainingApplicants />;

    case "settings":
      return <h1>Settings Page</h1>;
    default:
      return <h1>Info Page</h1>;
  }
};
