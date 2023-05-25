import { COLLECTION_TRAINING_MEMBER } from "@/lib/constants";
import {
  addNewDocument,
  getDocumentsByQuery,
} from "@/services/firebase/helper";
import {
  TrainingMember,
  TrainingMemberModel,
} from "@/types/models/trainingMember";
import { where } from "firebase/firestore";

export const getTrainingMemberByMemberId = async (
  memberId: string
): Promise<TrainingMember[]> => {
  try {
    return await getDocumentsByQuery<TrainingMember>(
      COLLECTION_TRAINING_MEMBER,
      where("memberId", "==", memberId)
    );
  } catch (e) {
    throw e;
  }
};

export const createTrainingMember = async (
  payload: TrainingMemberModel
): Promise<TrainingMember> => {
  try {
    const res = await addNewDocument<TrainingMemberModel>(
      COLLECTION_TRAINING_MEMBER,
      payload
    );
    return res;
  } catch (e) {
    throw e;
  }
};
