import { COLLECTION_TRAINING_MEMBER } from "@/lib/constants";
import {
  addNewDocument,
  getCountByQuery,
  getDocumentsByQuery,
  updateDocument,
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

export const getTrainingMemberByTrainingId = async (
  trainingId: string
): Promise<TrainingMember[]> => {
  try {
    return await getDocumentsByQuery<TrainingMember>(
      COLLECTION_TRAINING_MEMBER,
      where("trainingId", "==", trainingId)
    );
  } catch (e) {
    throw e;
  }
};

export const getTrainingMemberCountByTrainingId = async (
  trainingId: string
): Promise<number> => {
  try {
    return await getCountByQuery(
      COLLECTION_TRAINING_MEMBER,
      where("trainingId", "==", trainingId)
    );
  } catch (e) {
    throw e;
  }
};

export const updateTrainingMember = async (
  trainingMemberId: string,
  payload: Partial<TrainingMember>
) => {
  try {
    await updateDocument(COLLECTION_TRAINING_MEMBER, trainingMemberId, payload);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
